/**
 * Loading 组件 - 显示加载状态
 */

interface LoadingProps {
  message?: string;
}

export function Loading({ message = '加载中...' }: LoadingProps = {}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-background p-8">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

/**
 * 编辑器加载骨架屏
 */
export function EditorSkeleton() {
  return (
    <div className="h-full w-full animate-pulse bg-muted/20 p-4">
      <div className="space-y-3">
        <div className="h-4 w-12 rounded bg-muted"></div>
        <div className="h-4 w-64 rounded bg-muted"></div>
        <div className="h-4 w-48 rounded bg-muted"></div>
        <div className="h-4 w-96 rounded bg-muted"></div>
        <div className="h-4 w-72 rounded bg-muted"></div>
        <div className="h-4 w-56 rounded bg-muted"></div>
      </div>
    </div>
  );
}
