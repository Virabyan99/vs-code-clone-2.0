"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Import the hook
import Editor from "@/components/custom/Editor";
import Output from "@/components/custom/Output";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Hero = () => {
  const { data: session, status } = useSession(); // Use the session hook to access session data
  const [logs, setLogs] = useState<string[]>([]);
  const [code, setCode] = useState<string>("// Write JavaScript here...");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // 🔥 Added Loading State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Added state for authentication

  useEffect(() => {
    const savedCode = localStorage.getItem("editorCode");
    if (savedCode) setCode(savedCode);

    // Check user authentication status after component mounts
    if (session?.user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [session]); // Dependency array ensures this effect runs when session changes

  const executeCode = () => {
    setLogs([]);
    setErrorMessage(null);
    setIsLoading(true); // Start loading when execution begins

    const worker = new Worker(new URL("../../public/worker.ts", import.meta.url), { type: "module" });

    worker.onmessage = (event: MessageEvent<string[]>) => {
      const outputLogs = event.data;
      setLogs(outputLogs);
      setIsLoading(false); // Stop loading when execution finishes

      const loopError = outputLogs.find((log) => log.includes("Execution timed out") || log.includes("Detected infinite loop"));
      if (loopError) {
        setErrorMessage(loopError);
      }

      worker.terminate();
    };

    worker.onerror = (error: ErrorEvent) => {
      setLogs(["Error: " + error.message]);
      setErrorMessage("Unexpected Error: " + error.message);
      setIsLoading(false); // Stop loading if there's an error
      worker.terminate();
    };

    worker.postMessage({ code });
  };

  const clearConsole = () => {
    setLogs([]);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 p-4 h-screen">
        <div className="flex-1 min-h-[300px]">
          {/* Pass isAuthenticated to Editor to control readOnly */}
          <Editor key={isAuthenticated.toString()} code={code} setCode={setCode} isAuthenticated={isAuthenticated} />
        </div>
        <div className="flex-1 min-h-[300px]">
          <Output logs={logs} onRun={executeCode} onClear={clearConsole} isLoading={isLoading} />
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
