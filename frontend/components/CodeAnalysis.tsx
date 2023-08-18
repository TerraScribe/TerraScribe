"use client";
import { FC } from "react";
import { useState } from "react";

interface CodeAnalysisProps {
    analysis: string
}

const CodeAnalysis: FC<CodeAnalysisProps> = ({ analysis }) => {
    return (
        <div className="flex justify-between">
            <div className="w-[100%] mx-5">
                <div className="text-lg text-center text-gray-800">
                    {analysis}
                </div>        
            </div>
        </div>
    )
}

export default CodeAnalysis;