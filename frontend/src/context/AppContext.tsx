"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AppContextType {
  selectedFile: { key: string; name: string } | null;
  setSelectedFile: (file: { key: string; name: string } | null) => void;
  openTabs: { key: string; name: string }[];
  setOpenTabs: (tabs: { key: string; name: string }[]) => void;
  activeTabKey: string | null;
  setActiveTabKey: (key: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFile, setSelectedFile] = useState<{ key: string; name: string } | null>(null);
  const [openTabs, setOpenTabs] = useState<{ key: string; name: string }[]>([]);
  const [activeTabKey, setActiveTabKey] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{
      selectedFile, setSelectedFile,
      openTabs, setOpenTabs,
      activeTabKey, setActiveTabKey
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};