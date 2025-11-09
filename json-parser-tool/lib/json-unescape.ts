/**
 * JSON 去转义模块
 * 处理 JSON 字符串中的转义字符
 */

import { JSONValue } from '@/types/json';

/**
 * 去除 JSON 字符串中的转义字符
 * @param text - 包含转义的文本
 * @returns 去转义后的文本
 */
export function unescapeJSON(text: string): string {
  if (!text || text.trim() === '') {
    return text;
  }

  try {
    // 先尝试解析为 JSON
    const parsed = JSON.parse(text);

    // 如果是字符串，直接返回
    if (typeof parsed === 'string') {
      return parsed;
    }

    // 如果是对象或数组，递归处理后重新格式化
    return JSON.stringify(unescapeValue(parsed), null, 2);
  } catch {
    // 如果不是有效 JSON，尝试直接处理转义
    return unescapeString(text);
  }
}

/**
 * 递归处理值中的转义
 * @param value - 要处理的值
 * @returns 处理后的值
 */
function unescapeValue(value: JSONValue): JSONValue {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => unescapeValue(item));
  }

  const result: Record<string, JSONValue> = {};
  for (const [key, val] of Object.entries(value)) {
    if (typeof val === 'string') {
      result[key] = unescapeString(val);
    } else {
      result[key] = unescapeValue(val);
    }
  }

  return result;
}

/**
 * 处理字符串中的转义字符
 * @param str - 要处理的字符串
 * @returns 处理后的字符串
 */
function unescapeString(str: string): string {
  return str
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\b/g, '\b')
    .replace(/\\f/g, '\f')
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, code) =>
      String.fromCharCode(parseInt(code, 16))
    );
}

/**
 * 检查字符串是否包含转义字符
 * @param text - 要检查的文本
 * @returns 是否包含转义字符
 */
export function hasEscapeCharacters(text: string): boolean {
  return /\\["\\/bfnrtu]/.test(text);
}
