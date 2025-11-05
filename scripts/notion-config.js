/**
 * Notion 配置检查脚本
 */

hexo.on('ready', function () {
  const config = hexo.config.notion;
  
  if (!config || !config.enable) {
    return;
  }

  if (config.api_key && config.database_id) {
    console.log('✓ Notion integration configured successfully');
  } else {
    console.warn('⚠️  Notion configuration incomplete:');
    if (!config.api_key) {
      console.warn('   - API key not set in _config.yml');
    }
    if (!config.database_id) {
      console.warn('   - Database ID not set in _config.yml');
    }
  }
});
