"use client";
import MonacoEditor from "@/components/MonacoEditor";
import Prompt from "@/components/Prompt";
// import Image from "next/image";


export default function Home() {
    const generateCode = (prompt : string, selectedProvider : string, selectedTfVersion : string) => {
        console.log(prompt);
        console.log(selectedProvider);
        console.log(selectedTfVersion);
        // postRequest('http://localhost:3000/api/generate', {
        //     prompt: prompt,
        //     provider: selectedProvider,
        //     version: selectedTfVersion,
        // });
    };
    return (
        <div className="bg-blue-950 m-0 p-0">
            <Prompt generateCode={generateCode}/>
            <MonacoEditor />
        </div>
    );
}
