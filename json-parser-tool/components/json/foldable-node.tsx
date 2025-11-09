/**
 * FoldableNode 组件
 * 可折叠的 JSON 节点
 */

'use client';

import { memo } from 'react';
import { FoldableNodeProps, JSONValue } from '@/types/json';

function FoldableNodeComponent({
  path,
  value,
  folded,
  onToggle,
  indent,
}: FoldableNodeProps) {
  const indentPx = indent * 16;

  // 渲染原始值
  if (value === null || typeof value !== 'object') {
    return <span className="text-blue-400">{JSON.stringify(value)}</span>;
  }

  // 渲染数组
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <span className="text-gray-400">[]</span>;
    }

    return (
      <span>
        <button
          onClick={onToggle}
          className="inline-flex items-center text-gray-400 hover:text-gray-200"
        >
          <span className="mr-1">{folded ? '▶' : '▼'}</span>
          [
        </button>
        {folded ? (
          <span className="text-gray-500"> ... {value.length} items ]</span>
        ) : (
          <>
            {value.map((item, index) => (
              <div key={index} style={{ marginLeft: `${indentPx}px` }}>
                <span className="text-gray-400">{index}: </span>
                <FoldableNode
                  path={`${path}[${index}]`}
                  value={item}
                  folded={false}
                  onToggle={() => {}}
                  indent={indent}
                />
                {index < value.length - 1 && ','}
              </div>
            ))}
            <span className="text-gray-400">]</span>
          </>
        )}
      </span>
    );
  }

  // 渲染对象
  const keys = Object.keys(value);
  if (keys.length === 0) {
    return <span className="text-gray-400">{'{}'}</span>;
  }

  return (
    <span>
      <button
        onClick={onToggle}
        className="inline-flex items-center text-gray-400 hover:text-gray-200"
      >
        <span className="mr-1">{folded ? '▶' : '▼'}</span>
        {'{'}
      </button>
      {folded ? (
        <span className="text-gray-500"> ... {keys.length} keys {'}'}</span>
      ) : (
        <>
          {keys.map((key, index) => (
            <div key={key} style={{ marginLeft: `${indentPx}px` }}>
              <span className="text-purple-400">&quot;{key}&quot;</span>
              <span className="text-gray-400">: </span>
              <FoldableNode
                path={`${path}.${key}`}
                value={value[key]}
                folded={false}
                onToggle={() => {}}
                indent={indent}
              />
              {index < keys.length - 1 && ','}
            </div>
          ))}
          <span className="text-gray-400">{'}'}</span>
        </>
      )}
    </span>
  );
}

export const FoldableNode = memo(FoldableNodeComponent);
