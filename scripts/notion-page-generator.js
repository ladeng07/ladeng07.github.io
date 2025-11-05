const NotionHelper = require('./notion-helper');
const path = require('path');

/**
 * Hexo Notion 页面生成器插件
 * 从 Notion 数据库获取数据并生成页面
 */

hexo.extend.generator.register('notion', async function (locals) {
  const config = hexo.config.notion;
  
  // 如果未配置或未启用，跳过
  if (!config || !config.enable) {
    return [];
  }

  // 检查必要配置
  if (!config.api_key) {
    console.warn('Notion API key not configured. Skipping Notion page generation.');
    return [];
  }

  if (!config.database_id) {
    console.warn('Notion database ID not configured. Skipping Notion page generation.');
    return [];
  }

  try {
    console.log('Fetching data from Notion database...');
    console.log('API Key from config:', config.api_key?.substring(0, 10) + '...' + config.api_key?.substring(config.api_key.length - 4));
    console.log('Database ID:', config.database_id);
    
    const notionHelper = new NotionHelper(config.api_key);
    const formattedItems = await notionHelper.getDatabase(config.database_id);

    console.log(`Successfully fetched ${formattedItems.length} items from Notion.`);

    // 生成页面数据
    const page = {
      path: config.path || 'notion/index.html',
      data: {
        title: config.title || 'Notion 数据库',
        items: formattedItems,
        config: config,
      },
      layout: config.layout || ['notion', 'page'],
    };

    return [page];
  } catch (error) {
    console.error('Error generating Notion page:', error.message);
    return [];
  }
});

/**
 * 添加辅助函数供模板使用
 */
hexo.extend.helper.register('formatNotionDate', function (dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
});

hexo.extend.helper.register('formatNotionTime', function (dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
});

hexo.extend.helper.register('isArray', function (value) {
  return Array.isArray(value);
});

hexo.extend.helper.register('getPropertyValue', function (item, propertyName) {
  return item[propertyName] || '';
});
