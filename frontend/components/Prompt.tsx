'use client';
import { FC } from "react";
import { useState } from "react";

interface PromptProps { }

const Prompt: FC<PromptProps> = ({ }) => {

    const [prompt, setPrompt] = useState<string>('');
    const [selectedProvider, setSelectedProvider] = useState<string>('aws');
    const [selectedTfVersion, setSelectedTfVersion] = useState<string>('v1.5.5');

    const providerOptions = [
        { value: 'Amazon Web Service', label: 'Amazon Web Service' },
        { value: 'Microsoft Azure', label: 'Microsoft Azure' },
        { value: 'Google Cloud', label: 'Google Cloud' },
    ];

    const tfVersionOptions = [
        { value: 'v1.5.5', label: 'v1.5.5' },
        { value: 'v1.4.6', label: 'v1.4.6' },
        { value: 'v1.3.9', label: 'v1.3.9' },
        { value: 'v1.1.9', label: 'v1.1.9' },
        { value: 'v1.0.11', label: 'v1.0.11' },
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
        console.log(prompt);
        console.log(selectedProvider);
        console.log(selectedTfVersion);
    }

    const handleVisualizeClick = (e: any) => {
        e.preventDefault();
        console.log(prompt);
    }

    const handleBackClick = (e: any) => {
        e.preventDefault();
        console.log(prompt);
    }
    
    const handleForwardClick = (e: any) => {
        e.preventDefault();
        console.log(prompt);
    }

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-screen bg-blue-900 p-6 shadow-md flex items-center space-x-12">
                <textarea
                    className="flex-grow p-2 border rounded-md resize-none"
                    rows={1}
                    placeholder="Example : A ec2 instance within a vpc on AWS."
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
                >
                    Visualize
                </button>
                
            </div>
        </div>

    )
}

export default Prompt;