# 快速开始指南

> 5 分钟了解 JSON Parser Tool 技术方案

## 🎯 这是什么？

一个功能完整的在线 JSON 解析工具，提供：
- 格式化、复制、折叠、去转义等核心功能
- 100% 前端实现，确保数据隐私
- 支持 10MB+ 大文件，性能优异
- 现代化技术栈：Next.js + React + TypeScript

## 📋 方案文档

| 文档 | 阅读时间 | 用途 |
|------|---------|------|
| 📖 [README.md](README.md) | 5 分钟 | 方案总览和导航 |
| 📝 [proposal.md](proposal.md) | 10 分钟 | 理解动机和目标 |
| 🏗️ [design.md](design.md) | 30 分钟 | 深入技术设计 |
| ✅ [tasks.md](tasks.md) | 10 分钟 | 实施任务清单 |
| 📋 [spec.md](specs/json-parser-tool/spec.md) | 20 分钟 | 详细需求规范 |

## 🚀 核心功能

```
┌─────────────────────────────────────────────┐
│              JSON Parser Tool               │
├─────────────────────────────────────────────┤
│                                             │
│  输入区域                    输出区域        │
│  ┌──────────┐              ┌──────────┐   │
│  │ {        │              │ {        │   │
│  │   "name":│  [格式化]→   │   "name":│   │
│  │   "test" │  [复制]      │   "test" │   │
│  │ }        │  [去转义]    │ }        │   │
│  └──────────┘  [折叠]      └──────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

### 核心特性

| 功能 | 描述 | 优先级 |
|------|------|--------|
| 🎨 格式化 | 自动美化 JSON，支持 2/4 空格缩进 | P0 |
| 📋 一键复制 | 快速复制到剪贴板，支持降级 | P0 |
| 🔽 折叠/展开 | 交互式节点折叠，显示元素数 | P0 |
| 🔓 去转义符 | 处理 `\n`, `\t`, Unicode 等 | P1 |
| 🎯 语法高亮 | Monaco Editor 专业级体验 | P1 |
| ⚠️ 错误提示 | 精确定位，友好消息 | P0 |

## 📊 技术栈

```
前端框架    Next.js 14 (App Router)
UI 库       React 18
类型系统    TypeScript 5
样式方案    Tailwind CSS 3
编辑器      Monaco Editor
状态管理    React Hooks + Context
虚拟滚动    react-window
```

## 🏗️ 架构速览

```
app/page.tsx (主页面)
├── JSONInput (输入)
│   └── Monaco Editor
├── JSONViewer (输出)
│   └── FoldableNode
├── ToolBar (工具栏)
└── StatusBar (状态栏)

lib/ (工具函数)
├── json-parser.ts
├── json-formatter.ts
├── json-unescape.ts
└── clipboard.ts
```

## 📅 实施时间线

```
Week 1: 基础架构 ━━━━━━━━━━ 
  ├─ Next.js 项目搭建
  ├─ TypeScript + Tailwind 配置
  └─ 基础组件结构

Week 2: 核心功能 ━━━━━━━━━━
  ├─ JSONInput + JSONViewer
  ├─ Monaco Editor 集成
  └─ 格式化 + 复制功能

Week 3: 高级功能 ━━━━━━━━━━
  ├─ 折叠/展开实现
  ├─ 去转义符功能
  └─ 状态栏显示

Week 4: 性能优化 ━━━━━━━━━━
  ├─ Web Worker 处理
  ├─ 虚拟滚动实现
  └─ 性能测试优化

Week 5: 测试完善 ━━━━━━━━━━
  ├─ 单元测试编写
  ├─ 浏览器兼容测试
  └─ 用户体验优化

总计: 约 4-5 周，132 个任务
```

## 🎯 关键指标

### 性能目标

| 场景 | 文件大小 | 目标 |
|------|---------|------|
| 小型 | < 100KB | < 500ms |
| 中型 | 100KB-1MB | < 1s |
| 大型 | 1MB-10MB | < 3s |

### Web Vitals

```
FCP (首次内容绘制)  < 1.5s  ⚡
LCP (最大内容绘制)  < 2.5s  ⚡
FID (首次输入延迟)  < 100ms ⚡
CLS (累积布局偏移)  < 0.1   ⚡
```

## ✅ 14 个核心需求

```
✅ 01. JSON 解析           - 解析并显示错误
✅ 02. JSON 格式化         - 美化和缩进
✅ 03. 一键复制            - 剪贴板操作
✅ 04. 折叠与展开          - 节点交互
✅ 05. 去转义符            - 转义字符处理
✅ 06. 语法高亮            - 颜色区分
✅ 07. 错误处理和提示      - 友好提示
✅ 08. 状态栏信息          - 统计显示
✅ 09. 响应式设计          - 多端适配
✅ 10. 性能要求            - 大文件支持
✅ 11. 浏览器兼容性        - 主流浏览器
✅ 12. 数据隐私            - 纯前端处理
✅ 13. 无障碍性            - WCAG 2.1 AA
✅ 14. 用户体验优化        - 流畅体验
```

每个需求包含 3-6 个详细场景测试。

## 🔒 隐私与安全

```
✅ 100% 前端处理
✅ 数据不离开浏览器
✅ 不上传到服务器
✅ 不使用第三方 API
✅ 关闭页面即清除
```

## 🎨 界面预览

### 桌面端 (>1024px)
```
┌────────────────────────────────────────┐
│  [格式化] [复制] [去转义] [折叠] [设置] │
├───────────────┬────────────────────────┤
│   输入区域     │     输出区域            │
│   50%         │     50%                │
└───────────────┴────────────────────────┘
│  状态: 有效 | 1.2KB | 15节点 | 深度4   │
└────────────────────────────────────────┘
```

### 移动端 (<768px)
```
┌────────────────────────────────────────┐
│  [输入] [输出]  ←标签切换               │
├────────────────────────────────────────┤
│                                        │
│          当前标签页内容                 │
│          (输入或输出)                   │
│                                        │
└────────────────────────────────────────┘
│  [格式化] [复制] [去转义] [折叠]       │
└────────────────────────────────────────┘
```

## 🚀 开始实施

### 第一步：创建项目

```bash
# 创建 Next.js 项目
npx create-next-app@latest json-parser-tool \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir

cd json-parser-tool

# 安装依赖
pnpm add @monaco-editor/react
pnpm add -D @types/node
```

### 第二步：跟随任务清单

打开 `tasks.md`，按顺序完成：

1. ✅ Phase 1: 基础架构 (Day 1-4)
2. ✅ Phase 2: 类型和工具 (Day 5-7)
3. ✅ Phase 3: UI 组件 (Day 8-10)
4. ✅ Phase 4: 核心功能 (Day 11-15)
5. ✅ Phase 5: 状态管理 (Day 16-18)
6. ✅ Phase 6: 主页面 (Day 19-21)
7. ✅ Phase 7: 性能优化 (Day 22-25)
8. ✅ Phase 8: 错误处理 (Day 26-28)
9. ✅ Phase 9: 测试 (Day 29-32)
10. ✅ Phase 10: 部署 (Day 33-35)

### 第三步：持续验证

```bash
# 验证需求覆盖
openspec validate add-json-parser-tool --strict

# 运行测试
pnpm test

# 检查性能
pnpm build
pnpm lighthouse
```

## 📚 深入学习路径

### 初学者路径 (1 小时)
1. 阅读 `README.md` (5 分钟)
2. 阅读 `proposal.md` (10 分钟)
3. 浏览 `tasks.md` (10 分钟)
4. 快速扫描 `spec.md` (15 分钟)
5. 查看架构图 (20 分钟)

### 实施者路径 (3 小时)
1. 完整阅读 `proposal.md` (20 分钟)
2. 详细研究 `design.md` (60 分钟)
3. 逐项检查 `tasks.md` (30 分钟)
4. 深入理解 `spec.md` (60 分钟)
5. 准备开发环境 (10 分钟)

### 评审者路径 (2 小时)
1. 快速浏览 `README.md` (5 分钟)
2. 重点阅读 `proposal.md` (30 分钟)
3. 检查 `spec.md` 覆盖度 (60 分钟)
4. 评估 `design.md` 技术选型 (25 分钟)

## 💡 关键决策

### 为什么选择 Next.js？
- ✅ 优秀的 SSR 和 SSG 支持
- ✅ 内置优化（代码分割、图片优化）
- ✅ App Router 提供现代化路由
- ✅ 易于部署到 Cloudflare Pages

### 为什么选择 Monaco Editor？
- ✅ VS Code 同款，功能强大
- ✅ 内置 JSON 语法支持
- ✅ 丰富的 API 和自定义能力
- ✅ TypeScript 支持良好

### 为什么纯前端实现？
- ✅ 确保用户数据隐私
- ✅ 降低服务器成本
- ✅ 更快的响应速度
- ✅ 可离线使用

## 🎓 学习资源

### 核心技术
- [Next.js 文档](https://nextjs.org/docs)
- [React 文档](https://react.dev)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

### 编辑器
- [Monaco Editor API](https://microsoft.github.io/monaco-editor/api/index.html)
- [Monaco React 文档](https://github.com/suren-atoyan/monaco-react)

### JSON 规范
- [RFC 8259: JSON 规范](https://tools.ietf.org/html/rfc8259)
- [JSON.org](https://www.json.org/)

### 性能优化
- [Web Vitals](https://web.dev/vitals/)
- [React Window](https://react-window.vercel.app/)
- [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

## ❓ 常见问题

**Q: 需要多长时间完成？**  
A: 预计 4-5 周，共 132 个任务。

**Q: 需要什么技术水平？**  
A: 熟悉 React、TypeScript 和 Next.js 基础。

**Q: 可以使用其他框架吗？**  
A: 可以，但需要相应调整方案。

**Q: 如何处理超大文件？**  
A: 使用 Web Worker + 虚拟滚动 + 分块处理。

**Q: 是否支持 JSON5？**  
A: 当前方案仅支持标准 JSON，JSON5 可作为扩展。

## 🔗 快速链接

- 📖 [完整 README](README.md)
- 📝 [变更提案](proposal.md)
- 🏗️ [技术设计](design.md)
- ✅ [任务清单](tasks.md)
- 📋 [需求规范](specs/json-parser-tool/spec.md)

## 📞 获取帮助

- 📧 提出 Issue
- 💬 提交 Pull Request
- 📚 查看文档
- 🔍 使用 `openspec show add-json-parser-tool`

---

**准备好了吗？** 开始阅读 [README.md](README.md) 深入了解！

🚀 Happy Coding!
