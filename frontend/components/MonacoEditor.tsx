"use client";
import { FC, useState } from "react";
import Editor from "@monaco-editor/react";
import Visualizor from "./Visualizor";

interface MonacoEditorProps {
    value: string;
}

const MonacoEditor: FC<MonacoEditorProps> = ({ value }) => {
    const [code, setCode] = useState(value);

    return (
        <div className="flex justify-between">
            <div className="w-[50%] mx-5">
                <Editor
                    height="600px"
                    defaultLanguage="json"
                    theme="vs-dark"
                    value={code}
                    onChange={(newCode: string) => {
                        newCode !== code && setCode(newCode);
                    }}
                />
            </div>
            <div className="w-[50%] mx-5">
                <Visualizor code={code} />
            </div>
        </div>
    );
};

export default MonacoEditor;
