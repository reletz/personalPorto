"use client";
import { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FileText, Terminal, Cog, User, Briefcase, Mail } from "lucide-react";
import { useAppContext } from "../context/AppContext"; // Impor useAppContext

// FileItem interface (pastikan sudah ada atau pindahkan dari implementasi sebelumnya)
interface FileItem {
  name: string;
  type: "file" | "folder";
  icon?: React.ElementType;
  children?: FileItem[];
  contentKey: string; // contentKey wajib ada untuk file agar bisa diidentifikasi
}

// initialExplorerItems (pastikan sudah ada atau pindahkan dari implementasi sebelumnya)
const initialExplorerItems: FileItem[] = [
  {
    name: "Portfolio",
    type: "folder",
    icon: Folder,
    contentKey: "portfolio-folder", // folder juga bisa punya key jika diperlukan
    children: [
      { name: "home.tsx", type: "file", icon: FileText, contentKey: "home" },
      { name: "about.md", type: "file", icon: User, contentKey: "about" },
      {
        name: "projects",
        type: "folder",
        icon: Folder,
        contentKey: "projects-folder",
        children: [
          { name: "Project-Alpha.ts", type: "file", icon: Briefcase, contentKey: "projectAlpha" },
          { name: "Project-Beta.tsx", type: "file", icon: Briefcase, contentKey: "projectBeta" },
        ],
      },
      { name: "contact.html", type: "file", icon: Mail, contentKey: "contact" },
    ],
  },
  {
    name: "README.md",
    type: "file",
    icon: FileText,
    contentKey: "readme",
  },
  { name: "settings.json", type: "file", icon: Cog, contentKey: "settings" },
  { name: "terminal.js", type: "file", icon: Terminal, contentKey: "terminal" },
];


interface ExplorerItemProps {
  item: FileItem;
  level: number;
  // onFileSelect dihapus, kita akan pakai context langsung
}

const ExplorerItem: React.FC<ExplorerItemProps> = ({ item, level }) => {
  const [isOpen, setIsOpen] = useState(item.type === "folder");
  const { setSelectedFile, openTabs, setOpenTabs, setActiveTabKey } = useAppContext();
  const IconComponent = item.icon || (item.type === "folder" ? Folder : FileText);

  const handleToggle = () => {
    if (item.type === "folder") {
      setIsOpen(!isOpen);
    } else {
      // Update selected file
      setSelectedFile({ key: item.contentKey, name: item.name });

      // Add to openTabs if not already open
      if (!openTabs.find(tab => tab.key === item.contentKey)) {
        setOpenTabs([...openTabs, { key: item.contentKey, name: item.name }]);
      }
      // Set as active tab
      setActiveTabKey(item.contentKey);
    }
  };

  return (
    <div>
      <div
        className="flex items-center gap-1 cursor-pointer hover:bg-white/10 px-1 py-0.5"
        style={{ paddingLeft: `${level * 12 + 4}px` }}
        onClick={handleToggle}
      >
        {item.type === "folder" && (isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />)}
        <IconComponent size={12} className={item.type === "folder" ? "text-blue-400" : "text-gray-400"} />
        <span>{item.name}</span>
      </div>
      {item.type === "folder" && isOpen && item.children && (
        <div>
          {item.children.map((child) => (
            <ExplorerItem key={child.contentKey} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  // selectedFile state dipindahkan ke AppContext
  // handleFileSelect juga tidak diperlukan lagi di sini

  return (
    <div className="w-full h-full text-xs text-gray-300 font-mono select-none bg-[#1E2D3B] overflow-y-auto">
      <p className="text-gray-400 text-[10px] p-2 sticky top-0 bg-[#1E2D3B] z-10">
        EXPLORER
      </p>
      <div className="p-1">
        {initialExplorerItems.map((item) => (
          <ExplorerItem key={item.contentKey} item={item} level={0} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;