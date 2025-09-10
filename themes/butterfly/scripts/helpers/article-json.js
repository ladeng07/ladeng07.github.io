/**
 * MeuiCat
 * generate json - article_comments
 * developer：meuciat.com
 */

'use strict'

hexo.extend.generator.register('theData', function (locals) {
    const postsData = locals.posts
      .filter(post => post.path !== '/' && post.comments !== false)
      .map(post => {
        const link = post.permalink.replace(/^(?:\/\/|[^/]+)*\//, '/');
        return {
          [link]: post.title || "暂无标题"
        };
      });
  
    const pagesData = locals.pages
      .filter(page => page.path !== '/' && page.comments !== false && !page.source.endsWith('.js') && !page.source.endsWith('.css'))
      .map(page => {
        const link = page.permalink.replace(/^(?:\/\/|[^/]+)*\//, '/').replace('index.html', '');
        return {
          [link]: page.title || "暂无标题"
        };
      });
  
    const combinedData = postsData.concat(pagesData);
  
    const jsonData = combinedData.reduce((acc, obj) => {
      const key = Object.keys(obj)[0];
      const value = obj[key];
      acc[key] = value;
      return acc;
    }, {});
  
    return {
      path: 'article.json',
      data: JSON.stringify(jsonData)
    };
  });