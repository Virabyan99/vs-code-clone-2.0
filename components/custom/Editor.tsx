"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import { Wand2 } from "lucide-react"; // 🪄 Icon for format button
import parserEstree from "prettier/plugins/estree"; // 🔥 Add this!

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

interface EditorProps {
  code: string;
  setCode: (value: string) => void;
  isAuthenticated: boolean; // Add isAuthenticated prop to control readOnly
}

const Editor = ({ code, setCode, isAuthenticated }: EditorProps) => {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    const savedCode = localStorage.getItem("editorCode");
    if (savedCode) setCode(savedCode);
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({
        readOnly: !isAuthenticated, // Update readOnly based on authentication
      });
    }
  }, [isAuthenticated]); // Run this effect when isAuthenticated changes

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setCode(value);
      localStorage.setItem("editorCode", value);
    }
  };

  // ✨ Format Code using Prettier
  const formatCode = async () => {
    try {
      const formatted = await prettier.format(code, {
        parser: "babel",
        plugins: [parserBabel, parserEstree], // ✅ Add the estree plugin
        semi: true,
        singleQuote: false,
      });

      setCode(formatted);
      localStorage.setItem("editorCode", formatted);
    } catch (error) {
      console.error("Prettier formatting error:", error);
    }
  };

  return (
    <div className="relative bg-[#12121a] rounded-xl border border-white/[0.05] p-4 min-h-[300px] md:h-[600px]">
      {/* 🪄 Prettier Format Button */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-white text-sm font-medium">Code Editor</div>
        <Button onClick={formatCode} size="sm" variant="secondary">
          <Wand2 className="w-4 h-4" /> Format
        </Button>
      </div>

      <MonacoEditor
        height="500px"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
          readOnly: !isAuthenticated, // Initial readOnly state
        }}
        onChange={handleEditorChange}
        onMount={(editor) => {
          editorRef.current = editor; // Store the editor instance in a ref
        }}
        className="rounded-lg overflow-hidden"
      />
    </div>
  );
};

export default Editor;
