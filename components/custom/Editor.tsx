"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

interface EditorProps {
  code: string;
  setCode: (value: string) => void;
}

const Editor = ({ code, setCode }: EditorProps) => {
  useEffect(() => {
    const savedCode = localStorage.getItem("editorCode");
    if (savedCode) setCode(savedCode);
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setCode(value);
      localStorage.setItem("editorCode", value);
    }
  };

  return (
    <div className="relative bg-[#12121a] rounded-xl border border-white/[0.05] p-4 min-h-[300px] md:h-[600px]">
      <div className="bg-[#1e1e2e] rounded-lg p-3 mb-4 h-12 flex items-center"></div>
      <MonacoEditor
        height="500px"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
        onChange={handleEditorChange}
        className="rounded-lg overflow-hidden"
      />
    </div>
  );
};

export default Editor;
