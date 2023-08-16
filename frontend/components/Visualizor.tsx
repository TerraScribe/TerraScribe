"use client";
import { FC, useCallback, useEffect, useRef, useState } from "react";

interface VisualizorProps {
    code: string;
}

const Visualizor: FC<VisualizorProps> = ({ code }) => {
    const [json, setJson] = useState("");
    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    const sendToEmbed = useCallback(() => {
        if (json === "") {
            console.log("Empty code");
            return;
        }

        if (iframeRef.current) {
            const jsonCrackEmbed = iframeRef.current;
            const options = {
                theme: "dark",
                direction: "RIGHT",
            };

            jsonCrackEmbed.contentWindow?.postMessage(
                {
                    json,
                    options,
                },
                "*"
            );
        }
    }, [json]);

    useEffect(() => {
        setJson(code);
        sendToEmbed();
    }, [code, sendToEmbed]);

    return (
        <section>
            <iframe
                id="jsoncrackEmbed"
                ref={iframeRef}
                src="https://jsoncrack.com/widget"
                width="100%"
                height="600px"
                onLoad={() => {
                    sendToEmbed();
                }}
            ></iframe>
        </section>
    );
};

export default Visualizor;
