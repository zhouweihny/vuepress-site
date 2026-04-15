const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');

// 读取 docs 目录下所有 .html 文件（排除 index.html）
let files = fs.readdirSync(docsDir)
  .filter(name => name.endsWith('.html') && name !== 'index.html')
  .sort((a, b) => a.localeCompare(b));

let html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>博客目录</title>
  <style>
    body{font-family:system-ui,sans-serif;padding:2rem;background:#f5f5f5;}
    h1{color:#333;}
    ul{list-style:none;padding:0;}
    li{margin:0.8rem 0;padding:0.6rem;background:#fff;border-left:4px solid #667eea;border-radius:4px;}
    a{color:#667eea;text-decoration:none;font-weight:500;}
    a:hover{color:#4c51bf;}
    .meta{font-size:0.85rem;color:#666;margin-top:0.2rem;}
  </style>
</head>
<body>
  <h1>📝 博客文章目录</h1>
  <ul>
`;

files.forEach(file => {
  const title = path.basename(file, '.html');
  html += `    <li>
      <div class="title"><a href="/docs/${file}">${title}</a></div>
      <div class="meta">HTML 文章</div>
    </li>\n`;
});

html += `  </ul>
  <footer style="margin-top:2rem;color:#999;">🌟 持续更新中…</footer>
</body>
</html>`;

fs.writeFileSync(path.join(docsDir, 'index.html'), html);
console.log('✅ docs/index.html 已生成，包含 %d 篇文章', files.length);
