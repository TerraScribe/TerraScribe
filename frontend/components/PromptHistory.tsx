"use client";
import { FC } from "react";
import { useState } from "react";

interface PromptHistoryProps {
    prompts: Array<string>
}

const PromptHistory: FC<PromptHistoryProps> = ({ prompts }) => {
    return (
        <div className="flex justify-between">
            <div className="w-[100%] mx-5">
                <div className="bg-gray-100 p-4">
                    {prompts.length > 0 ? (
                        <ul className="space-y-2">
                            {prompts.map((prompt, index) => (
                                <li key={index} className="bg-white p-3 shadow-md rounded">
                                    {prompt}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">No prompts</p>
                    )}
                </div>        
            </div>
        </div>
    )
}

export default PromptHistory