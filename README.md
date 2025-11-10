# JsonTools

一个基于 Next.js 的在线 JSON 解析工具集合，提供强大的 JSON 处理和可视化功能。

## 项目概述

JsonTools 是一个专为开发者、API 测试人员和数据分析人员设计的在线工具平台，旨在简化 JSON 数据的处理流程。

### 核心功能

- ✨ **格式化** - 自动美化 JSON 数据，提供良好的缩进和可读性
- 📋 **一键复制** - 快速复制格式化后的 JSON 到剪贴板
- 🔄 **折叠/展开** - 支持 JSON 节点的折叠和展开，方便查看大型 JSON 结构
- 🔧 **去转义符** - 自动处理 JSON 字符串中的转义字符（`\"`, `\n` 等）
- 🎨 **语法高亮** - 基于 Monaco Editor 的专业代码编辑体验
- 🌓 **深色模式** - 支持明暗主题切换
- 🚀 **高性能** - 支持处理 10MB+ 的大型 JSON 文件

## 技术栈

- **前端框架**: Next.js 16 (React 19)
- **样式方案**: Tailwind CSS 4
- **代码编辑器**: Monaco Editor
- **UI 组件**: shadcn/ui (Radix UI + Tailwind)
- **主题管理**: next-themes
- **语言**: TypeScript
- **包管理器**: pnpm
- **测试框架**: Vitest + React Testing Library
- **部署平台**: Cloudflare Pages

## 项目结构

```
tools/
├── json-parser-tool/          # JSON 解析工具应用
│   ├── app/                   # Next.js App Router 页面
│   ├── components/            # React 组件
│   ├── contexts/              # React Context
│   ├── hooks/                 # 自定义 Hooks
│   ├── lib/                   # 工具函数
│   ├── types/                 # TypeScript 类型定义
│   ├── workers/               # Web Workers
│   └── public/                # 静态资源
└── openspec/                  # OpenSpec 规范文档
    ├── project.md             # 项目上下文
    ├── changes/               # 变更提案
    └── specs/                 # 功能规范
```

## 快速开始

### 前置要求

- Node.js 20+
- pnpm 8+

### 安装依赖

```bash
cd json-parser-tool
pnpm install
```

### 开发模式

```bash
pnpm dev
```

访问 http://localhost:3000 查看应用

### 构建生产版本

```bash
pnpm build
pnpm start
```

### 运行测试

```bash
# 运行测试
pnpm test

# 测试 UI
pnpm test:ui

# 代码覆盖率
pnpm test:coverage
```

### 代码检查和格式化

```bash
# ESLint 检查
pnpm lint

# Prettier 格式化
pnpm format

# 检查格式
pnpm format:check
```

## 开发规范

### 代码风格

- 使用 TypeScript 严格模式
- 函数命名采用小驼峰命名法（camelCase）
- 组件命名采用大驼峰命名法（PascalCase）
- 常量使用大写下划线命名（UPPER_SNAKE_CASE）
- 缩进使用 2 空格
- 使用 Prettier 自动格式化

### Git 工作流

- `main` - 生产环境代码
- `develop` - 开发分支
- `feature/*` - 功能开发分支
- `bugfix/*` - Bug 修复分支

### 提交规范

遵循 Conventional Commits：

- `feat:` - 新功能
- `fix:` - Bug 修复
- `docs:` - 文档更新
- `style:` - 代码格式调整
- `refactor:` - 重构
- `test:` - 测试相关
- `chore:` - 构建或辅助工具变动

## OpenSpec 工作流

本项目使用 OpenSpec 进行规范驱动开发：

```bash
# 查看活跃变更
openspec list

# 查看规范
openspec list --specs

# 验证变更
openspec validate <change-id> --strict

# 归档已完成的变更
openspec archive <change-id>
```

详见 [openspec/AGENTS.md](openspec/AGENTS.md)

## 性能特性

- ✅ 支持 10MB+ 大型 JSON 文件
- ✅ Web Worker 异步处理，不阻塞 UI
- ✅ 虚拟滚动优化大数据渲染
- ✅ 防抖处理输入事件
- ✅ React.memo 优化组件渲染

## 浏览器兼容性

支持所有现代浏览器的最近两个版本：

- Chrome
- Firefox
- Safari
- Edge

## 部署

项目部署到 Cloudflare Pages，享受全球 CDN 加速。

```bash
# 构建
pnpm build

# 部署由 CI/CD 自动完成
```

## 隐私和安全

- 🔒 纯前端处理，所有 JSON 数据在浏览器本地解析
- 🚫 不上传任何用户数据到服务器
- ✅ 支持离线使用（PWA）

## 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

## 许可证

[MIT License](LICENSE)

## 联系方式

- 项目主页: https://github.com/wenson/JsonTools
- 问题反馈: https://github.com/wenson/JsonTools/issues

---

**Made with ❤️ by wenson**
