"use client";
import MonacoEditor from "@/components/MonacoEditor";
import Prompt from "@/components/Prompt";
import getRequest from "@/utils/getRequest";
import { useState } from "react";
// import Image from "next/image";


export default function Home() {

    const [generatedCode, setGeneratedCode] = useState<string>('');

    const generateCode = async (prompt : string, selectedProvider : string, selectedTfVersion : string) => {
        console.log(prompt);
        console.log(selectedProvider);
        console.log(selectedTfVersion);
        let data = await getRequest('http://localhost:8080/code');
        setGeneratedCode(data.message.choices[0].message.content);
        // postRequest('http://localhost:3000/api/generate', {
        //     prompt: prompt,
        //     provider: selectedProvider,
        //     version: selectedTfVersion,
        // });
    };
    return (
        <div className="bg-blue-950 m-0 p-0">
            <Prompt generateCode={generateCode}/>
            <MonacoEditor key={generatedCode} code={generatedCode}/>
        </div>
    );
}
