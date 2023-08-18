import { FC } from "react";

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {
    return (
        <header className="bg-blue-950 py-4 text-white text-center">
        <h1 className="text-3xl font-semibold">
        TerraScribe{' '}
        <span className="hover:animate-wand" role="img" aria-label="Magic Wand">
          🪄
        </span>
        </h1>
        <h3>Generate terraform code by prompting</h3>
    </header>
    );
};

export default Header;