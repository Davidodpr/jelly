'use client';

import React, { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-900">
          <span className="bg-gradient-to-r from-[#ff006e] via-[#00f5ff] to-[#ffbe0b] bg-clip-text text-transparent">Jellymove</span>
        </div>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center space-x-6 text-sm font-semibold">
            <li>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00f5ff] focus:ring-offset-2 focus:ring-offset-white rounded px-2 py-1">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00f5ff] focus:ring-offset-2 focus:ring-offset-white rounded px-2 py-1">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00f5ff] focus:ring-offset-2 focus:ring-offset-white rounded px-2 py-1">
                Contact
              </a>
            </li>
            <li>
              <a href="#audit-section" className="text-[#0891b2] hover:text-[#0891b2]/80 font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00f5ff] focus:ring-offset-2 focus:ring-offset-white rounded px-2 py-1">
                Free Audit
              </a>
            </li>
            <li>
              <a
                href="mailto:hi@jellymove.com"
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-gray-900 hover:border-[#00f5ff] hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-[#00f5ff] focus:ring-offset-2 focus:ring-offset-white"
              >
                Make your move
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-900 p-2 focus:outline-none focus:ring-2 focus:ring-[#00f5ff] rounded"
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
        <nav className="md:hidden bg-white border-t border-gray-100">
          <ul className="flex flex-col px-6 py-4 space-y-4 text-sm font-semibold">
            <li>
              <a
                href="#about"
                onClick={() => setIsOpen(false)}
                className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00f5ff] rounded px-2 py-2"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={() => setIsOpen(false)}
                className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00f5ff] rounded px-2 py-2"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00f5ff] rounded px-2 py-2"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#audit-section"
                onClick={() => setIsOpen(false)}
                className="block text-[#0891b2] font-bold hover:text-[#0891b2]/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00f5ff] rounded px-2 py-2"
              >
                Free Audit
              </a>
            </li>
            <li>
              <a
                href="mailto:hi@jellymove.com"
                onClick={() => setIsOpen(false)}
                className="inline-block rounded-full border border-gray-200 bg-white px-4 py-2 text-gray-900 hover:border-[#00f5ff] hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-[#00f5ff]"
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
