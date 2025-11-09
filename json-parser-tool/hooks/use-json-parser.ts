/**
 * useJSONParser Hook
 * 管理 JSON 解析状态
 */

import { useState, useCallback, useEffect } from 'react';
import { ParseResult, JSONValue, JSONStats } from '@/types/json';
import { parseJSON } from '@/lib/json-parser';
import { getJSONStats, getEmptyStats } from '@/lib/json-stats';
import { debounce } from '@/lib/debounce';

export function useJSONParser() {
  const [inputText, setInputText] = useState('');
  const [parseResult, setParseResult] = useState<ParseResult>({
    success: false,
  });
  const [stats, setStats] = useState<JSONStats>(getEmptyStats());
  const [isProcessing, setIsProcessing] = useState(false);

  // 防抖解析函数
  const debouncedParse = useCallback(
    debounce((text: string) => {
      setIsProcessing(true);
      const result = parseJSON(text);
      setParseResult(result);

      if (result.success && result.data !== undefined) {
        const jsonStats = getJSONStats(result.data, text);
        setStats(jsonStats);
      } else {
        setStats(getEmptyStats());
      }
      setIsProcessing(false);
    }, 500),
    []
  );

  // 输入变化时触发解析
  useEffect(() => {
    if (inputText.trim()) {
      debouncedParse(inputText);
    } else {
      setParseResult({ success: false });
      setStats(getEmptyStats());
    }
  }, [inputText, debouncedParse]);

  const updateInputText = useCallback((text: string) => {
    setInputText(text);
  }, []);

  const clearInput = useCallback(() => {
    setInputText('');
    setParseResult({ success: false });
    setStats(getEmptyStats());
  }, []);

  return {
    inputText,
    updateInputText,
    clearInput,
    parseResult,
    stats,
    isProcessing,
  };
}
