"use client";
import visualize from "@/utils/visualizeRequest";
import { FC } from "react";
import { useState } from "react";
import MonacoEditor from "./MonacoEditor";

interface PromptProps {
    generateCode: (
        prompt: string,
        selectedProvider: string,
        selectedTfVersion: string
    ) => void;
}

const Prompt: FC<PromptProps> = ({ generateCode }) => {
    const [prompt, setPrompt] = useState<string>("");
    const [json, setJson] = useState<string>("");
    const [visualizeIsLoading, setVisualizeIsLoading] =
        useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedProvider, setSelectedProvider] = useState<string>("aws");
    const [selectedTfVersion, setSelectedTfVersion] =
        useState<string>("v1.5.5");

    const providerOptions = [
        { value: "Amazon Web Service", label: "Amazon Web Service" },
        { value: "Microsoft Azure", label: "Microsoft Azure" },
        { value: "Google Cloud", label: "Google Cloud" },
    ];

    const tfVersionOptions = [
        { value: "v1.5.5", label: "v1.5.5" },
        { value: "v1.4.6", label: "v1.4.6" },
        { value: "v1.3.9", label: "v1.3.9" },
        { value: "v1.1.9", label: "v1.1.9" },
        { value: "v1.0.11", label: "v1.0.11" },
    ];

    const handlePromptChange = (event: any) => {
        setPrompt(event.target.value);
    };

    const handleProviderChange = (event: any) => {
        setSelectedProvider(event.target.value);
    };

    const handleVersionChange = (event: any) => {
        setSelectedTfVersion(event.target.value);
    };

    const handleGenerateClick = (e: any) => {
        e.preventDefault();
        if (validatePromptInputs(prompt, selectedProvider, selectedTfVersion)) {
            generateCode(prompt, selectedProvider, selectedTfVersion);
        }
    };

    const handleVisualizeClick = async (e: any) => {
        e.preventDefault();
        if (validatePromptInputs(prompt, selectedProvider, selectedTfVersion)) {
            setVisualizeIsLoading(true);
            const data = await visualize(
                prompt,
                selectedProvider,
                selectedTfVersion
            );
            setJson(data);
            data !== "" && setShowModal(true);
            setVisualizeIsLoading(false);
        }
    };

    const handleBackClick = (e: any) => {
        e.preventDefault();
        console.log(prompt);
    };

    const handleForwardClick = (e: any) => {
        e.preventDefault();
        console.log(prompt);
    };

    const validatePromptInputs = (
        prompt: string,
        selectedProvider: string,
        selectedTfVersion: string
    ) => {
        if (!prompt && prompt === "") {
            return false;
        }
        if (!selectedProvider && selectedProvider === "") {
            return false;
        }
        if (!selectedTfVersion && selectedTfVersion === "") {
            return false;
        }
        return true;
    };
    return (
        <div className="flex-row items-center justify-center">
            <div className="w-full max-w-screen bg-blue-900 p-6 shadow-md flex-container flex flex-col md:flex-row md:items-stretch md:justify-stretch items-center space-x-6 space-y-6">
                <textarea
                    className="flex-grow p-2 border rounded-md resize-none"
                    rows={1}
                    placeholder="Example : An ec2 instance within a vpc on AWS."
                    value={prompt}
                    onChange={handlePromptChange}
                ></textarea>
                <select
                    className="px-2 py-1 border rounded-md bg-white text-gray-800"
                    value={selectedProvider}
                    onChange={handleProviderChange}
                >
                    <option key="select" value="select" disabled>
                        Select Provider
                    </option>
                    {providerOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <select
                    className="px-2 py-1 border rounded-md bg-white text-gray-800"
                    value={selectedTfVersion}
                    onChange={handleVersionChange}
                >
                    <option key="select" value="select" disabled>
                        Version
                    </option>
                    {tfVersionOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={handleGenerateClick}
                >
                    Generate
                </button>
                <button
                    className="bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-400 text-lg"
                    onClick={handleBackClick}
                >
                    &#8249;
                </button>
                <button
                    className="bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-400 text-lg"
                    onClick={handleForwardClick}
                >
                    &#8250;
                </button>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    onClick={handleVisualizeClick}
                    disabled={visualizeIsLoading}
                >
                    {visualizeIsLoading ? "Loading..." : "Visualize"}
                </button>
            </div>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-[90%] h-[90%] m-6 mx-auto">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between py-2 px-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Visualizer
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="h-6 w-6 text-2xl focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative flex-auto">
                                    <MonacoEditor value={json} />
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Generate
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
    );
};

export default Prompt;
