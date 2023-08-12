"use client";
import { FC } from "react";
import Editor from "@monaco-editor/react";

interface MonacoEditorProps {}

const MonacoEditor: FC<MonacoEditorProps> = ({}) => {
    return <Editor height="90vh" defaultLanguage="hcl" theme="vs-dark" />;
};

export default MonacoEditor;
