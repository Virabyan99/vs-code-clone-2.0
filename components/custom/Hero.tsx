"use client";

import { useState, useEffect } from "react";
import Editor from "@/components/custom/Editor";
import Output from "@/components/custom/Output";

const Hero = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [code, setCode] = useState<string>("// Write JavaScript here...");

  useEffect(() => {
    const savedCode = localStorage.getItem("editorCode");
    if (savedCode) setCode(savedCode);
  }, []);

  const executeCode = () => {
    setLogs([]);

    const worker = new Worker(new URL("../../public/worker.ts", import.meta.url), { type: "module" });

    worker.onmessage = (event: MessageEvent<string[]>) => {
      setLogs(event.data); // Capture all console logs and errors
      worker.terminate();
    };

    worker.onerror = (error: ErrorEvent) => {
      setLogs(["Error: " + error.message]);
      worker.terminate();
    };

    worker.postMessage({ code });
  };

  const clearConsole = () => {
    setLogs([]);
  };

  return (
    <div className="flex gap-4 p-4 h-screen">
      <div className="flex-1">
        <Editor code={code} setCode={setCode} />
      </div>
      <div className="flex-1">
        <Output logs={logs} onRun={executeCode} onClear={clearConsole} />
      </div>
    </div>
  );
};

export default Hero;
