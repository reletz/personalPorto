"use client";

import React from 'react';
import { useAppContext } from '../context/AppContext';
import { X } from 'lucide-react';

const fileContents: Record<string, React.ReactNode | string> = {
  home: <div className="p-4">Selamat datang di <span className="text-yellow-400">home.tsx</span>!</div>,
  about: <div className="p-4 prose prose-invert max-w-none"><h2>About Me</h2><pre><code>console.log("Halo, ini Markdown!");</code></pre></div>,
  projectAlpha: <div className="p-4">Detail untuk <span className="text-green-400">Proyek Alpha</span>. Dibuat dengan React dan Node.js.</div>,
  projectBeta: <div className="p-4">Informasi mengenai <span className="text-green-400">Proyek Beta</span>. Sebuah aplikasi mobile menggunakan Flutter.</div>,
  contact: <div className="p-4"><h3>Kontak Saya</h3><p>Hubungi aku di <a href="mailto:emailanda@example.com" className="text-blue-400 hover:underline">emailanda@example.com</a>.</p></div>,
  readme: <div className="p-4 prose prose-invert max-w-none"><h2>README.md</h2><p>Ini adalah README utama untuk proyek portofolio.</p><ul><li>Next.js</li><li>Tailwind CSS</li><li>TypeScript</li></ul></div>,
  settings: <div className="p-4 font-mono text-sm whitespace-pre-wrap">{`{
  "editor.fontSize": 14,
  "workbench.colorTheme": "Monokai Dimmed",
  "files.autoSave": "onFocusChange"
}`}</div>,
  terminal: <div className="p-4 bg-black text-green-400 font-mono h-full"><p className="whitespace-pre-wrap">&gt; npm run dev</p><p className="whitespace-pre-wrap">Ready on http://localhost:3000</p><p className="whitespace-pre-wrap">&gt; _</p></div>,
  default: <div className="p-6 text-gray-400 text-center">Tidak ada file yang terbuka. <br/>Pilih file dari Explorer untuk melihat kontennya.</div>, // Pesan default baru
};

const ContentDisplay = () => {
  const { openTabs, setOpenTabs, activeTabKey, setActiveTabKey } = useAppContext(); 
  const handleCloseTab = (keyToClose: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const newTabs = openTabs.filter(tab => tab.key !== keyToClose);
    setOpenTabs(newTabs);

    if (activeTabKey === keyToClose) {
      setActiveTabKey(newTabs.length > 0 ? newTabs[newTabs.length - 1].key : null);
    }
  };

  let contentToDisplay: React.ReactNode | string;

  if (activeTabKey) { // Jika ADA tab yang aktif
    if (fileContents[activeTabKey]) {
      contentToDisplay = fileContents[activeTabKey];
    } else {
      // Jika konten untuk activeTabKey tidak ditemukan (seharusnya tidak terjadi jika key selalu valid)
      const activeTabName = openTabs.find(tab => tab.key === activeTabKey)?.name || activeTabKey;
      contentToDisplay = <div className="p-4 text-orange-400">Konten untuk '{activeTabName}' belum didefinisikan.</div>;
    }
  } else {
    // Jika TIDAK ADA tab yang aktif (semua tab ditutup atau belum ada yang dibuka)
    contentToDisplay = fileContents['default']; // Tampilkan konten default
  }

  return (
    <div className="flex flex-col h-full bg-[#1E1E1E] text-white">
      {/* Tab Bar */}
      {openTabs.length > 0 && (
        <div className="flex border-b border-gray-700 bg-[#252526] overflow-x-auto"> {/* Tambah overflow-x-auto untuk tab yang banyak */}
          {openTabs.map((tab) => (
            <div
              key={tab.key}
              className={`flex items-center justify-between px-3 py-2 cursor-pointer text-xs whitespace-nowrap ${ // Tambah whitespace-nowrap
                activeTabKey === tab.key ? 'bg-[#1E1E1E] border-t-2 border-blue-500 text-white' : 'text-gray-400 hover:bg-[#333333]'
              }`}
              onClick={() => setActiveTabKey(tab.key)}
              title={tab.name} // Tambah title untuk tooltip
            >
              <span className="truncate max-w-[150px]">{tab.name}</span> {/* Batasi lebar nama tab */}
              <button
                onClick={(e) => handleCloseTab(tab.key, e)}
                className="ml-2 p-0.5 hover:bg-white/20 rounded" // Warna hover diubah agar lebih kontras
                aria-label={`Tutup ${tab.name}`}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        {typeof contentToDisplay === 'string' && (fileContents[activeTabKey || ''] === contentToDisplay && (activeTabKey === 'settings' || activeTabKey === 'terminal')) ? ( // Cek apakah itu settings atau terminal
          <pre className="p-4 whitespace-pre-wrap font-mono text-sm h-full">{contentToDisplay}</pre> // font-mono & text-sm khusus untuk settings/terminal
        ) : typeof contentToDisplay === 'string' ? (
          <pre className="p-4 whitespace-pre-wrap">{contentToDisplay}</pre>
        ) : (
          contentToDisplay // Ini untuk ReactNode (JSX)
        )}
      </div>
    </div>
  );
};

export default ContentDisplay;