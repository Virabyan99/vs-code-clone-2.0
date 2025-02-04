"use client";
import { useState } from "react";
import { Play, Loader2 } from "lucide-react";

interface RunButtonProps {
  code: string;
  onRun: (output: string | null, error: string | null) => void;
}

const RunButton = ({ code, onRun }: RunButtonProps) => {
  const [isRunning, setIsRunning] = useState(false);

  const executeCode = () => {
    setIsRunning(true);
    try {
      console.clear();
      const result = eval(code);
      onRun(result !== undefined ? result.toString() : "", null);
    } catch (error: any) {
      onRun(null, error.message);
    }
    setTimeout(() => setIsRunning(false), 1000); // Simulating execution delay
  };

  return (
    <button
      onClick={executeCode}
      disabled={isRunning}
      className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 disabled:cursor-not-allowed focus:outline-none"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl opacity-100 transition-opacity group-hover:opacity-90" />
      <div className="relative flex items-center gap-2.5">
        {isRunning ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white/70" />
            <span className="text-sm font-medium text-white/90">Executing...</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white" />
            <span className="text-sm font-medium text-white/90 group-hover:text-white">
              Run Code
            </span>
          </>
        )}
      </div>
    </button>
  );
};

export default RunButton;
