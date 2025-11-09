/**
 * JSON 解析模块
 * 提供 JSON 文本解析功能，包含详细的错误信息
 */

import { ParseResult, ParseError } from '@/types/json';

/**
 * 解析 JSON 文本
 * @param text - JSON 文本字符串
 * @returns 解析结果
 */
export function parseJSON(text: string): ParseResult {
  if (!text || text.trim() === '') {
    return {
      success: false,
      error: {
        message: 'JSON 文本不能为空',
        line: 1,
        column: 1,
        position: 0,
      },
    };
  }

  try {
    const data = JSON.parse(text);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: extractErrorDetails(error, text),
    };
  }
}

/**
 * 从错误对象中提取详细信息
 * @param error - 错误对象
 * @param text - 原始文本
 * @returns 解析错误详情
 */
function extractErrorDetails(error: unknown, text: string): ParseError {
  const defaultError: ParseError = {
    message: '未知的 JSON 解析错误',
    line: 1,
    column: 1,
    position: 0,
  };

  if (!(error instanceof SyntaxError)) {
    return defaultError;
  }

  const message = error.message;

  // 尝试从错误消息中提取位置信息
  // Chrome: "Unexpected token } in JSON at position 42"
  // Firefox: "JSON.parse: unexpected character at line 1 column 43 of the JSON data"
  const positionMatch = message.match(/position (\d+)/);
  const lineColumnMatch = message.match(/line (\d+) column (\d+)/);

  if (positionMatch) {
    const position = parseInt(positionMatch[1], 10);
    const { line, column } = getLineAndColumn(text, position);
    return {
      message: extractErrorMessage(message),
      line,
      column,
      position,
    };
  }

  if (lineColumnMatch) {
    const line = parseInt(lineColumnMatch[1], 10);
    const column = parseInt(lineColumnMatch[2], 10);
    return {
      message: extractErrorMessage(message),
      line,
      column,
      position: getPositionFromLineColumn(text, line, column),
    };
  }

  return {
    message: extractErrorMessage(message),
    line: 1,
    column: 1,
    position: 0,
  };
}

/**
 * 根据位置计算行号和列号
 * @param text - 文本内容
 * @param position - 字符位置
 * @returns 行号和列号
 */
function getLineAndColumn(text: string, position: number): { line: number; column: number } {
  const lines = text.substring(0, position).split('\n');
  return {
    line: lines.length,
    column: lines[lines.length - 1].length + 1,
  };
}

/**
 * 根据行号和列号计算位置
 * @param text - 文本内容
 * @param line - 行号
 * @param column - 列号
 * @returns 字符位置
 */
function getPositionFromLineColumn(text: string, line: number, column: number): number {
  const lines = text.split('\n');
  let position = 0;
  
  for (let i = 0; i < line - 1 && i < lines.length; i++) {
    position += lines[i].length + 1; // +1 for newline
  }
  
  position += column - 1;
  return position;
}

/**
 * 提取友好的错误消息
 * @param message - 原始错误消息
 * @returns 友好的错误消息
 */
function extractErrorMessage(message: string): string {
  // 移除技术细节，保留核心错误信息
  const cleanMessage = message
    .replace(/JSON\.parse:\s*/gi, '')
    .replace(/in JSON at.*$/gi, '')
    .replace(/of the JSON data$/gi, '')
    .trim();

  // 翻译常见错误
  const translations: Record<string, string> = {
    'Unexpected token': '意外的标记',
    'Unexpected end of JSON input': 'JSON 输入意外结束',
    'unexpected character': '意外的字符',
    'unexpected end of data': '数据意外结束',
    'Expected property name or': '期望属性名或',
    'Expected double-quoted property name': '期望双引号属性名',
  };

  for (const [en, zh] of Object.entries(translations)) {
    if (cleanMessage.includes(en)) {
      return cleanMessage.replace(en, zh);
    }
  }

  return cleanMessage;
}

/**
 * 验证 JSON 是否合法
 * @param text - JSON 文本
 * @returns 是否合法
 */
export function isValidJSON(text: string): boolean {
  return parseJSON(text).success;
}
