/**
 * ToolBar 组件
 * 提供 JSON 操作按钮
 */

'use client';

import { memo } from 'react';
import { ToolBarProps } from '@/types/json';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function ToolBarComponent({
  onFormat,
  onCopy,
  onUnescape,
  onToggleFoldAll,
  indent,
  onIndentChange,
  disabled = false,
}: ToolBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b bg-muted/40 px-4 py-3">
      <Button onClick={onFormat} disabled={disabled} size="sm">
        格式化
      </Button>
      
      <Button onClick={onCopy} disabled={disabled} variant="outline" size="sm">
        复制
      </Button>
      
      <Button
        onClick={onUnescape}
        disabled={disabled}
        variant="outline"
        size="sm"
      >
        去转义
      </Button>
      
      <Button
        onClick={() => onToggleFoldAll(true)}
        disabled={disabled}
        variant="outline"
        size="sm"
      >
        全部折叠
      </Button>
      
      <Button
        onClick={() => onToggleFoldAll(false)}
        disabled={disabled}
        variant="outline"
        size="sm"
      >
        全部展开
      </Button>

      <div className="ml-auto flex items-center gap-2">
        <span className="text-sm text-muted-foreground">缩进：</span>
        <Select
          value={indent.toString()}
          onValueChange={(value) => onIndentChange(parseInt(value, 10))}
          disabled={disabled}
        >
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">2 空格</SelectItem>
            <SelectItem value="4">4 空格</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export const ToolBar = memo(ToolBarComponent);
