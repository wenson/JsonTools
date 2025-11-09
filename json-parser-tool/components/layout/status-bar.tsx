/**
 * StatusBar 组件 - 状态栏
 */

import { StatusBarProps } from '@/types/json';

export function StatusBar({ stats }: StatusBarProps) {
  return (
    <div className="border-t bg-muted/40 px-4 py-2">
      <div className="container flex items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              stats.isValid ? 'bg-green-500' : 'bg-red-500'
            }`}
          ></span>
          <span>{stats.isValid ? 'JSON 合法' : 'JSON 无效'}</span>
        </div>
        <div>大小：{stats.sizeFormatted}</div>
        <div>节点数：{stats.nodeCount}</div>
        <div>深度：{stats.maxDepth}</div>
      </div>
    </div>
  );
}
