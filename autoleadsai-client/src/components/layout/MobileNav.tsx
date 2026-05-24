// src/components/layout/MobileNav.tsx

import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiUsers,
  FiCompass,
  FiActivity,
  FiSettings,
} from 'react-icons/fi';

const mobileNavItems = [
  { icon: FiHome, label: 'Home', path: '/dashboard' },
  { icon: FiUsers, label: 'Leads', path: '/leads' },
  { icon: FiCompass, label: 'Discover', path: '/scans' },
  { icon: FiActivity, label: 'Activity', path: '/conversations' },
  { icon: FiSettings, label: 'Settings', path: '/settings' },
];

const MobileNav = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    if (path === '/leads') return location.pathname.startsWith('/leads');
    if (path === '/scans') return location.pathname.startsWith('/scans');
    if (path === '/conversations') return location.pathname.startsWith('/conversations');
    if (path === '/settings') return location.pathname.startsWith('/settings');
    return false;
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E7EB] safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {mobileNavItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors min-w-0
                ${active
                  ? 'text-[#2563EB]'
                  : 'text-[#9CA3AF] hover:text-[#6B7280]'
                }
              `}
            >
              <item.icon className={`w-5 h-5 ${active ? 'text-[#2563EB]' : ''}`} />
              <span className="text-[10px] font-medium truncate">{item.label}</span>
              {active && (
                <div className="absolute -top-px w-8 h-0.5 bg-[#2563EB] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;