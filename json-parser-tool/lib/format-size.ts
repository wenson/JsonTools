/**
 * 文件大小格式化模块
 */

/**
 * 格式化文件大小
 * @param bytes - 字节数
 * @returns 格式化后的字符串
 */
export function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const value = bytes / Math.pow(k, i);
  const formatted = i === 0 ? value.toString() : value.toFixed(2);

  return `${formatted} ${units[i]}`;
}

/**
 * 检查文件大小是否超过限制
 * @param bytes - 字节数
 * @param limitMB - 限制大小（MB）
 * @returns 是否超过限制
 */
export function isOverSizeLimit(bytes: number, limitMB: number): boolean {
  const limitBytes = limitMB * 1024 * 1024;
  return bytes > limitBytes;
}
