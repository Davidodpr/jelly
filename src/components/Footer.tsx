const Footer = () => {
  return (
    <footer className="relative py-12 border-t border-gray-200 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-4">
          <span className="text-lg font-bold bg-gradient-to-r from-[#ff006e] via-[#00f5ff] to-[#ffbe0b] bg-clip-text text-transparent">
            Jellymove
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2 font-medium">
          Automation handles busy. You handle brilliant.
        </p>
        <p className="text-sm text-gray-900 mb-3 font-bold">
          And remember: Faith first. Everything else follows.
        </p>
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Jellymove. Built different.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
