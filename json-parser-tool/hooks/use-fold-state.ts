/**
 * useFoldState Hook
 * 管理 JSON 节点的折叠状态
 */

import { useState, useCallback } from 'react';
import { FoldState } from '@/types/json';

export function useFoldState() {
  const [foldState, setFoldState] = useState<FoldState>(new Map());

  const toggleFold = useCallback((path: string) => {
    setFoldState((prev) => {
      const newState = new Map(prev);
      newState.set(path, !prev.get(path));
      return newState;
    });
  }, []);

  const isFolded = useCallback(
    (path: string): boolean => {
      return foldState.get(path) || false;
    },
    [foldState]
  );

  const foldAll = useCallback(() => {
    setFoldState((prev) => {
      const newState = new Map(prev);
      for (const key of newState.keys()) {
        newState.set(key, true);
      }
      return newState;
    });
  }, []);

  const unfoldAll = useCallback(() => {
    setFoldState(new Map());
  }, []);

  const resetFoldState = useCallback(() => {
    setFoldState(new Map());
  }, []);

  return {
    foldState,
    toggleFold,
    isFolded,
    foldAll,
    unfoldAll,
    resetFoldState,
  };
}
