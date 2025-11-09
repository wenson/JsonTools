/**
 * 剪贴板操作模块
 * 提供复制到剪贴板功能，包含降级方案
 */

/**
 * 复制文本到剪贴板
 * @param text - 要复制的文本
 * @returns Promise<boolean> - 是否成功
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // 方案 1: 使用现代 Clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.warn('Clipboard API failed, trying fallback:', error);
      // 继续尝试降级方案
    }
  }

  // 方案 2: 使用 document.execCommand (降级方案)
  return copyToClipboardFallback(text);
}

/**
 * 降级方案：使用 document.execCommand 复制
 * @param text - 要复制的文本
 * @returns 是否成功
 */
function copyToClipboardFallback(text: string): boolean {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.top = '-9999px';
  textarea.setAttribute('readonly', '');

  document.body.appendChild(textarea);

  try {
    // 选中文本
    textarea.select();
    textarea.setSelectionRange(0, text.length);

    // 执行复制命令
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);

    return successful;
  } catch (error) {
    console.error('Fallback copy failed:', error);
    document.body.removeChild(textarea);
    return false;
  }
}

/**
 * 检查是否支持剪贴板 API
 * @returns 是否支持
 */
export function isClipboardSupported(): boolean {
  return !!(navigator.clipboard && navigator.clipboard.writeText);
}
