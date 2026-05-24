// src/components/layout/Footer.tsx

import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-[#E5E7EB] px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-[#9CA3AF]">
          &copy; {currentYear} AutoLeads AI. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link to="/privacy" className="text-xs text-[#9CA3AF] hover:text-[#6B7280] transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-xs text-[#9CA3AF] hover:text-[#6B7280] transition-colors">
            Terms of Service
          </Link>
          <Link to="/contact" className="text-xs text-[#9CA3AF] hover:text-[#6B7280] transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;