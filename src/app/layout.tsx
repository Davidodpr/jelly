"use client";

import "./globals.css";
import MascotGame from "@/components/MascotGame";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isGameOpen, setIsGameOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 antialiased flex flex-col min-h-screen overflow-x-hidden">
        <Header />

        <div className="flex-grow">
          {children}
        </div>

        <Footer />

        {/* Mascot */}
        <div className="fixed bottom-4 left-4 z-40 group pointer-events-auto">
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-white text-black text-xs font-bold py-2 px-3 rounded-xl shadow-lg text-center relative">
              Psst... Play me!
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
            </div>
          </div>

          <div
            onClick={() => setIsGameOpen(true)}
            className="cursor-pointer transition-transform duration-300 hover:scale-110 hover:rotate-3 active:scale-95"
          >
            <img
              src="/mascot.png"
              alt="Jellymove mascot"
              className="w-24 md:w-32 h-auto drop-shadow-lg opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        <MascotGame isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
      </body>
    </html>
  );
}
