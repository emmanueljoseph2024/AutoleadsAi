// src/components/layout/Sidebar.tsx

import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiUsers,
  FiCompass,
  FiFilter,
  FiBarChart2,
  FiActivity,
  FiGrid,
  FiSettings,
  FiCreditCard,
  FiMessageSquare,
  FiMail,
  FiX,
} from 'react-icons/fi';
import AutoleadsAiLogo from '../../assets/AutoleadsAiLogo.svg';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { icon: FiHome, label: 'Dashboard', path: '/dashboard' },
  { icon: FiUsers, label: 'Leads', path: '/leads' },
  { icon: FiCompass, label: 'Discover', path: '/scans' },
  { icon: FiFilter, label: 'Niches', path: '/niches' },
  { icon: FiBarChart2, label: 'Analytics', path: '/dashboard' },
  { icon: FiActivity, label: 'Monitoring', path: '/conversations' },
  { icon: FiMessageSquare, label: 'Messages', path: '/messages' },
  { icon: FiMail, label: 'Email Logs', path: '/email-logs' },
  { icon: FiGrid, label: 'Workflows', path: '/workflows' },
];

const bottomItems = [
  { icon: FiSettings, label: 'Settings', path: '/settings' },
  { icon: FiCreditCard, label: 'Billing', path: '/billing' },
  { icon: FiUsers, label: 'Team', path: '/team' },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen w-60 bg-white border-r border-[#E5E7EB] flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-[#E5E7EB]">
        <div className="w-8 h-8 bg-linear-to-br from-[#2563EB] to-[#4F46E5] rounded-lg flex items-center justify-center shrink-0">
          <img src={AutoleadsAiLogo} alt="Logo" className="w-5 h-5" />
        </div>
        <h1 className="text-sm font-bold text-[#111827] leading-tight">AUTOLEDS AI</h1>
        <button
          onClick={onClose}
          className="lg:hidden ml-auto text-[#9CA3AF] hover:text-[#111827] transition-colors"
          aria-label="Close sidebar"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                ${active
                  ? 'bg-[#EFF6FF] text-[#2563EB]'
                  : 'text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]'
                }
              `}
            >
              <item.icon className={`w-4 h-4 ${active ? 'text-[#2563EB]' : ''}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="px-3 py-4 border-t border-[#E5E7EB] space-y-1">
        {bottomItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                ${active
                  ? 'bg-[#EFF6FF] text-[#2563EB]'
                  : 'text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]'
                }
              `}
            >
              <item.icon className={`w-4 h-4 ${active ? 'text-[#2563EB]' : ''}`} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;