'use client';

import { Header } from '@/components/layout/header';
import { StatusBar } from '@/components/layout/status-bar';
import { JSONInput } from '@/components/json/json-input';
import { ToolBar } from '@/components/json/toolbar';
import { JSONViewer } from '@/components/json/json-viewer';
import { useJSONParser } from '@/hooks/use-json-parser';
import { useClipboard } from '@/hooks/use-clipboard';
import { useFoldState } from '@/hooks/use-fold-state';
import { useJSONContext } from '@/contexts/json-context';
import { formatJSON } from '@/lib/json-formatter';
import { unescapeJSON } from '@/lib/json-unescape';
import { toast } from 'sonner';

export default function Home() {
  const {
    inputText,
    updateInputText,
    clearInput,
    parseResult,
    stats,
  } = useJSONParser();
  
  const { copy } = useClipboard();
  const { foldState, toggleFold, foldAll, unfoldAll } = useFoldState();
  const { config, updateConfig } = useJSONContext();

  const handleFormat = () => {
    if (parseResult.success && parseResult.data) {
      const formatted = formatJSON(parseResult.data, { indent: config.indent });
      updateInputText(formatted);
      toast.success('格式化成功');
    }
  };

  const handleCopy = async () => {
    if (parseResult.success && parseResult.data) {
      const formatted = formatJSON(parseResult.data, { indent: config.indent });
      const success = await copy(formatted);
      if (success) {
        toast.success('复制成功');
      } else {
        toast.error('复制失败');
      }
    }
  };

  const handleUnescape = () => {
    if (inputText) {
      const unescaped = unescapeJSON(inputText);
      updateInputText(unescaped);
      toast.success('去转义成功');
    }
  };

  const handleToggleFoldAll = (folded: boolean) => {
    if (folded) {
      foldAll();
      toast.success('已全部折叠');
    } else {
      unfoldAll();
      toast.success('已全部展开');
    }
  };

  const handleIndentChange = (indent: number) => {
    updateConfig({ indent });
  };

  return (
    // Add top padding to offset the fixed header (h-16)
    <div className="flex min-h-screen flex-col pt-16">
      <Header />
      
      <div className="flex-1 overflow-hidden">
        <ToolBar
          onFormat={handleFormat}
          onCopy={handleCopy}
          onUnescape={handleUnescape}
          onToggleFoldAll={handleToggleFoldAll}
          indent={config.indent}
          onIndentChange={handleIndentChange}
          disabled={!parseResult.success}
        />
        
        <div className="grid h-[calc(100vh-180px)] grid-cols-1 lg:grid-cols-2">
          <JSONInput
            value={inputText}
            onChange={updateInputText}
            onClear={clearInput}
            error={parseResult.error}
          />
          
          <div className="border-l">
            {parseResult.success && parseResult.data ? (
              <JSONViewer
                data={parseResult.data}
                config={config}
                foldState={foldState}
                onFoldToggle={toggleFold}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <p>在左侧输入 JSON 数据</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <StatusBar stats={stats} />
    </div>
  );
}
