/**
 * JSON 格式化模块
 * 提供 JSON 数据格式化功能
 */

import { FormatOptions, JSONValue } from '@/types/json';

/**
 * 格式化 JSON 数据
 * @param value - JSON 值
 * @param options - 格式化选项
 * @returns 格式化后的字符串
 */
export function formatJSON(value: JSONValue, options: FormatOptions): string {
  const { indent, sortKeys } = options;

  if (sortKeys) {
    value = sortObjectKeys(value);
  }

  return JSON.stringify(value, null, indent);
}

/**
 * 递归排序对象的键
 * @param obj - 要排序的对象
 * @returns 排序后的对象
 */
function sortObjectKeys(obj: JSONValue): JSONValue {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sortObjectKeys(item));
  }

  const sorted: Record<string, JSONValue> = {};
  const keys = Object.keys(obj).sort();

  for (const key of keys) {
    sorted[key] = sortObjectKeys(obj[key]);
  }

  return sorted;
}

/**
 * 压缩 JSON（移除空白）
 * @param value - JSON 值
 * @returns 压缩后的字符串
 */
export function compactJSON(value: JSONValue): string {
  return JSON.stringify(value);
}

/**
 * 美化 JSON（使用 2 空格缩进）
 * @param value - JSON 值
 * @returns 美化后的字符串
 */
export function beautifyJSON(value: JSONValue): string {
  return formatJSON(value, { indent: 2 });
}
