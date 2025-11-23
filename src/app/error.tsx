'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-[#050110] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-6xl font-black text-[#ffbe0b] mb-4">Foul!</h1>
            <h2 className="text-2xl font-bold text-white mb-6">Something went wrong.</h2>
            <button
                onClick={reset}
                className="px-8 py-4 bg-[#ff006e] text-white font-bold rounded-full hover:scale-105 transition-transform"
            >
                Replay Down
            </button>
        </div>
    );
}
