import MonacoEditor from "@/components/MonacoEditor";
import Prompt from "@/components/Prompt";
import Image from "next/image";

export default function Home() {
    return (
        <div className="bg-blue-950 m-0 p-0">
            <Prompt />
            <MonacoEditor />
        </div>
    );
}
