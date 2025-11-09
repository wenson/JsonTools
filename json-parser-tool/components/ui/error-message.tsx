/**
 * ErrorMessage 组件 - 显示错误信息
 */

import { ParseError } from '@/types/json';

interface ErrorMessageProps {
  error: ParseError;
  onJumpToError?: () => void;
}

export function ErrorMessage({ error, onJumpToError }: ErrorMessageProps) {
  return (
    <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-destructive"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-destructive">JSON 语法错误</h3>
          <p className="mt-1 text-sm text-destructive/90">{error.message}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            位置：第 {error.line} 行，第 {error.column} 列
          </p>
          {onJumpToError && (
            <button
              onClick={onJumpToError}
              className="mt-2 text-sm font-medium text-primary hover:underline"
            >
              跳转到错误位置
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
