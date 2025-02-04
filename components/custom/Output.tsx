"use client";

import { useState } from "react";
import { Copy, Terminal, CheckCircle, Play, Trash2 } from "lucide-react";

interface OutputProps {
  logs: string[];
  onRun: () => void;
  onClear: () => void;
}

const Output: React.FC<OutputProps> = ({ logs, onRun, onClear }) => {
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
    <div className="relative bg-[#12121a] rounded-xl border border-white/[0.05] p-4 flex flex-col h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 bg-[#1e1e2e] rounded-lg p-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
            <Terminal className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-sm font-medium text-gray-300">Output</span>
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            disabled={logs.length === 0}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-300 
              bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all 
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCopied ? <CheckCircle className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            Copy
          </button>

          <button
            onClick={onClear}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>

          <button
            onClick={onRun}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
          >
            <Play className="w-4 h-4" />
            Run Code
          </button>
        </div>
      </div>

      {/* Console Output */}
      <div className="relative bg-[#1e1e2e]/50 border border-[#313244] rounded-xl p-4 flex-1 overflow-auto font-mono text-sm">
        {logs.length > 0 ? logs.map((log, index) => (
          <div key={index} className={log.startsWith("Error:") ? "text-red-500" : "text-green-500"}>
            {log}
          </div>
        )) : <div className="text-gray-500">Run your code to see the output here...</div>}
      </div>
    </div>
  );
};

export default Output;
