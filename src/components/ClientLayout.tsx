"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import MascotGame from "@/components/MascotGame";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isGameOpen, setIsGameOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTooltip(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className="flex-grow">
                {children}
            </div>

            {/* Mascot Trigger */}
            <div className="fixed bottom-4 left-4 z-40 group pointer-events-auto">
                {/* Tooltip */}
                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 transition-opacity duration-300 pointer-events-none ${showTooltip ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <div className="bg-white text-black text-xs font-bold py-2 px-3 rounded-xl shadow-lg text-center relative">
                        Psst... Play me!
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
                    </div>
                </div>

                <div
                    onClick={() => setIsGameOpen(true)}
                    className="cursor-pointer transition-transform duration-300 hover:scale-110 hover:rotate-3 active:scale-95"
                >
                    <Image
                        src="/mascot.png"
                        alt="Jellymove mascot"
                        width={128}
                        height={128}
                        className="w-24 md:w-32 h-auto drop-shadow-lg opacity-90 hover:opacity-100 transition-opacity"
                        priority
                    />
                </div>
            </div>

            <MascotGame isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
        </>
    );
}
