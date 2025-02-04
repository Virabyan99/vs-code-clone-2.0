"use client";

import { useState, useEffect } from "react";
import Editor from "@/components/custom/Editor";
import Output from "@/components/custom/Output";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Hero = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [code, setCode] = useState<string>("// Write JavaScript here...");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 🔴 New state for error message

  useEffect(() => {
    const savedCode = localStorage.getItem("editorCode");
    if (savedCode) setCode(savedCode);
  }, []);

  const executeCode = () => {
    setLogs([]);
    setErrorMessage(null); // Reset error message on new execution

    const worker = new Worker(new URL("../../public/worker.ts", import.meta.url), { type: "module" });

    worker.onmessage = (event: MessageEvent<string[]>) => {
      const outputLogs = event.data;
      setLogs(outputLogs);

      // Check if there's an infinite loop error message
      const loopError = outputLogs.find((log) => log.includes("Execution timed out") || log.includes("Detected infinite loop"));
      if (loopError) {
        setErrorMessage(loopError); // Show the modal with error
      }

      worker.terminate();
    };

    worker.onerror = (error: ErrorEvent) => {
      setLogs(["Error: " + error.message]);
      setErrorMessage("Unexpected Error: " + error.message); // Show modal for unexpected errors
      worker.terminate();
    };

    worker.postMessage({ code });
  };

  const clearConsole = () => {
    setLogs([]);
  };

  return (
    <>
      <div className="flex gap-4 p-4 h-screen">
        <div className="flex-1">
          <Editor code={code} setCode={setCode} />
        </div>
        <div className="flex-1">
          <Output logs={logs} onRun={executeCode} onClear={clearConsole} />
        </div>
      </div>

      {/* 🔴 Error Dialog for Infinite Loops */}
      <Dialog open={!!errorMessage} onOpenChange={() => setErrorMessage(null)}>
        <DialogContent className="bg-red-500 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Execution Error</DialogTitle>
            <DialogDescription className="text-white">{errorMessage}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Hero;
