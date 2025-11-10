# Cloudflare Pages 部署错误修复

## 🐛 问题

部署时遇到错误：
```
Configuration file for Pages projects does not support "build"
```

## ✅ 解决方案

Cloudflare Pages 的 `wrangler.toml` 不支持 `[build]` 配置块。构建配置必须在 **Cloudflare Dashboard** 中设置。

### 修复后的 wrangler.toml

```toml
# Cloudflare Pages 配置文件
name = "json-parser-tool"
compatibility_date = "2025-01-01"

# Pages 项目配置
pages_build_output_dir = "out"
```

**移除了**：
- `[build]` 块
- `command` 字段
- `[build.environment]` 块

## 📋 正确的配置步骤

### 1. wrangler.toml（本地）
仅配置项目名称和输出目录：
```toml
name = "json-parser-tool"
compatibility_date = "2025-01-01"
pages_build_output_dir = "out"
```

### 2. Cloudflare Dashboard（在线配置）

访问 https://dash.cloudflare.com/ 并配置：

**构建设置 (Build settings)**：
- Framework preset: `Next.js (Static HTML Export)`
- Build command: `pnpm build`
- Build output directory: `out`
- Root directory: `json-parser-tool`

**环境变量 (Environment variables)**：
- `NODE_VERSION` = `20`

### 3. 提交修复

```bash
git add wrangler.toml
git commit -m "fix: 修正 wrangler.toml 配置以适配 Cloudflare Pages"
git push origin master
```

## 🚀 重新部署

推送代码后，Cloudflare Pages 会自动重新构建。

### 预期结果

```
✓ Cloning repository
✓ Installing dependencies
✓ Building application
✓ Deploying to Cloudflare's global network
✓ Success! Deployed to https://json-parser-tool.pages.dev
```

## 📚 参考文档

- [Cloudflare Pages Configuration](https://developers.cloudflare.com/pages/platform/build-configuration/)
- [Pages wrangler.toml](https://developers.cloudflare.com/pages/functions/wrangler-configuration/)

---

**修复状态**: ✅ 已修复
**修复时间**: 2025-11-10
