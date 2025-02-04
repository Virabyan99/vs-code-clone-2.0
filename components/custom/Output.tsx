"use client";

import { useState } from "react";
import { Copy, Terminal, CheckCircle, Play, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoadingSkeleton from "@/components/custom/LoadingSkeleton"; // 🔥 Import Loading Skeleton

interface OutputProps {
  logs: string[];
  onRun: () => void;
  onClear: () => void;
  isLoading: boolean; // 🔥 Added Loading Prop
}

const Output: React.FC<OutputProps> = ({ logs, onRun, onClear, isLoading }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    if (logs.length === 0) return;
    const textToCopy = logs.join("\n");
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative bg-[#12121a] rounded-xl border border-white/[0.05] p-4 flex flex-col min-h-[450px] md:h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 bg-[#1e1e2e] rounded-lg p-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
            <Terminal className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-sm font-medium text-gray-300 hidden sm:block">Output</span>
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <Button onClick={handleCopy} disabled={logs.length === 0} size="sm" variant="secondary">
            {isCopied ? <CheckCircle className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            Copy
          </Button>

          <Button onClick={onClear} size="sm" variant="destructive">
            <Trash2 className="w-4 h-4" />
            Clear
          </Button>

          <Button onClick={onRun} size="sm">
            <Play className="w-4 h-4" />
            Run Code
          </Button>
        </div>
      </div>

      {/* 🔥 Show Loading Skeleton while Running */}
      <div className="relative bg-[#1e1e2e]/50 border border-[#313244] rounded-xl p-4 flex-1 overflow-auto font-mono text-sm">
        {isLoading ? (
          <LoadingSkeleton /> // Show Skeleton when loading
        ) : logs.length > 0 ? (
          logs.map((log, index) => (
            <div key={index} className={log.startsWith("Error:") ? "text-red-500" : "text-green-500"}>
              {log}
            </div>
          ))
        ) : (
          <div className="text-gray-500">Run your code to see the output here...</div>
        )}
      </div>
    </div>
  );
};

export default Output;
