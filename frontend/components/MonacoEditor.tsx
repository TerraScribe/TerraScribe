"use client";
import { FC } from "react";
import Editor from "@monaco-editor/react";

interface MonacoEditorProps {}

const MonacoEditor: FC<MonacoEditorProps> = ({}) => {
    return (
        <div className="p-5">
            <Editor height="90vh" defaultLanguage="hcl" theme="vs-dark" />
        </div>
    );
};

export default MonacoEditor;
