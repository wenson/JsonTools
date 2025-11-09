# Design Document: JSON Parser Tool

**Change ID**: `add-json-parser-tool`  
**Version**: 1.0  
**Last Updated**: 2025-11-08

## 技术设计

### 1. 系统架构

#### 1.1 技术栈决策

| 技术 | 选择 | 理由 |
|------|------|------|
| 前端框架 | Next.js 14 (App Router) | 提供 SSR、优化的打包、良好的开发体验 |
| UI 库 | React 18 | 现代化的组件开发、强大的生态系统 |
| 类型系统 | TypeScript 5 | 类型安全、更好的开发体验 |
| 样式方案 | Tailwind CSS 3 | 快速开发、一致的设计系统 |
| 代码编辑器 | Monaco Editor | VS Code 同款、功能强大 |
| 状态管理 | React Hooks + Context | 轻量级、足够满足需求 |
| 虚拟滚动 | react-window | 性能优秀、API 简洁 |

#### 1.2 架构分层

```
┌─────────────────────────────────────────────┐
│         Presentation Layer (表示层)          │
│  - React Components                         │
│  - UI Interactions                          │
│  - Responsive Layout                        │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│       Business Logic Layer (业务逻辑层)      │
│  - Custom Hooks                             │
│  - State Management                         │
│  - Data Transformation                      │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│         Utility Layer (工具层)               │
│  - JSON Parser                              │
│  - JSON Formatter                           │
│  - Clipboard Handler                        │
│  - Helper Functions                         │
└─────────────────────────────────────────────┘
```

### 2. 核心模块设计

#### 2.1 JSON 解析模块 (json-parser.ts)

**职责**：解析 JSON 文本，提供详细的错误信息

```typescript
interface ParseResult {
  success: boolean;
  data?: any;
  error?: ParseError;
}

interface ParseError {
  message: string;
  line: number;
  column: number;
  position: number;
}

/**
 * 解析 JSON 文本
 * @param text - JSON 文本字符串
 * @returns 解析结果
 */
function parseJSON(text: string): ParseResult {
  try {
    const data = JSON.parse(text);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: extractErrorDetails(error, text)
    };
  }
}

/**
 * 从错误对象中提取详细信息
 */
function extractErrorDetails(error: unknown, text: string): ParseError {
  // 解析 SyntaxError 消息，提取位置信息
  // 实现细节...
}
```

**关键点**：
- 使用原生 `JSON.parse()` 确保符合标准
- 精确定位错误位置（行号和列号）
- 提供友好的错误消息

#### 2.2 JSON 格式化模块 (json-formatter.ts)

**职责**：格式化 JSON 数据，支持自定义缩进

```typescript
interface FormatOptions {
  indent: number;        // 缩进空格数（2 或 4）
  sortKeys?: boolean;    // 是否排序键
  maxLineLength?: number; // 最大行长度
}

/**
 * 格式化 JSON 数据
 * @param value - JSON 值
 * @param options - 格式化选项
 * @returns 格式化后的字符串
 */
function formatJSON(value: any, options: FormatOptions): string {
  const { indent, sortKeys } = options;
  
  if (sortKeys) {
    value = sortObjectKeys(value);
  }
  
  return JSON.stringify(value, null, indent);
}

/**
 * 递归排序对象的键
 */
function sortObjectKeys(obj: any): any {
  // 实现细节...
}
```

**关键点**：
- 支持 2 空格和 4 空格缩进
- 可选的键排序功能
- 保持数据完整性

#### 2.3 去转义模块 (json-unescape.ts)

**职责**：处理 JSON 字符串中的转义字符

```typescript
/**
 * 去除 JSON 字符串中的转义字符
 * @param text - 包含转义的文本
 * @returns 去转义后的文本
 */
function unescapeJSON(text: string): string {
  try {
    // 先解析为 JSON
    const parsed = JSON.parse(text);
    
    // 如果是字符串，直接返回
    if (typeof parsed === 'string') {
      return parsed;
    }
    
    // 如果是对象或数组，递归处理
    return JSON.stringify(unescapeValue(parsed), null, 2);
  } catch {
    // 如果不是有效 JSON，尝试直接处理转义
    return text
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .replace(/\\u([0-9a-fA-F]{4})/g, (_, code) => 
        String.fromCharCode(parseInt(code, 16))
      );
  }
}

/**
 * 递归处理值中的转义
 */
function unescapeValue(value: any): any {
  // 实现细节...
}
```

**关键点**：
- 处理标准转义字符（`\"`, `\\`, `\n`, `\r`, `\t`）
- 处理 Unicode 转义（`\uXXXX`）
- 递归处理嵌套结构

#### 2.4 剪贴板模块 (clipboard.ts)

**职责**：处理复制到剪贴板的操作，提供降级方案

```typescript
/**
 * 复制文本到剪贴板
 * @param text - 要复制的文本
 * @returns Promise<boolean> - 是否成功
 */
async function copyToClipboard(text: string): Promise<boolean> {
  // 方案 1: 使用现代 Clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.warn('Clipboard API failed, trying fallback', error);
    }
  }
  
  // 方案 2: 降级到 execCommand
  return fallbackCopy(text);
}

/**
 * 降级的复制方法
 */
function fallbackCopy(text: string): boolean {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    return successful;
  } catch (error) {
    document.body.removeChild(textarea);
    return false;
  }
}
```

**关键点**：
- 优先使用现代 Clipboard API
- 提供 execCommand 降级方案
- 处理各种失败情况

### 3. 组件设计

#### 3.1 JSONInput 组件

**功能**：输入和编辑 JSON 文本

```typescript
interface JSONInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: ParseError;
  onClear?: () => void;
}

const JSONInput: React.FC<JSONInputProps> = ({
  value,
  onChange,
  error,
  onClear
}) => {
  const editorRef = useRef<any>(null);
  
  // 配置 Monaco Editor
  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    
    // 配置编辑器选项
    editor.updateOptions({
      minimap: { enabled: false },
      lineNumbers: 'on',
      scrollBeyondLastLine: false,
      wordWrap: 'on'
    });
  };
  
  // 标注错误位置
  useEffect(() => {
    if (error && editorRef.current) {
      const monaco = editorRef.current.getModel();
      // 添加错误标记...
    }
  }, [error]);
  
  return (
    <div className="relative h-full">
      <Editor
        height="100%"
        language="json"
        value={value}
        onChange={(value) => onChange(value || '')}
        onMount={handleEditorDidMount}
        theme="vs-dark"
      />
      {onClear && (
        <button
          onClick={onClear}
          className="absolute top-2 right-2"
        >
          清空
        </button>
      )}
    </div>
  );
};
```

**关键点**：
- 使用 Monaco Editor 提供强大的编辑体验
- 实时显示错误标记
- 支持清空操作

#### 3.2 JSONViewer 组件

**功能**：展示格式化后的 JSON

```typescript
interface JSONViewerProps {
  data: any;
  foldState: Record<string, boolean>;
  onToggleFold: (path: string) => void;
}

const JSONViewer: React.FC<JSONViewerProps> = ({
  data,
  foldState,
  onToggleFold
}) => {
  return (
    <div className="font-mono text-sm overflow-auto">
      <RenderValue
        value={data}
        path="root"
        foldState={foldState}
        onToggleFold={onToggleFold}
      />
    </div>
  );
};

/**
 * 递归渲染 JSON 值
 */
const RenderValue: React.FC<RenderValueProps> = ({
  value,
  path,
  foldState,
  onToggleFold
}) => {
  // 根据类型渲染不同的 UI
  if (value === null) return <span className="text-gray-400">null</span>;
  if (typeof value === 'boolean') return <span className="text-blue-500">{String(value)}</span>;
  if (typeof value === 'number') return <span className="text-green-500">{value}</span>;
  if (typeof value === 'string') return <span className="text-orange-500">"{value}"</span>;
  
  if (Array.isArray(value)) {
    return <ArrayNode value={value} path={path} /* ... */ />;
  }
  
  if (typeof value === 'object') {
    return <ObjectNode value={value} path={path} /* ... */ />;
  }
  
  return null;
};
```

**关键点**：
- 递归渲染 JSON 结构
- 语法高亮不同的值类型
- 集成折叠功能

#### 3.3 FoldableNode 组件

**功能**：可折叠的对象/数组节点

```typescript
interface FoldableNodeProps {
  type: 'object' | 'array';
  itemCount: number;
  path: string;
  isFolded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const FoldableNode: React.FC<FoldableNodeProps> = ({
  type,
  itemCount,
  path,
  isFolded,
  onToggle,
  children
}) => {
  const brackets = type === 'array' ? ['[', ']'] : ['{', '}'];
  
  return (
    <div>
      <button
        onClick={onToggle}
        className="inline-flex items-center hover:bg-gray-700"
      >
        <span className="mr-1">
          {isFolded ? '▶' : '▼'}
        </span>
        <span>{brackets[0]}</span>
        {isFolded && (
          <span className="text-gray-400 ml-2">
            {itemCount} {type === 'array' ? 'items' : 'keys'}
          </span>
        )}
        {isFolded && <span>{brackets[1]}</span>}
      </button>
      {!isFolded && (
        <div className="ml-4 border-l border-gray-600 pl-2">
          {children}
        </div>
      )}
      {!isFolded && <div>{brackets[1]}</div>}
    </div>
  );
};
```

**关键点**：
- 显示折叠/展开图标
- 显示元素数量
- 缩进显示嵌套结构

#### 3.4 ToolBar 组件

**功能**：操作按钮工具栏

```typescript
interface ToolBarProps {
  onFormat: () => void;
  onCopy: () => void;
  onUnescape: () => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  indent: number;
  onIndentChange: (indent: number) => void;
  isFormatting?: boolean;
  canFormat?: boolean;
}

const ToolBar: React.FC<ToolBarProps> = ({
  onFormat,
  onCopy,
  onUnescape,
  onExpandAll,
  onCollapseAll,
  indent,
  onIndentChange,
  isFormatting = false,
  canFormat = true
}) => {
  return (
    <div className="flex items-center gap-2 p-4 bg-gray-800 border-b">
      <Button
        onClick={onFormat}
        disabled={!canFormat || isFormatting}
        icon="format"
      >
        {isFormatting ? '格式化中...' : '格式化'}
      </Button>
      
      <Button onClick={onCopy} icon="copy">
        一键复制
      </Button>
      
      <Button onClick={onUnescape} icon="unescape">
        去转义符
      </Button>
      
      <div className="border-l border-gray-600 h-6 mx-2" />
      
      <Button onClick={onExpandAll} icon="expand">
        全部展开
      </Button>
      
      <Button onClick={onCollapseAll} icon="collapse">
        全部折叠
      </Button>
      
      <div className="border-l border-gray-600 h-6 mx-2" />
      
      <select
        value={indent}
        onChange={(e) => onIndentChange(Number(e.target.value))}
        className="bg-gray-700 text-white px-2 py-1 rounded"
      >
        <option value={2}>2 空格</option>
        <option value={4}>4 空格</option>
      </select>
    </div>
  );
};
```

**关键点**：
- 清晰的按钮布局
- 按钮状态管理（禁用、加载）
- 配置选项（缩进）

### 4. 状态管理设计

#### 4.1 useJSONParser Hook

**职责**：管理 JSON 解析状态

```typescript
interface JSONState {
  inputText: string;
  parsedData: any | null;
  error: ParseError | null;
  isValid: boolean;
  stats: JSONStats;
}

interface JSONStats {
  size: number;
  nodeCount: number;
  maxDepth: number;
}

function useJSONParser() {
  const [state, setState] = useState<JSONState>({
    inputText: '',
    parsedData: null,
    error: null,
    isValid: false,
    stats: { size: 0, nodeCount: 0, maxDepth: 0 }
  });
  
  // 防抖解析
  const debouncedParse = useMemo(
    () => debounce((text: string) => {
      const result = parseJSON(text);
      const stats = result.success ? calculateStats(result.data) : { size: 0, nodeCount: 0, maxDepth: 0 };
      
      setState({
        inputText: text,
        parsedData: result.data || null,
        error: result.error || null,
        isValid: result.success,
        stats
      });
    }, 500),
    []
  );
  
  const updateInput = useCallback((text: string) => {
    debouncedParse(text);
  }, [debouncedParse]);
  
  const clear = useCallback(() => {
    setState({
      inputText: '',
      parsedData: null,
      error: null,
      isValid: false,
      stats: { size: 0, nodeCount: 0, maxDepth: 0 }
    });
  }, []);
  
  return {
    ...state,
    updateInput,
    clear
  };
}
```

**关键点**：
- 防抖处理输入（500ms）
- 自动计算统计信息
- 提供清空功能

#### 4.2 useFoldState Hook

**职责**：管理节点折叠状态

```typescript
function useFoldState() {
  const [foldState, setFoldState] = useState<Record<string, boolean>>({});
  
  const toggleFold = useCallback((path: string) => {
    setFoldState(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  }, []);
  
  const expandAll = useCallback(() => {
    setFoldState({});
  }, []);
  
  const collapseAll = useCallback((data: any) => {
    const allPaths = extractAllPaths(data);
    const collapsed = allPaths.reduce((acc, path) => {
      acc[path] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setFoldState(collapsed);
  }, []);
  
  return {
    foldState,
    toggleFold,
    expandAll,
    collapseAll
  };
}

/**
 * 提取所有可折叠路径
 */
function extractAllPaths(data: any, prefix = 'root'): string[] {
  const paths: string[] = [];
  
  if (Array.isArray(data)) {
    paths.push(prefix);
    data.forEach((item, index) => {
      paths.push(...extractAllPaths(item, `${prefix}[${index}]`));
    });
  } else if (typeof data === 'object' && data !== null) {
    paths.push(prefix);
    Object.keys(data).forEach(key => {
      paths.push(...extractAllPaths(data[key], `${prefix}.${key}`));
    });
  }
  
  return paths;
}
```

**关键点**：
- 使用路径作为键管理折叠状态
- 提供全部展开/折叠功能
- 递归提取所有路径

### 5. 性能优化方案

#### 5.1 Web Worker 处理

**文件**: `workers/json-worker.ts`

```typescript
// Worker 代码
self.addEventListener('message', (e) => {
  const { type, payload } = e.data;
  
  switch (type) {
    case 'parse':
      handleParse(payload);
      break;
    case 'format':
      handleFormat(payload);
      break;
  }
});

function handleParse(text: string) {
  try {
    const data = JSON.parse(text);
    const stats = calculateStats(data);
    self.postMessage({
      type: 'parse-success',
      data,
      stats
    });
  } catch (error) {
    self.postMessage({
      type: 'parse-error',
      error: extractErrorDetails(error, text)
    });
  }
}

function handleFormat(payload: { data: any; indent: number }) {
  const formatted = JSON.stringify(payload.data, null, payload.indent);
  self.postMessage({
    type: 'format-success',
    formatted
  });
}
```

**主线程使用**:

```typescript
function useJSONWorker() {
  const workerRef = useRef<Worker | null>(null);
  
  useEffect(() => {
    workerRef.current = new Worker(new URL('../workers/json-worker.ts', import.meta.url));
    
    return () => {
      workerRef.current?.terminate();
    };
  }, []);
  
  const parseAsync = useCallback((text: string): Promise<ParseResult> => {
    return new Promise((resolve) => {
      if (!workerRef.current) return;
      
      workerRef.current.onmessage = (e) => {
        const { type, data, error, stats } = e.data;
        
        if (type === 'parse-success') {
          resolve({ success: true, data, stats });
        } else if (type === 'parse-error') {
          resolve({ success: false, error });
        }
      };
      
      workerRef.current.postMessage({ type: 'parse', payload: text });
    });
  }, []);
  
  return { parseAsync };
}
```

**关键点**：
- 在 Worker 中处理大文件解析
- 避免阻塞主线程
- 使用 Promise 封装 Worker 通信

#### 5.2 虚拟滚动实现

```typescript
import { FixedSizeList } from 'react-window';

interface VirtualJSONViewerProps {
  lines: string[];
  height: number;
}

const VirtualJSONViewer: React.FC<VirtualJSONViewerProps> = ({
  lines,
  height
}) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style} className="font-mono text-sm">
      <span className="text-gray-500 mr-4">{index + 1}</span>
      <span>{lines[index]}</span>
    </div>
  );
  
  return (
    <FixedSizeList
      height={height}
      itemCount={lines.length}
      itemSize={20}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
};
```

**使用场景**：
- JSON 格式化后超过 1000 行
- 自动切换到虚拟滚动模式

### 6. 错误处理设计

#### 6.1 错误边界

```typescript
class JSONErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('JSON Parser Error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 text-red-800 rounded">
          <h2 className="text-lg font-bold mb-2">出错了</h2>
          <p>应用遇到了一个错误，请刷新页面重试。</p>
          {this.state.error && (
            <pre className="mt-2 text-sm overflow-auto">
              {this.state.error.message}
            </pre>
          )}
        </div>
      );
    }
    
    return this.props.children;
  }
}
```

#### 6.2 Toast 通知系统

```typescript
interface ToastContextValue {
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    // 3 秒后自动移除
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);
  
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50">
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
```

### 7. 安全考虑

#### 7.1 XSS 防护
- 所有用户输入都通过 React 的自动转义
- 不使用 `dangerouslySetInnerHTML`
- JSON 内容仅用于数据展示，不执行

#### 7.2 大文件保护
- 设置文件大小警告阈值（10MB）
- 超大文件提示用户确认
- 内存溢出保护

```typescript
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const WARN_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function checkFileSize(text: string): { ok: boolean; warn: boolean; size: number } {
  const size = new Blob([text]).size;
  
  return {
    ok: size <= MAX_FILE_SIZE,
    warn: size > WARN_FILE_SIZE,
    size
  };
}
```

### 8. 部署架构

#### 8.1 构建配置

**next.config.js**:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 静态导出
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    // Monaco Editor 配置
    config.module.rules.push({
      test: /\.worker\.(js|ts)$/,
      use: { loader: 'worker-loader' }
    });
    
    return config;
  }
};

module.exports = nextConfig;
```

#### 8.2 Cloudflare Pages 配置

**cloudflare-pages.json**:

```json
{
  "production": {
    "build": {
      "command": "pnpm run build",
      "output": "out"
    },
    "env": {
      "NODE_VERSION": "18"
    }
  }
}
```

### 9. 测试策略

#### 9.1 单元测试示例

```typescript
// lib/__tests__/json-parser.test.ts
describe('parseJSON', () => {
  test('should parse valid JSON', () => {
    const result = parseJSON('{"name": "test"}');
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ name: 'test' });
  });
  
  test('should handle invalid JSON', () => {
    const result = parseJSON('{invalid}');
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
  
  test('should extract error position', () => {
    const result = parseJSON('{"name": test}');
    expect(result.error?.line).toBeGreaterThan(0);
    expect(result.error?.column).toBeGreaterThan(0);
  });
});
```

#### 9.2 组件测试示例

```typescript
// components/__tests__/json-input.test.tsx
describe('JSONInput', () => {
  test('should render editor', () => {
    render(<JSONInput value="" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
  
  test('should call onChange when text changes', () => {
    const onChange = jest.fn();
    render(<JSONInput value="" onChange={onChange} />);
    
    // 模拟输入
    const editor = screen.getByRole('textbox');
    fireEvent.change(editor, { target: { value: '{"test": true}' } });
    
    expect(onChange).toHaveBeenCalled();
  });
  
  test('should display error marker', () => {
    const error = { message: 'Error', line: 1, column: 5, position: 5 };
    render(<JSONInput value="" onChange={() => {}} error={error} />);
    
    // 验证错误标记显示
  });
});
```

### 10. 监控和日志

#### 10.1 性能监控

```typescript
function measurePerformance(operation: string, fn: () => void) {
  const start = performance.now();
  fn();
  const end = performance.now();
  
  console.log(`[Performance] ${operation}: ${(end - start).toFixed(2)}ms`);
  
  // 可选：发送到分析服务
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'timing_complete', {
      name: operation,
      value: Math.round(end - start),
      event_category: 'JSON Parser'
    });
  }
}
```

#### 10.2 错误日志

```typescript
function logError(error: Error, context?: Record<string, any>) {
  console.error('[Error]', error.message, context);
  
  // 可选：发送到错误追踪服务（如 Sentry）
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.captureException(error, {
      extra: context
    });
  }
}
```

## 技术决策记录

### 决策 1: 为什么选择 Monaco Editor 而不是 CodeMirror？

**背景**：需要一个代码编辑器组件

**选择**：Monaco Editor

**理由**：
- 功能更强大，VS Code 同款体验
- 内置 JSON 语法支持和验证
- TypeScript 支持良好
- 社区活跃

**权衡**：
- 打包体积较大（~3MB），但可通过按需加载缓解
- 配置相对复杂

### 决策 2: 为什么使用 React Hooks 而不是状态管理库（如 Redux/Zustand）？

**背景**：需要管理应用状态

**选择**：React Hooks + Context API

**理由**：
- 应用状态相对简单
- 避免引入额外依赖
- 开发效率更高
- 性能足够满足需求

**权衡**：
- 如果应用规模扩大，可能需要重构为专门的状态管理库

### 决策 3: 为什么选择静态导出而不是 SSR？

**背景**：Next.js 提供多种渲染模式

**选择**：静态导出（Static Export）

**理由**：
- 纯前端工具，无需服务器端渲染
- 可以部署到任何静态托管平台
- 更好的性能和可靠性
- 符合"无后端依赖"的约束

**权衡**：
- 无法使用某些 Next.js 特性（如 API Routes、ISR）

## 后续改进计划

1. **PWA 支持**：添加离线功能
2. **JSON Schema 验证**：验证 JSON 结构是否符合 Schema
3. **导入/导出**：支持文件导入和导出
4. **历史记录**：保存最近处理的 JSON
5. **主题切换**：支持亮色/暗色主题
6. **多语言支持**：国际化（i18n）
7. **键盘快捷键**：提升操作效率
8. **对比功能**：并排对比两个 JSON
9. **搜索功能**：在 JSON 中搜索键或值
10. **JSON Path 提取**：支持 JSONPath 查询

## 参考资料

- [RFC 8259: JSON 规范](https://tools.ietf.org/html/rfc8259)
- [Monaco Editor API](https://microsoft.github.io/monaco-editor/api/index.html)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
