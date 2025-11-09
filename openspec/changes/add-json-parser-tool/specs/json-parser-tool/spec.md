# Spec Delta: JSON Parser Tool

**Change ID**: `add-json-parser-tool`  
**Capability**: `json-parser-tool`  
**Type**: New Specification

---

## ADDED Requirements

### Requirement: JSON 解析

系统 SHALL 能够解析用户输入的 JSON 文本，并提供详细的错误信息。

#### Scenario: 解析有效的 JSON
**Given** 用户输入有效的 JSON 文本 `{"name": "test", "value": 123}`  
**When** 系统执行解析操作  
**Then** 系统成功解析 JSON 并返回结构化数据  
**And** 显示解析成功的状态

#### Scenario: 解析无效的 JSON
**Given** 用户输入无效的 JSON 文本 `{name: "test"}`（缺少键的引号）  
**When** 系统执行解析操作  
**Then** 系统检测到语法错误  
**And** 显示错误消息和错误位置（行号和列号）  
**And** 在编辑器中标注错误位置

#### Scenario: 解析空输入
**Given** 用户输入为空字符串  
**When** 系统执行解析操作  
**Then** 系统不显示错误  
**And** 输出区域保持空白状态

---

### Requirement: JSON 格式化

系统 SHALL 能够格式化 JSON 数据，提供良好的可读性和自定义缩进选项。

#### Scenario: 格式化压缩的 JSON
**Given** 用户输入压缩的 JSON `{"name":"test","items":[1,2,3]}`  
**When** 用户点击"格式化"按钮  
**Then** 系统将 JSON 格式化为多行格式  
**And** 使用配置的缩进（默认 2 空格）  
**And** 在输出区域显示格式化后的 JSON

```json
{
  "name": "test",
  "items": [
    1,
    2,
    3
  ]
}
```

#### Scenario: 自定义缩进大小
**Given** 用户选择 4 空格缩进  
**And** 已有有效的 JSON 数据  
**When** 系统格式化 JSON  
**Then** 输出使用 4 空格缩进

#### Scenario: 格式化大型 JSON
**Given** 用户输入 5MB 大小的 JSON 文件  
**When** 用户点击"格式化"按钮  
**Then** 系统在后台使用 Web Worker 进行格式化  
**And** 显示加载进度指示  
**And** 格式化在 3 秒内完成

---

### Requirement: 一键复制

系统 SHALL 提供一键复制功能，将格式化后的 JSON 复制到剪贴板。

#### Scenario: 成功复制到剪贴板
**Given** 已有格式化的 JSON 输出  
**When** 用户点击"一键复制"按钮  
**Then** 系统将 JSON 文本复制到剪贴板  
**And** 显示"复制成功"提示消息  
**And** 提示在 3 秒后自动消失

#### Scenario: 复制失败的降级处理
**Given** 浏览器不支持 Clipboard API  
**When** 用户点击"一键复制"按钮  
**Then** 系统使用 execCommand 降级方案  
**And** 如果降级方案也失败，显示"请手动选择并复制"提示

#### Scenario: 复制空内容
**Given** 输出区域没有内容  
**When** 用户点击"一键复制"按钮  
**Then** 系统显示"没有可复制的内容"提示  
**And** 不执行复制操作

---

### Requirement: 折叠与展开

系统 SHALL 支持 JSON 节点的折叠和展开，帮助用户导航大型 JSON 结构。

#### Scenario: 折叠对象节点
**Given** JSON 包含一个对象 `{"user": {"name": "test", "age": 30}}`  
**And** 对象节点默认为展开状态  
**When** 用户点击对象节点的折叠图标  
**Then** 对象内容被折叠  
**And** 显示 `{...} 2 keys`  
**And** 折叠图标变为向右箭头

#### Scenario: 展开已折叠的节点
**Given** 一个节点处于折叠状态  
**When** 用户点击该节点的展开图标  
**Then** 节点内容完全展开  
**And** 显示所有子节点  
**And** 展开图标变为向下箭头

#### Scenario: 折叠数组节点
**Given** JSON 包含一个数组 `{"items": [1, 2, 3, 4, 5]}`  
**When** 用户折叠数组节点  
**Then** 数组内容被折叠  
**And** 显示 `[...] 5 items`

#### Scenario: 全部展开
**Given** JSON 有多个折叠的节点  
**When** 用户点击"全部展开"按钮  
**Then** 所有对象和数组节点都展开  
**And** 显示完整的 JSON 结构

#### Scenario: 全部折叠
**Given** JSON 有多个展开的节点  
**When** 用户点击"全部折叠"按钮  
**Then** 所有对象和数组节点都折叠到第一层级  
**And** 只显示顶层结构

#### Scenario: 保持折叠状态
**Given** 用户已折叠某些节点  
**When** 用户修改其他部分的 JSON  
**And** 重新格式化  
**Then** 已折叠节点的状态保持不变（在合理范围内）

---

### Requirement: 去转义符

系统 SHALL 能够处理和移除 JSON 字符串中的转义字符。

#### Scenario: 去除标准转义字符
**Given** JSON 包含转义字符 `{"text": "Hello\\nWorld\\t!"}`  
**When** 用户点击"去转义符"按钮  
**Then** 系统处理转义字符  
**And** 输出 `{"text": "Hello\nWorld\t!"}`（实际换行和制表符）

#### Scenario: 处理 Unicode 转义
**Given** JSON 包含 Unicode 转义 `{"text": "\\u4F60\\u597D"}`  
**When** 用户点击"去转义符"按钮  
**Then** 系统将 Unicode 转义转换为对应字符  
**And** 输出 `{"text": "你好"}`

#### Scenario: 处理嵌套对象中的转义
**Given** JSON 嵌套结构中多处包含转义字符  
**When** 用户点击"去转义符"按钮  
**Then** 系统递归处理所有层级的转义字符  
**And** 输出完全去转义的 JSON

#### Scenario: 处理双重转义
**Given** JSON 包含双重转义 `{"text": "\\\\n"}`（显示为 `\\n`）  
**When** 用户点击"去转义符"按钮一次  
**Then** 输出 `{"text": "\\n"}`（显示为 `\n`）  
**When** 用户再次点击"去转义符"按钮  
**Then** 输出 `{"text": "\n"}`（实际换行）

---

### Requirement: 语法高亮

系统 SHALL 对 JSON 内容提供语法高亮，增强可读性。

#### Scenario: 高亮不同数据类型
**Given** JSON 包含多种数据类型 `{"str": "text", "num": 123, "bool": true, "null": null}`  
**When** 系统渲染 JSON  
**Then** 字符串显示为橙色  
**And** 数字显示为绿色  
**And** 布尔值显示为蓝色  
**And** null 显示为灰色  
**And** 键名显示为白色

#### Scenario: 编辑器语法高亮
**Given** 用户在输入区域编辑 JSON  
**When** 系统实时解析输入  
**Then** Monaco Editor 提供实时语法高亮  
**And** 非法语法显示红色波浪线

---

### Requirement: 错误处理和提示

系统 SHALL 提供友好的错误提示和处理机制。

#### Scenario: 显示解析错误详情
**Given** 用户输入的 JSON 在第 5 行第 12 列有语法错误  
**When** 系统解析失败  
**Then** 显示错误消息："JSON 解析失败"  
**And** 显示错误位置："第 5 行，第 12 列"  
**And** 显示错误原因："期望 '}' 但遇到 ']'"  
**And** 在编辑器中高亮错误位置

#### Scenario: 文件过大警告
**Given** 用户输入的 JSON 文本大小超过 5MB  
**When** 系统检测到文件大小  
**Then** 显示警告消息："文件较大（XX MB），格式化可能需要较长时间"  
**And** 询问用户是否继续  
**And** 提供"继续"和"取消"按钮

#### Scenario: 文件大小限制
**Given** 用户输入的 JSON 文本大小超过 10MB  
**When** 系统检测到文件大小  
**Then** 显示错误消息："文件过大（XX MB），超过最大限制 10MB"  
**And** 拒绝处理该文件  
**And** 建议用户使用其他工具或分割文件

#### Scenario: 复制失败提示
**Given** 复制操作失败  
**When** 系统检测到复制失败  
**Then** 显示错误提示："复制失败，请手动选择文本并复制"  
**And** 自动选中输出区域的文本（如果可能）

---

### Requirement: 状态栏信息

系统 SHALL 在状态栏显示 JSON 的统计信息。

#### Scenario: 显示 JSON 统计信息
**Given** 已成功解析 JSON 数据  
**When** 系统计算 JSON 统计信息  
**Then** 状态栏显示"状态: 有效"（绿色）  
**And** 显示"大小: 1.2 KB"  
**And** 显示"节点数: 15"  
**And** 显示"深度: 4"

#### Scenario: 显示错误状态
**Given** JSON 解析失败  
**When** 系统更新状态栏  
**Then** 状态栏显示"状态: 错误"（红色）  
**And** 其他统计信息显示为"-"

#### Scenario: 空输入状态
**Given** 用户未输入任何内容  
**When** 系统更新状态栏  
**Then** 状态栏显示"状态: 空"（灰色）  
**And** 其他统计信息显示为"-"

---

### Requirement: 响应式设计

系统 SHALL 在不同设备和屏幕尺寸上提供良好的用户体验。

#### Scenario: 桌面端布局
**Given** 用户使用屏幕宽度大于 1024px 的设备  
**When** 页面加载  
**Then** 输入区域和输出区域左右并排显示  
**And** 各占 50% 宽度  
**And** 工具栏在顶部横向排列

#### Scenario: 平板端布局
**Given** 用户使用屏幕宽度在 768px 到 1024px 之间的设备  
**When** 页面加载  
**Then** 输入区域和输出区域上下排列  
**And** 各占 50% 高度  
**And** 工具栏在顶部横向排列（可能换行）

#### Scenario: 移动端布局
**Given** 用户使用屏幕宽度小于 768px 的设备  
**When** 页面加载  
**Then** 显示标签页切换界面  
**And** 用户可以在"输入"和"输出"标签之间切换  
**And** 工具栏按钮垂直堆叠或折叠到菜单中

---

### Requirement: 性能要求

系统 SHALL 在处理各种大小的 JSON 时保持良好的性能。

#### Scenario: 小型 JSON 处理性能
**Given** JSON 文件大小小于 100KB  
**When** 用户执行格式化操作  
**Then** 格式化在 500ms 内完成  
**And** 界面无明显卡顿

#### Scenario: 中型 JSON 处理性能
**Given** JSON 文件大小在 100KB 到 1MB 之间  
**When** 用户执行格式化操作  
**Then** 格式化在 1 秒内完成  
**And** 显示加载指示器

#### Scenario: 大型 JSON 处理性能
**Given** JSON 文件大小在 1MB 到 10MB 之间  
**When** 用户执行格式化操作  
**Then** 使用 Web Worker 在后台处理  
**And** 显示进度指示  
**And** 格式化在 3 秒内完成

#### Scenario: 首次加载性能
**Given** 用户首次访问页面  
**When** 页面开始加载  
**Then** 首次内容绘制（FCP）在 1.5 秒内完成  
**And** 最大内容绘制（LCP）在 2.5 秒内完成  
**And** 首次输入延迟（FID）小于 100ms

#### Scenario: 输入防抖
**Given** 用户在输入区域连续输入  
**When** 用户停止输入  
**Then** 系统等待 500ms 后才执行解析  
**And** 避免频繁的解析操作影响性能

---

### Requirement: 浏览器兼容性

系统 SHALL 在主流浏览器上正常运行。

#### Scenario: Chrome 浏览器支持
**Given** 用户使用 Chrome 最近两个版本  
**When** 用户访问应用  
**Then** 所有功能正常工作  
**And** 界面显示正确

#### Scenario: Firefox 浏览器支持
**Given** 用户使用 Firefox 最近两个版本  
**When** 用户访问应用  
**Then** 所有功能正常工作  
**And** 界面显示正确

#### Scenario: Safari 浏览器支持
**Given** 用户使用 Safari 最近两个版本  
**When** 用户访问应用  
**Then** 所有功能正常工作  
**And** 界面显示正确

#### Scenario: Edge 浏览器支持
**Given** 用户使用 Edge 最近两个版本  
**When** 用户访问应用  
**Then** 所有功能正常工作  
**And** 界面显示正确

#### Scenario: 浏览器兼容性检测
**Given** 用户使用不支持的旧版浏览器  
**When** 用户访问应用  
**Then** 显示浏览器不兼容警告  
**And** 建议用户升级浏览器

---

### Requirement: 数据隐私

系统 SHALL 确保用户数据的隐私和安全。

#### Scenario: 纯前端处理
**Given** 用户输入 JSON 数据  
**When** 系统处理数据  
**Then** 所有处理都在浏览器本地完成  
**And** 不发送任何数据到服务器  
**And** 不使用任何第三方 API 处理数据

#### Scenario: 数据不持久化
**Given** 用户关闭浏览器标签页  
**When** 用户重新打开应用  
**Then** 之前的数据不会自动恢复  
**And** 输入区域为空  
**And** 确保数据不会意外泄露

#### Scenario: 无跟踪脚本
**Given** 用户使用应用  
**When** 系统运行  
**Then** 不加载任何用户跟踪脚本  
**And** 不收集用户行为数据  
**And** 不使用 cookies 存储个人信息

---

### Requirement: 无障碍性

系统 SHALL 支持无障碍访问，符合 WCAG 2.1 AA 标准。

#### Scenario: 键盘导航
**Given** 用户仅使用键盘  
**When** 用户按 Tab 键  
**Then** 焦点按逻辑顺序在可交互元素间移动  
**And** 焦点可见性明显  
**And** 用户可以使用 Enter 或 Space 激活按钮

#### Scenario: 屏幕阅读器支持
**Given** 用户使用屏幕阅读器  
**When** 用户访问应用  
**Then** 所有按钮有清晰的 aria-label  
**And** 状态变化有适当的 aria-live 公告  
**And** 表单元素有正确的 label 关联

#### Scenario: 颜色对比度
**Given** 应用的视觉设计  
**When** 测量文本和背景的颜色对比度  
**Then** 所有文本对比度至少为 4.5:1  
**And** 大文本（18pt+）对比度至少为 3:1  
**And** 符合 WCAG 2.1 AA 标准

#### Scenario: 焦点指示器
**Given** 用户使用键盘导航  
**When** 元素获得焦点  
**Then** 显示明显的焦点指示器（边框或轮廓）  
**And** 焦点指示器颜色对比度至少为 3:1

---

### Requirement: 用户体验优化

系统 SHALL 提供流畅和直观的用户体验。

#### Scenario: 加载状态指示
**Given** 系统正在处理耗时操作（如格式化大文件）  
**When** 操作进行中  
**Then** 显示加载指示器（旋转图标或进度条）  
**And** 禁用相关按钮防止重复点击  
**And** 提供操作提示文本（如"格式化中..."）

#### Scenario: 操作成功反馈
**Given** 用户执行了某个操作（如复制）  
**When** 操作成功完成  
**Then** 显示成功提示（Toast 通知）  
**And** 提示自动在 3 秒后消失  
**And** 提示不遮挡主要内容

#### Scenario: 清空确认
**Given** 输入区域有内容  
**When** 用户点击"清空"按钮  
**Then** 立即清空内容（无需二次确认）  
**And** 显示"已清空"提示  
**And** 提供撤销功能（可选）

#### Scenario: 配置持久化
**Given** 用户修改了缩进设置（如选择 4 空格）  
**When** 用户关闭并重新打开应用  
**Then** 系统记住用户的缩进偏好  
**And** 自动应用之前的设置  
**And** 使用 localStorage 存储配置

---

## 验收标准

### 功能完整性
- [ ] 所有 14 个核心需求都已实现
- [ ] 所有场景测试通过
- [ ] 边界情况处理正确

### 性能标准
- [ ] 支持至少 10MB 的 JSON 文件
- [ ] 小型 JSON（<100KB）格式化在 500ms 内完成
- [ ] 中型 JSON（100KB-1MB）格式化在 1 秒内完成
- [ ] 大型 JSON（1MB-10MB）格式化在 3 秒内完成
- [ ] FCP < 1.5 秒
- [ ] LCP < 2.5 秒
- [ ] FID < 100ms
- [ ] CLS < 0.1

### 质量标准
- [ ] 单元测试覆盖率 > 80%
- [ ] 组件测试覆盖所有核心组件
- [ ] 所有主流浏览器测试通过
- [ ] 无障碍性检查通过（WCAG 2.1 AA）
- [ ] 无已知的严重 Bug

### 用户体验标准
- [ ] 界面直观，无需文档即可使用
- [ ] 错误提示清晰友好
- [ ] 响应式设计在各种设备上良好工作
- [ ] 加载和操作反馈及时

### 安全和隐私标准
- [ ] 所有处理都在前端完成
- [ ] 不向服务器发送用户数据
- [ ] 不使用第三方数据处理服务
- [ ] 不收集用户行为数据

## 依赖关系

### 外部依赖
- Next.js 14+
- React 18+
- TypeScript 5+
- Tailwind CSS 3+
- @monaco-editor/react ^4.6.0
- react-window ^1.8.10 (可选)

### 浏览器 API 依赖
- JSON API（原生）
- Clipboard API（with fallback）
- Web Worker API
- localStorage API

## 非功能需求

### 可维护性
- 代码遵循 TypeScript 严格模式
- 所有公共函数必须有 JSDoc 注释
- 组件结构清晰，职责单一
- 使用一致的命名约定

### 可测试性
- 所有业务逻辑函数可单元测试
- 组件设计便于测试
- 避免紧耦合
- Mock 外部依赖

### 可扩展性
- 模块化设计，易于添加新功能
- 配置化的选项
- 插件化的架构（为未来扩展预留）

### 可观测性
- 关键操作有性能监控
- 错误有详细的日志
- 可选的分析集成（Google Analytics）

## 术语表

- **JSON (JavaScript Object Notation)**: 轻量级数据交换格式
- **Monaco Editor**: 微软开发的代码编辑器，VS Code 使用的编辑器
- **Web Worker**: 在后台线程运行 JavaScript 的 Web API
- **虚拟滚动**: 只渲染可见区域内容的性能优化技术
- **防抖 (Debounce)**: 延迟执行函数，在指定时间内只执行最后一次调用
- **语法高亮**: 根据代码语法为不同元素着色
- **折叠 (Collapse)**: 隐藏 JSON 节点的子内容
- **展开 (Expand)**: 显示 JSON 节点的完整内容
- **转义字符**: JSON 中用于表示特殊字符的序列（如 `\n`, `\t`）
- **FCP (First Contentful Paint)**: 首次内容绘制时间
- **LCP (Largest Contentful Paint)**: 最大内容绘制时间
- **FID (First Input Delay)**: 首次输入延迟
- **CLS (Cumulative Layout Shift)**: 累积布局偏移

## 更新日志

- 2025-11-08: 初始版本创建，定义了 14 个核心需求和所有场景
