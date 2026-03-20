# VuePress 2 网站部署指南

## 项目结构

```
vuepress-site/
├── docs/
│   ├── .vuepress/
│   │   ├── config.js    # 配置文件
│   │   └── dist/        # 构建输出（自动生成）
│   ├── README.md        # 首页
│   └── guide/
│       └── README.md    # 指南页
├── package.json
└── README.md
```

## 本地开发

```bash
cd vuepress-site
npm run dev
```

访问 http://localhost:8080

## 构建生产版本

```bash
npm run build
```

构建输出位于: `docs/.vuepress/dist/`

## 部署到 Cloudflare Pages

### 方法一：通过 GitHub（推荐）

1. 将项目推送到 GitHub 仓库
2. 登录 [Cloudflare Pages](https://pages.cloudflare.com/)
3. 点击 "Create a project" → "Connect to Git"
4. 选择你的仓库
5. 配置构建设置：
   - **Build command**: `npm run build`
   - **Build output directory**: `docs/.vuepress/dist`
   - **Environment variables**:
     - `NODE_VERSION`: `18` 或更高
6. 点击 "Save and Deploy"

### 方法二：使用 Wrangler CLI

1. 安装 Wrangler:
```bash
npm install -g wrangler
```

2. 登录 Cloudflare:
```bash
wrangler login
```

3. 部署:
```bash
cd vuepress-site
wrangler pages deploy docs/.vuepress/dist --project-name vuepress-site
```

## 自定义配置

编辑 `docs/.vuepress/config.js` 修改：
- 网站标题、描述
- 导航栏
- 主题配置
- 插件等

## 技术栈

- VuePress 2 (rc.0)
- Vue 3
- Vite
- 默认主题

## 账号信息（已保存）

- Cloudflare 账号: zhouweihny@163.com
- 密码: *Zw84165039

---
创建日期: 2026-03-20