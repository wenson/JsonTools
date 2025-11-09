/**
 * useClipboard Hook
 * 管理剪贴板操作
 */

import { useState, useCallback } from 'react';
import { copyToClipboard } from '@/lib/clipboard';

export function useClipboard() {
  const [isCopying, setIsCopying] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    setIsCopying(true);
    setCopySuccess(false);

    try {
      const success = await copyToClipboard(text);
      setCopySuccess(success);
      
      // 3秒后重置成功状态
      if (success) {
        setTimeout(() => {
          setCopySuccess(false);
        }, 3000);
      }

      return success;
    } catch (error) {
      console.error('Copy failed:', error);
      return false;
    } finally {
      setIsCopying(false);
    }
  }, []);

  const reset = useCallback(() => {
    setCopySuccess(false);
  }, []);

  return {
    copy,
    isCopying,
    copySuccess,
    reset,
  };
}
