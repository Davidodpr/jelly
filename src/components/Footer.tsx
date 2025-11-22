const Footer = () => {
  return (
    <footer className="relative py-12 border-t border-white/10 bg-gradient-to-r from-[#ff006e]/5 via-[#0d0221] to-[#00f5ff]/5 backdrop-blur">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-4">
          <span className="text-lg font-bold bg-gradient-to-r from-[#ff006e] via-[#00f5ff] to-[#ffbe0b] bg-clip-text text-transparent">
            Jellymove
          </span>
        </div>
        <p className="text-sm text-gray-400 mb-2">
          Automation handles busy. You handle brilliant.
        </p>
        <p className="text-sm text-gray-300 mb-3">
          And remember: Faith first. Everything else follows.
        </p>
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Jellymove. Built different.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
