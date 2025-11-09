# Project Context

## Purpose
一个在线 JSON 解析工具页面，提供以下核心功能：
- **格式化**：自动美化 JSON 数据，使其具有良好的缩进和可读性
- **一键复制**：快速复制格式化后的 JSON 到剪贴板
- **折叠/展开**：支持 JSON 节点的折叠和展开，方便查看大型 JSON 结构
- **去转义符**：自动处理 JSON 字符串中的转义字符（如 `\"`, `\n` 等）

目标用户：开发者、API 测试人员、数据分析人员等需要频繁处理 JSON 数据的用户。

## Tech Stack
- **前端框架**：Next.js (React)
- **样式方案**：Tailwind CSS
- **JSON 处理**：原生 JSON.parse/stringify
- **代码编辑器**：Monaco Editor（用于 JSON 展示和编辑）
- **UI 组件**：shadcn/ui (按需使用)
- **包管理器**：pnpm
- **TypeScript**：全面使用 TypeScript 提供类型安全

## Project Conventions

### Code Style
- 使用 TypeScript 严格模式
- 函数命名采用小驼峰命名法（camelCase）
- 组件命名采用大驼峰命名法（PascalCase）
- 常量使用大写下划线命名（UPPER_SNAKE_CASE）
- 缩进使用 2 空格
- 优先使用单引号（字符串）
- 使用 Prettier 格式化代码
- 代码必须通过 ESLint 检查
- 所有公共函数必须添加 JSDoc 或 TSDoc 注释

### Architecture Patterns
- **组件化设计**：将功能拆分为独立的可复用组件
  - JSONInput：输入区域组件
  - JSONViewer：格式化展示组件
  - ToolBar：工具栏组件（包含复制、格式化等按钮）
  - FoldableNode：可折叠节点组件
- **目录结构**（Next.js App Router）：
  - `app/`：页面和路由
  - `components/`：可复用组件
  - `lib/`：工具函数和业务逻辑
  - `hooks/`：自定义 React Hooks
  - `types/`：TypeScript 类型定义
- **状态管理**：使用 React Hooks (useState, useReducer) 和 Context API
- **错误处理**：统一的错误提示机制，友好的错误信息展示
- **性能优化**：
  - 大型 JSON 使用虚拟滚动或懒加载
  - 防抖处理输入事件
  - React.memo 优化组件渲染
  - 使用 Web Worker 处理大文件解析

### Testing Strategy
- **单元测试**：使用 Jest + React Testing Library
  - 测试核心 JSON 解析和格式化函数
  - 测试工具函数和 Hooks
- **组件测试**：测试 UI 组件的交互和渲染
- **边界测试**：
  - 空 JSON 输入
  - 无效 JSON 格式
  - 超大 JSON 文件（性能测试）
  - 特殊字符和转义符处理
  - Unicode 字符处理
- **E2E 测试**（可选）：使用 Playwright 测试完整用户流程
- **浏览器兼容性测试**：Chrome, Firefox, Safari, Edge

### Git Workflow
- **分支策略**：
  - `main`：生产环境代码
  - `develop`：开发分支
  - `feature/*`：功能开发分支
  - `bugfix/*`：Bug 修复分支
- **提交规范**：使用 Conventional Commits
  - `feat:` 新功能
  - `fix:` Bug 修复
  - `docs:` 文档更新
  - `style:` 代码格式调整
  - `refactor:` 重构
  - `test:` 测试相关
  - `chore:` 构建或辅助工具变动

## Domain Context
- **JSON 规范**：严格遵循 RFC 8259 JSON 标准
- **转义字符处理**：
  - `\"` → `"`
  - `\\` → `\`
  - `\/` → `/`
  - `\n` → 换行符
  - `\r` → 回车符
  - `\t` → 制表符
  - `\uXXXX` → Unicode 字符
- **格式化规则**：
  - 默认缩进 2 空格（可配置）
  - 对象和数组自动换行
  - 保持键的原始顺序
- **折叠逻辑**：
  - 对象和数组支持折叠
  - 显示元素数量提示
  - 支持全部展开/折叠

## Important Constraints
- **性能约束**：
  - 需支持至少 10MB 大小的 JSON 文件
  - 格式化操作应在 1 秒内完成（针对常规大小的 JSON）
- **浏览器兼容性**：支持主流浏览器最近两个版本
- **无后端依赖**：纯前端实现，所有处理在浏览器端完成
- **隐私保护**：不上传用户数据到服务器
- **离线可用**：支持 PWA，可离线使用

## External Dependencies
- **核心依赖**：
  - Next.js：React 框架
  - React：UI 库
  - TypeScript：类型系统
  - Tailwind CSS：样式框架
- **开发工具**：
  - ESLint：代码检查
  - Prettier：代码格式化
  - Jest：测试框架
- **可选第三方库**：
  - `@monaco-editor/react`：Monaco Editor React 封装
  - `react-window` 或 `react-virtualized`：虚拟滚动
  - `zustand`：轻量级状态管理（如需要）
- **部署平台**：Cloudflare Pages
