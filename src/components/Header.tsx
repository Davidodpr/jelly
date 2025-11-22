'use client';

import React, { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">
          <span className="bg-gradient-to-r from-[#ff006e] via-[#00f5ff] to-[#ffbe0b] bg-clip-text text-transparent">Jellymove</span>
        </div>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center space-x-6 text-sm font-semibold">
            <li>
              <a href="#about" className="text-white/80 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00f5ff] focus:ring-offset-2 focus:ring-offset-[#0d0221] rounded px-2 py-1">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="text-white/80 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00f5ff] focus:ring-offset-2 focus:ring-offset-[#0d0221] rounded px-2 py-1">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="text-white/80 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00f5ff] focus:ring-offset-2 focus:ring-offset-[#0d0221] rounded px-2 py-1">
                Contact
              </a>
            </li>
            <li>
              <a
                href="mailto:hi@jellymove.com"
                className="rounded-full border border-[#ff006e]/40 px-4 py-2 text-white hover:border-[#00f5ff] hover:shadow-[#00f5ff]/20 hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-[#00f5ff] focus:ring-offset-2 focus:ring-offset-[#0d0221]"
              >
                Make your move
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 focus:outline-none focus:ring-2 focus:ring-[#00f5ff] rounded"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/5">
          <ul className="flex flex-col px-6 py-4 space-y-4 text-sm font-semibold">
            <li>
              <a
                href="#about"
                onClick={() => setIsOpen(false)}
                className="block text-white/80 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00f5ff] rounded px-2 py-2"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={() => setIsOpen(false)}
                className="block text-white/80 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00f5ff] rounded px-2 py-2"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block text-white/80 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00f5ff] rounded px-2 py-2"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="mailto:hi@jellymove.com"
                onClick={() => setIsOpen(false)}
                className="inline-block rounded-full border border-[#ff006e]/40 px-4 py-2 text-white hover:border-[#00f5ff] hover:shadow-[#00f5ff]/20 hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-[#00f5ff]"
              >
                Make your move
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
