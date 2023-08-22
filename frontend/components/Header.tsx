import { FC } from "react";

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {
  return (
    <header className="bg-blue-950 py-4 text-white text-center">
      <h1 className="text-4xl font-pacifico text-gray-100">
        TerraScribe{' '}
        <span className="hover:animate-wand" role="img" aria-label="Magic Wand">
          🪄
        </span>
      </h1>
      <h3 className="font-roboto text-gray-300">Generate terraform code by prompting</h3>
    </header>
  );
};

export default Header;