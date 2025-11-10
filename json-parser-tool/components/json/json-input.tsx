/**
 * JSONInput 组件
 * 提供 JSON 输入和编辑功能
 */

'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';
import { JSONInputProps } from '@/types/json';
import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@/components/ui/error-message';
import { EditorSkeleton } from '@/components/ui/loading';

// 动态导入 Monaco Editor 以优化首次加载
const Editor = dynamic(() => import('@monaco-editor/react'), {
  loading: () => <EditorSkeleton />,
  ssr: false,
});

function JSONInputComponent({
  value,
  onChange,
  onClear,
  error,
}: JSONInputProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <h2 className="font-semibold">输入 JSON</h2>
        <Button variant="outline" size="sm" onClick={onClear}>
          清空
        </Button>
      </div>
      
      {error && (
        <div className="p-4">
          <ErrorMessage error={error} />
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="json"
          value={value}
          onChange={(value) => onChange(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            // 性能优化
            quickSuggestions: false,
            folding: true,
            foldingStrategy: 'indentation',
            renderLineHighlight: 'line',
            occurrencesHighlight: 'off',
            renderValidationDecorations: 'on',
          }}
          loading={<EditorSkeleton />}
        />
      </div>
    </div>
  );
}

export const JSONInput = memo(JSONInputComponent);
