/**
 * JSON Context
 * 共享 JSON 状态和配置
 */

'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { ViewerConfig } from '@/types/json';

interface JSONContextValue {
  config: ViewerConfig;
  updateConfig: (config: Partial<ViewerConfig>) => void;
}

const JSONContext = createContext<JSONContextValue | null>(null);

export function JSONProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<ViewerConfig>({
    indent: 2,
    showLineNumbers: true,
    defaultFolded: false,
  });

  const updateConfig = useCallback((newConfig: Partial<ViewerConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  }, []);

  return (
    <JSONContext.Provider value={{ config, updateConfig }}>
      {children}
    </JSONContext.Provider>
  );
}

export function useJSONContext() {
  const context = useContext(JSONContext);
  if (!context) {
    throw new Error('useJSONContext must be used within JSONProvider');
  }
  return context;
}
