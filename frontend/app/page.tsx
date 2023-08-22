"use client";
import MonacoEditor from "@/components/MonacoEditor";
import Prompt from "@/components/Prompt";
import getRequest from "@/utils/getRequest";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import postRequest from "@/utils/postRequest";
import analysisRequest from "@/utils/analysisRequest";
import Header from "@/components/Header";
// import Image from "next/image";
import JSZip from 'jszip';

export default function Home() {
    const [generatedCode, setGeneratedCode] = useState<string>("");

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
            visual_json: json
            // provider: selectedProvider,
            // version: selectedTfVersion,
        });
        setGeneratedCode(data.message.choices[0].message.content);

    };

    const analyzeCode = async () => {
        if (generatedCode && generatedCode.length > 0) {
            let data = await analysisRequest({
                code: generatedCode
            });
            console.log(data)
            return data.message.choices[0].message.content;
        }
        return null;
    };

    const generateZIPFile = async () => {
        console.log(generatedCode)
        if (generatedCode && generatedCode.length > 0) {
            const zip = new JSZip();
            console.log('check')
            zip.file("main.tf", generatedCode);

            zip.generateAsync({ type: "blob" }).then(function (content) {
                // Create a download link
                const downloadLink = document.createElement("a");
                downloadLink.href = URL.createObjectURL(content);
                downloadLink.download = "terraform_code.zip";
                downloadLink.click();
            });


        }
    }
    return (
        <div className="bg-blue-950 h-screen m-0 p-0">
            <Header />
            <Prompt
                generatedCode={generatedCode}
                generateCodeWithJSON={generateCodeWithJSON}
                analyzeCode={analyzeCode}
                generateZIPFile={generateZIPFile}
            />
            <Editor
                height="80vh"
                language="hcl"
                theme="vs-dark"
                value={generatedCode}
                onChange={(newCode: any) => { setGeneratedCode(newCode) }}
                options={
                    {
                        fontSize: "16px"
                    }
                }
            />
        </div>
    );
}
