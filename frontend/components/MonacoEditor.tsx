"use client";
import { FC } from "react";
import Editor from "@monaco-editor/react";

interface MonacoEditorProps {
    code : string;
}

const MonacoEditor: FC<MonacoEditorProps> = ({ code }) => {

    return (
        <div className="p-5">
            <Editor height="90vh" defaultLanguage="hcl" theme="vs-dark"  defaultValue={code} />
        </div>
    );
};

export default MonacoEditor;
