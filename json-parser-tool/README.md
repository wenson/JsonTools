# JSON Parser Tool

一个功能完整、隐私安全、高性能的在线 JSON 解析工具。

## 功能特性

- ✅ **JSON 格式化**：支持 2 空格或 4 空格缩进
- ✅ **一键复制**：快速复制格式化后的 JSON
- ✅ **去转义符**：处理 JSON 字符串中的转义字符
- ✅ **折叠/展开**：支持对象和数组的折叠展开
- ✅ **语法高亮**：基于 Monaco Editor 的代码编辑体验
- ✅ **错误提示**：实时显示 JSON 语法错误
- ✅ **隐私安全**：纯前端实现，数据不上传服务器
- ✅ **高性能**：支持处理 10MB+ 的 JSON 文件
- ✅ **响应式设计**：支持桌面端、平板端和移动端

## 技术栈

- **前端框架**：Next.js 14 (App Router)
- **UI 库**：React 18
- **类型系统**：TypeScript 5
- **样式方案**：Tailwind CSS 3
- **代码编辑器**：Monaco Editor
- **UI 组件**：shadcn/ui
- **测试框架**：Vitest + React Testing Library

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

### 运行测试

```bash
npm test
```

### 代码格式化

```bash
npm run format
```

## 项目结构

```
json-parser-tool/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 主页面
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── json/             # JSON 相关组件
│   ├── layout/           # 布局组件
│   └── ui/               # UI 组件 (shadcn/ui)
├── lib/                   # 工具函数库
├── hooks/                 # 自定义 Hooks
├── types/                 # TypeScript 类型定义
├── contexts/             # React Context
└── workers/              # Web Workers
```

## 开发指南

### 核心模块

#### JSON 解析 (lib/json-parser.ts)
处理 JSON 文本的解析，提供详细的错误信息。

#### JSON 格式化 (lib/json-formatter.ts)
格式化 JSON 数据，支持自定义缩进。

#### 去转义 (lib/json-unescape.ts)
处理 JSON 字符串中的转义字符。

#### 剪贴板 (lib/clipboard.ts)
封装剪贴板操作，提供降级方案。

### 性能优化

- 使用 React.memo 优化组件渲染
- Monaco Editor 懒加载
- Web Worker 处理大文件
- 防抖处理用户输入

## 浏览器支持

- Chrome/Edge (最近 2 个版本)
- Firefox (最近 2 个版本)
- Safari (最近 2 个版本)

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！

