import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#050110] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-9xl font-black text-[#ff006e] mb-4">404</h1>
            <h2 className="text-4xl font-bold text-white mb-6">Airball!</h2>
            <p className="text-xl text-white/60 mb-8 max-w-md">
                You missed the hoop entirely. This page doesn&apos;t exist.
            </p>
            <Link
                href="/"
                className="px-8 py-4 bg-[#00f5ff] text-black font-bold rounded-full hover:scale-105 transition-transform"
            >
                Back to Court
            </Link>
        </div>
    );
}
