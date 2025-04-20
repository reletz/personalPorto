import Image from 'next/image'

const Header = () => {
  return (
    <header className="bg-[#1E1E1E] text-white flex items-center justify-between px-4 py-2 font-mono relative">
      <div className="flex items-center space-x-4">
        <Image 
          src="/vsc_logo.svg" 
          alt="VSCode" 
          width={25} 
          height={25} 
        />
        <p className="text-xs">File</p>
        <p className="text-xs">Edit</p>
        <p className="text-xs">Selection</p>
        <p className="text-xs">View</p>
        <p className="text-xs">Go</p>
        <p className="text-xs">Run</p>
        <p className="text-xs">Terminal</p>
        <p className="text-xs">Help</p>
      </div>

      <span className="absolute left-1/2 transform -translate-x-1/2 text-sm">
        Naufarrel Zhafif - Personal Portfolio
      </span>

      <div className="flex space-x-2">
        <button className="w-3 h-3 rounded-full bg-[#FF5F56]" aria-label="Close"></button>
        <button className="w-3 h-3 rounded-full bg-[#FFBD2E]" aria-label="Minimize"></button>
        <button className="w-3 h-3 rounded-full bg-[#27C93F]" aria-label="Zoom"></button>
      </div>
    </header>
  );
}

export default Header;  