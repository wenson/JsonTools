# Cloudflare Pages 部署完整指南

## 🎯 改造总结

已完成将 Next.js 项目配置为适合 Cloudflare Pages 部署的静态站点。

### ✅ 完成的改造

1. **next.config.ts** - 启用静态导出
   - 添加 `output: "export"` 
   - 禁用图片优化 `images.unoptimized: true`

2. **package.json** - 添加部署脚本
   - `pages:build` - Cloudflare 构建命令
   - `pages:deploy` - 本地部署命令

3. **配置文件**
   - `.node-version` - 指定 Node.js 版本
   - `wrangler.toml` - Wrangler CLI 配置
   - `.cloudflare` - Dashboard 配置参考

4. **文档**
   - `CLOUDFLARE_DEPLOYMENT.md` - 详细部署说明

## 📦 构建测试

```bash
✓ Compiled successfully
✓ Finished TypeScript
✓ Collecting page data
✓ Generating static pages (4/4)
✓ Finalizing page optimization
```

构建输出目录：`out/`

## 🚀 部署步骤

### 方式一：Cloudflare Dashboard（推荐）

1. **连接 GitHub**
   - 访问 https://dash.cloudflare.com/
   - Pages > Create a project
   - 连接你的 GitHub 账户
   - 选择 `JsonTools` 仓库

2. **配置构建**
   
   **重要提示**: 构建配置必须在 Cloudflare Dashboard 中设置，不能在 wrangler.toml 中配置。
   
   ```
   Framework preset: Next.js (Static HTML Export)
   Build command: pnpm build
   Build output directory: out
   Root directory: json-parser-tool
   Node version: 20
   ```

3. **环境变量**（在 Dashboard 中设置）
   ```
   NODE_VERSION=20
   ```
   注意：PNPM 会被自动检测，无需手动设置。

4. **部署**
   - 点击 "Save and Deploy"
   - 首次部署约 2-3 分钟

5. **自动部署**
   - 推送到 `master` 分支会自动触发部署
   - Pull Request 会生成预览链接

### 方式二：Wrangler CLI

```bash
# 全局安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 构建项目
cd json-parser-tool
pnpm build

# 部署
wrangler pages deploy out --project-name=json-parser-tool
```

## 📋 部署检查清单

- [x] `next.config.ts` 配置静态导出
- [x] `package.json` 添加部署脚本
- [x] `.node-version` 指定 Node 版本
- [x] `wrangler.toml` Cloudflare 配置
- [x] 本地构建测试通过
- [ ] 推送代码到 GitHub
- [ ] 在 Cloudflare Dashboard 连接仓库
- [ ] 配置构建设置
- [ ] 首次部署
- [ ] 验证生产环境

## 🔍 验证部署

部署完成后，Cloudflare 会提供一个 URL，例如：
```
https://json-parser-tool.pages.dev
```

测试以下功能：
- [ ] 页面正常加载
- [ ] Monaco Editor 正常工作
- [ ] JSON 格式化功能
- [ ] 复制功能
- [ ] 折叠/展开功能
- [ ] 去转义符功能
- [ ] 主题切换
- [ ] 响应式布局

## ⚙️ Cloudflare 优化配置

### 缓存规则
在 Cloudflare Pages 设置中：
- 启用自动压缩（Brotli/Gzip）
- 配置缓存 TTL
- 启用 HTTP/3

### 自定义域名
1. Pages > Custom domains
2. 添加你的域名
3. Cloudflare 自动配置 DNS

### 分析
- 启用 Web Analytics
- 监控访问量和性能

## 🚨 注意事项

### 静态导出限制
- ✅ 支持：客户端 React、Monaco Editor、本地数据处理
- ❌ 不支持：API Routes、Server Components、ISR、Image Optimization

### 兼容性
- Monaco Editor 完全在客户端运行 ✅
- JSON 处理在浏览器端完成 ✅
- 无需服务端 API ✅

### 性能
- 首次加载 Monaco Editor 约 2-3MB
- 建议添加 Loading 状态
- Cloudflare CDN 全球加速

## 🔗 相关链接

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Next.js 静态导出](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

## 📝 下一步

1. 推送代码到 GitHub
2. 在 Cloudflare Dashboard 配置部署
3. 等待首次构建完成
4. 访问生产 URL 验证
5. 配置自定义域名（可选）
6. 设置 Web Analytics（可选）

---

**部署状态**: ⏸️ 待部署
**最后更新**: 2025-11-10
