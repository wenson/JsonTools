# Cloudflare Pages 部署配置

这个文件定义了如何在 Cloudflare Pages 上构建和部署 Next.js 应用。

## 配置说明

### 构建设置
- **框架预设**: Next.js (Static HTML Export)
- **构建命令**: `pnpm build`
- **构建输出目录**: `out`
- **Node 版本**: 20
- **包管理器**: pnpm

### 环境变量
如需配置环境变量，在 Cloudflare Pages 控制台的 Settings > Environment Variables 中添加。

## 本地测试静态导出

```bash
# 构建静态文件
pnpm build

# 使用 http-server 或其他静态服务器预览
npx serve out
```

## 部署方式

### 方式一：通过 Cloudflare Dashboard（推荐）

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 Pages > Create a project
3. 连接 GitHub 仓库
4. 配置构建设置：
   - **Framework preset**: Next.js (Static HTML Export)
   - **Build command**: `pnpm build`
   - **Build output directory**: `out`
   - **Root directory**: `json-parser-tool`
5. 点击 Save and Deploy

### 方式二：通过 Wrangler CLI

```bash
# 安装 Wrangler
pnpm add -g wrangler

# 登录 Cloudflare
wrangler login

# 部署
cd json-parser-tool
pnpm pages:deploy
wrangler pages deploy out --project-name=json-parser-tool
```

## 自动部署

连接 GitHub 后，每次推送到 `main` 或 `master` 分支都会自动触发部署。

## 注意事项

1. **静态导出限制**：
   - 不支持 Server Components 的动态功能
   - 不支持 API Routes（需使用 Cloudflare Workers/Functions）
   - 不支持 ISR（增量静态生成）
   - 不支持 Next.js Image Optimization

2. **适用场景**：
   - ✅ 纯静态页面
   - ✅ 客户端交互
   - ✅ 纯前端应用
   - ❌ 需要服务端 API

3. **Monaco Editor**：
   - Monaco Editor 在客户端加载，完全兼容静态导出
   - 首次加载可能较慢，考虑添加 loading 状态

## 性能优化建议

- 启用 Cloudflare CDN 缓存
- 配置 Cache-Control 头
- 启用 Brotli 压缩
- 使用 Cloudflare Analytics 监控性能
