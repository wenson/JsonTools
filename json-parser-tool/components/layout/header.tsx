/**
 * Header 组件 - 页面头部
 */

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <h1 className="text-2xl font-bold">JSON Parser Tool</h1>
        <p className="ml-4 text-sm text-muted-foreground">
          功能完整 · 隐私安全 · 高性能
        </p>
      </div>
    </header>
  );
}
