/**
 * TypeScript 类型定义 - JSON 解析工具
 */

// JSON 值类型
export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONArray;

export interface JSONObject {
  [key: string]: JSONValue;
}

export type JSONArray = JSONValue[];

// 解析结果
export interface ParseResult {
  success: boolean;
  data?: JSONValue;
  error?: ParseError;
}

// 解析错误
export interface ParseError {
  message: string;
  line: number;
  column: number;
  position: number;
}

// 格式化选项
export interface FormatOptions {
  indent: number; // 缩进空格数（2 或 4）
  sortKeys?: boolean; // 是否排序键
}

// 折叠状态
export type FoldState = Map<string, boolean>;

// 查看器配置
export interface ViewerConfig {
  indent: number;
  showLineNumbers: boolean;
  defaultFolded: boolean;
}

// JSON 统计信息
export interface JSONStats {
  size: number; // 字节数
  sizeFormatted: string; // 格式化后的大小
  nodeCount: number; // 节点数量
  maxDepth: number; // 最大深度
  isValid: boolean; // 是否合法
}

// 组件 Props 类型
export interface JSONInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  error?: ParseError;
}

export interface JSONViewerProps {
  data: JSONValue;
  config: ViewerConfig;
  foldState: FoldState;
  onFoldToggle: (path: string) => void;
}

export interface ToolBarProps {
  onFormat: () => void;
  onCopy: () => void;
  onUnescape: () => void;
  onToggleFoldAll: (folded: boolean) => void;
  indent: number;
  onIndentChange: (indent: number) => void;
  disabled?: boolean;
}

export interface FoldableNodeProps {
  path: string;
  value: JSONValue;
  folded: boolean;
  onToggle: () => void;
  indent: number;
}

export interface StatusBarProps {
  stats: JSONStats;
}
