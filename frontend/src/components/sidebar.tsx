"use client";
import { useState } from "react";
import { ChevronRight, ChevronDown, Folder, File } from "lucide-react";

const Sidebar = () => {
  const [isFrontendOpen, setFrontendOpen] = useState(true);

  return (
    <div className="text-xs text-gray-300 font-mono select-none bg-[#0C1D2B]">
      {/* Explorer Title */}
      <p className="text-gray-400 text-[10px] mb-1 mt-1">EXPLORER</p>

      {/* Folder: frontend */}
      <div>
        <div
          className="flex items-center gap-1 cursor-pointer hover:bg-white/10 px-1 py-0.5"
          onClick={() => setFrontendOpen(!isFrontendOpen)}
        >
          {isFrontendOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          <Folder size={12} className="text-blue-400" />
          <span>frontend</span>
        </div>
        {isFrontendOpen && (
          <div className="ml-5">
            <div className="flex items-center gap-1 py-0.5">
              <File size={12} />
              <span>page.tsx</span>
            </div>
            <div className="flex items-center gap-1 py-0.5">
              <File size={12} />
              <span>layout.tsx</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
