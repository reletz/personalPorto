import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/header"; //
import ActivityBar from "../components/activitybar"; //
import Sidebar from "../components/sidebar"; //
import ResizableWrapper from "../components/resizeableWrapper"; //
import { AppProvider } from "../context/AppContext"; // Impor AppProvider
import "./globals.css"; //

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
}); //

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
}); //

export const metadata: Metadata = {
  title: "Naufarrel Zhafif - Personal Portfolio",
  description: "Naufarrel Zhafif's personal portfolio, styled like VS Code.",
}; //

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden h-screen flex flex-col`}
        >
          <Header />
          <div className="flex flex-1 min-h-0">
            <ActivityBar />
            <ResizableWrapper>
              <Sidebar />
            </ResizableWrapper>
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </body>
      </AppProvider>
    </html>
  );
}