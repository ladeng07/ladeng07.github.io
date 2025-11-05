const { Client } = require('@notionhq/client');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Notion API 辅助类
 */
class NotionHelper {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('Notion API key is required');
    }
    try {
      this.notion = new Client({ auth: apiKey });
      console.log('✓ Notion client initialized successfully');
      
      // 创建图片保存目录
      this.imageDir = path.join(process.cwd(), 'source', 'img', 'notion');
      if (!fs.existsSync(this.imageDir)) {
        fs.mkdirSync(this.imageDir, { recursive: true });
        console.log(`✓ Created image directory: ${this.imageDir}`);
      }
    } catch (error) {
      console.error('Failed to initialize Notion client:', error.message);
      throw error;
    }
  }

  /**
   * 下载图片到本地(带重试机制)
   */
  async downloadImage(imageUrl, pageId, retries = 3) {
    return new Promise((resolve, reject) => {
      try {
        // 使用 pageId 作为文件名
        const cleanPageId = pageId.replace(/-/g, '');
        const ext = path.extname(new URL(imageUrl).pathname) || '.jpg';
        const filename = `${cleanPageId}${ext}`;
        const filepath = path.join(this.imageDir, filename);
        
        // 如果文件已存在,直接返回路径,跳过下载
        if (fs.existsSync(filepath)) {
          resolve(`/img/notion/${filename}`);
          return;
        }
        
        // 选择 http 或 https
        const protocol = imageUrl.startsWith('https') ? https : http;
        
        const file = fs.createWriteStream(filepath);
        const request = protocol.get(imageUrl, { timeout: 10000 }, (response) => {
          // 处理重定向
          if (response.statusCode === 301 || response.statusCode === 302) {
            file.close();
            if (fs.existsSync(filepath)) {
              fs.unlinkSync(filepath);
            }
            this.downloadImage(response.headers.location, pageId, retries).then(resolve).catch(reject);
            return;
          }
          
          if (response.statusCode !== 200) {
            file.close();
            if (fs.existsSync(filepath)) {
              fs.unlinkSync(filepath);
            }
            reject(new Error(`HTTP ${response.statusCode}`));
            return;
          }
          
          response.pipe(file);
          
          file.on('finish', () => {
            file.close();
            resolve(`/img/notion/${filename}`);
          });
        });
        
        request.on('timeout', () => {
          request.destroy();
          file.close();
          if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
          }
          
          // 重试
          if (retries > 0) {
            setTimeout(() => {
              this.downloadImage(imageUrl, pageId, retries - 1).then(resolve).catch(reject);
            }, 1000);
          } else {
            reject(new Error('Download timeout'));
          }
        });
        
        request.on('error', (err) => {
          file.close();
          if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
          }
          
          // 重试
          if (retries > 0) {
            setTimeout(() => {
              this.downloadImage(imageUrl, pageId, retries - 1).then(resolve).catch(reject);
            }, 1000);
          } else {
            reject(err);
          }
        });
        
        file.on('error', (err) => {
          file.close();
          if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
          }
          reject(err);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 从数据库 ID 中提取纯 ID（去除 URL 和参数）
   */
  static extractDatabaseId(input) {
    // 如果是完整的 URL
    if (input.includes('notion.site')) {
      const match = input.match(/([a-f0-9]{32})/i);
      return match ? match[1] : input;
    }
    // 如果已经是纯 ID，移除连字符
    return input.replace(/-/g, '');
  }

  /**
   * 获取页面的第一张图片
   */
  async getPageImage(pageId) {
    try {
      const blocksResponse = await this.notion.blocks.children.list({
        block_id: pageId,
        page_size: 50,
      });
      
      // 查找第一个图片块
      const imageBlock = blocksResponse.results.find(block => block.type === 'image');
      
      if (imageBlock && imageBlock.image) {
        let imageUrl = null;
        if (imageBlock.image.type === 'file') {
          imageUrl = imageBlock.image.file.url;
        } else if (imageBlock.image.type === 'external') {
          imageUrl = imageBlock.image.external.url;
        }
        
        if (imageUrl) {
          // 下载图片到本地并返回本地路径
          try {
            const localPath = await this.downloadImage(imageUrl, pageId);
            return localPath;
          } catch (downloadError) {
            console.warn(`  Warning: Failed to download image for ${pageId}: ${downloadError.message}`);
            // 下载失败时返回原始 URL
            return imageUrl;
          }
        }
      }
      
      return null;
    } catch (error) {
      // 静默失败，不影响主流程
      return null;
    }
  }

  /**
   * 获取数据库内容
   */
  async getDatabase(databaseId) {
    try {
      const cleanId = NotionHelper.extractDatabaseId(databaseId);
      console.log(`  Querying database: ${cleanId}`);
      
      // 检查 notion client 是否正确初始化
      if (!this.notion || !this.notion.databases) {
        throw new Error('Notion client not properly initialized');
      }
      
      // 使用分页获取所有数据
      let allResults = [];
      let hasMore = true;
      let startCursor = undefined;
      
      while (hasMore) {
        const response = await this.notion.databases.query({
          database_id: cleanId,
          start_cursor: startCursor,
          page_size: 100,
        });
        
        allResults = allResults.concat(response.results);
        hasMore = response.has_more;
        startCursor = response.next_cursor;
        
        console.log(`  Fetched ${response.results.length} items (Total: ${allResults.length})`);
      }

      console.log(`✓ Successfully fetched ${allResults.length} items from Notion`);

      // 获取每个页面的图片
      console.log(`  Fetching images for ${allResults.length} items...`);
      const itemsWithImages = await Promise.all(
        allResults.map(async (item) => {
          const imageUrl = await this.getPageImage(item.id);
          return { ...item, coverImage: imageUrl };
        })
      );

      // 使用 formatDatabaseItems 方法解析数据
      return this.formatDatabaseItems(itemsWithImages);
    } catch (error) {
      console.error('Error fetching Notion database:', error.message);
      console.error('Error details:', error);
      return [];
    }
  }

  /**
   * 获取数据库结构信息
   */
  async getDatabaseInfo(databaseId) {
    try {
      const cleanId = NotionHelper.extractDatabaseId(databaseId);
      const response = await this.notion.databases.retrieve({
        database_id: cleanId,
      });
      return response;
    } catch (error) {
      console.error('Error fetching database info:', error.message);
      return null;
    }
  }

  /**
   * 解析 Notion 页面属性
   */
  parseProperties(properties) {
    const parsed = {};

    for (const [key, value] of Object.entries(properties)) {
      switch (value.type) {
        case 'title':
          parsed[key] = value.title.map(t => t.plain_text).join('');
          break;
        case 'rich_text':
          parsed[key] = value.rich_text.map(t => t.plain_text).join('');
          break;
        case 'number':
          parsed[key] = value.number;
          break;
        case 'select':
          parsed[key] = value.select ? {
            name: value.select.name,
            color: value.select.color
          } : null;
          break;
        case 'multi_select':
          parsed[key] = value.multi_select.map(s => ({
            name: s.name,
            color: s.color
          }));
          break;
        case 'date':
          parsed[key] = value.date ? value.date.start : null;
          break;
        case 'checkbox':
          parsed[key] = value.checkbox;
          break;
        case 'url':
          parsed[key] = value.url;
          break;
        case 'email':
          parsed[key] = value.email;
          break;
        case 'phone_number':
          parsed[key] = value.phone_number;
          break;
        case 'files':
          parsed[key] = value.files.map(f => ({
            name: f.name,
            url: f.type === 'external' ? f.external.url : f.file.url,
          }));
          break;
        case 'people':
          parsed[key] = value.people.map(p => p.name || p.id);
          break;
        case 'status':
          parsed[key] = value.status ? value.status.name : null;
          break;
        default:
          parsed[key] = value;
      }
    }

    return parsed;
  }

  /**
   * 格式化数据库条目为展示数据
   */
  formatDatabaseItems(items) {
    return items.map(item => {
      const properties = this.parseProperties(item.properties);
      return {
        id: item.id,
        url: item.url,
        createdTime: item.created_time,
        lastEditedTime: item.last_edited_time,
        coverImage: item.coverImage || null, // 添加封面图片
        ...properties,
      };
    });
  }
}

module.exports = NotionHelper;
