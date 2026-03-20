# 快速部署指南

## 只需两步

在 `vuepress-site` 目录下，依次执行：

```bash
# 1. 构建网站
npm run build

# 2. 部署到 Cloudflare Pages
wrangler pages deploy docs/.vuepress/dist --project-name vuepress-site --commit-dirty=true
```

---

## 详细步骤

### 方法一：使用脚本（推荐）

双击 `deploy-simple.cmd`，它会自动执行上面两条命令。

### 方法二：手动执行

1. 打开命令行（cmd 或 PowerShell）
2. 进入项目目录：
   ```cmd
   cd C:\Users\Administrator\.openclaw\workspace\vuepress-site
   ```
3. 依次执行：
   ```cmd
   npm run build
   wrangler pages deploy docs/.vuepress/dist --project-name vuepress-site --commit-dirty=true
   ```
4. 等待完成，会显示访问链接

---

## 注意事项

- ✅ 确保已运行 `wrangler login` 登录过 Cloudflare
- ✅ 确保 Cloudflare Pages 项目已创建（项目名：vuepress-site）
- ✅ 构建可能需要 10-30 秒，部署需要上传文件
- ✅ 成功后地址：`https://vuepress-site.pages.dev/`

---

## 文件说明

- `deploy-simple.cmd` - 最简单的部署脚本，双击即可
- 本文档 - `DEPLOY.md`

---

*创建日期：2025-03-20*