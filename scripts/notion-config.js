/**
 * Notion 配置检查脚本
 */

hexo.on('ready', function () {
  const config = hexo.config.notion;
  const notionApiKey = process.env.NOTION_API_KEY || config?.api_key;
  
  if (!config || !config.enable) {
    return;
  }

  if (notionApiKey && config.database_id) {
    console.log('✓ Notion integration configured successfully');
  } else {
    console.warn('⚠️  Notion configuration incomplete:');
    if (!notionApiKey) {
      console.warn('   - API key not set in NOTION_API_KEY or _config.yml');
    }
    if (!config.database_id) {
      console.warn('   - Database ID not set in _config.yml');
    }
  }
});
