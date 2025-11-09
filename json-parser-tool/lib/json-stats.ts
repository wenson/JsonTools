/**
 * JSON 统计信息模块
 * 计算 JSON 的大小、节点数、深度等统计信息
 */

import { JSONValue, JSONStats } from '@/types/json';
import { formatSize } from './format-size';

/**
 * 计算 JSON 统计信息
 * @param value - JSON 值
 * @param text - JSON 文本（用于计算大小）
 * @returns 统计信息
 */
export function getJSONStats(value: JSONValue, text: string): JSONStats {
  const size = new Blob([text]).size;
  const nodeCount = countNodes(value);
  const maxDepth = getMaxDepth(value);

  return {
    size,
    sizeFormatted: formatSize(size),
    nodeCount,
    maxDepth,
    isValid: true,
  };
}

/**
 * 计算节点数量
 * @param value - JSON 值
 * @returns 节点数量
 */
function countNodes(value: JSONValue): number {
  if (value === null || typeof value !== 'object') {
    return 1;
  }

  if (Array.isArray(value)) {
    return 1 + value.reduce((sum: number, item) => sum + countNodes(item), 0);
  }

  return (
    1 +
    Object.values(value).reduce(
      (sum: number, item) => sum + countNodes(item),
      0
    )
  );
}

/**
 * 计算最大深度
 * @param value - JSON 值
 * @param currentDepth - 当前深度
 * @returns 最大深度
 */
function getMaxDepth(value: JSONValue, currentDepth: number = 0): number {
  if (value === null || typeof value !== 'object') {
    return currentDepth;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return currentDepth + 1;
    }
    return Math.max(
      ...value.map((item) => getMaxDepth(item, currentDepth + 1))
    );
  }

  const values = Object.values(value);
  if (values.length === 0) {
    return currentDepth + 1;
  }

  return Math.max(
    ...values.map((item) => getMaxDepth(item, currentDepth + 1))
  );
}

/**
 * 创建空的统计信息
 * @returns 空的统计信息
 */
export function getEmptyStats(): JSONStats {
  return {
    size: 0,
    sizeFormatted: '0 B',
    nodeCount: 0,
    maxDepth: 0,
    isValid: false,
  };
}
