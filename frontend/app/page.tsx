"use client";
import MonacoEditor from "@/components/MonacoEditor";
import Prompt from "@/components/Prompt";
import getRequest from "@/utils/getRequest";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import postRequest from "@/utils/postRequest";
// import Image from "next/image";

export default function Home() {
    const [generatedCode, setGeneratedCode] = useState<string>("");

    const generateCode = async (
        prompt: string,
        selectedProvider: string,
        selectedTfVersion: string
    ) => {
        console.log(prompt);
        console.log(selectedProvider);
        console.log(selectedTfVersion);
        let data = await getRequest();
        setGeneratedCode(data.message.choices[0].message.content);
        // postRequest('http://localhost:3000/api/generate', {
        //     prompt: prompt,
        //     provider: selectedProvider,
        //     version: selectedTfVersion,
        // });
    };

    const generateCodeWithJSON = async (
        prompt: string,
        selectedProvider: string,
        selectedTfVersion: string,
        json: string
    ) => {
        console.log(prompt);
        console.log(selectedProvider);
        console.log(selectedTfVersion);
        console.log(json)
        let data = await postRequest({
            prompt: prompt,
            visual_json : json
            // provider: selectedProvider,
            // version: selectedTfVersion,
        });
        setGeneratedCode(data.message.choices[0].message.content);

    };
    return (
        <div className="bg-blue-950 h-screen m-0 p-0">
            <Prompt generateCode={generateCode} generateCodeWithJSON={generateCodeWithJSON} />
            <Editor
                height="80vh"
                language="hcl"
                theme="vs-dark"
                value={generatedCode}
            />
        </div>
    );
}
