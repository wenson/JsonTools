/**
 * JSONViewer 组件
 * 展示格式化后的 JSON
 */

'use client';

import { memo } from 'react';
import { JSONViewerProps } from '@/types/json';
import { FoldableNode } from './foldable-node';

function JSONViewerComponent({ data, config, foldState, onFoldToggle }: JSONViewerProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center border-b px-4 py-2">
        <h2 className="font-semibold">格式化输出</h2>
      </div>
      
      <div className="flex-1 overflow-auto bg-gray-900 p-4 font-mono text-sm">
        <FoldableNode
          path="root"
          value={data}
          folded={foldState.get('root') || false}
          onToggle={() => onFoldToggle('root')}
          indent={config.indent}
        />
      </div>
    </div>
  );
}

export const JSONViewer = memo(JSONViewerComponent);
