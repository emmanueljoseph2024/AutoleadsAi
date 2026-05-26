// src/components/layout/Topbar.tsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiBell,
  FiMenu,
  FiLogOut,
  FiUser,
  FiSettings,
  FiCreditCard,
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { useWebSocketEvents } from '../../hooks/useWebSocket';
import SearchBar from '../common/SearchBar';
import Avatar from '../common/Avatar';
import Toast from '../common/Toast';

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Real-time WebSocket events
  useWebSocketEvents({
    'lead.hot': (data: { leadName?: string }) => {
      setUnreadCount((prev) => prev + 1);
      setToast({
        message: `🔥 New hot lead: ${data.leadName || 'Check it out'}`,
        type: 'info',
      });
    },
    'email.replied': (data: { leadName?: string }) => {
      setUnreadCount((prev) => prev + 1);
      setToast({
        message: `💬 ${data.leadName || 'A lead'} replied to your email`,
        type: 'success',
      });
    },
    'notification.new': () => {
      setUnreadCount((prev) => prev + 1);
    },
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      window.location.href = `/leads?search=${encodeURIComponent(value.trim())}`;
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-[#E5E7EB] px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left Section */}
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={onMenuClick}
              className="lg:hidden text-[#6B7280] hover:text-[#111827] transition-colors"
              aria-label="Open menu"
            >
              <FiMenu className="w-5 h-5" />
            </button>

            <SearchBar
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search leads, companies, emails..."
              className="hidden sm:block max-w-md"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notification Bell */}
            <button
              onClick={() => setUnreadCount(0)}
              className="relative p-2 text-[#6B7280] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-xl transition-colors"
              aria-label="Notifications"
            >
              <FiBell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-4.5 h-4.5 bg-[#EF4444] text-white rounded-full text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 pl-3 py-1.5 pr-1.5 border-l border-[#E5E7EB] hover:bg-[#F9FAFB] rounded-xl transition-colors"
              >
                <span className="hidden sm:block text-sm font-medium text-[#111827]">
                  {user?.firstName} {user?.lastName}
                </span>
                <Avatar
                  name={`${user?.firstName} ${user?.lastName}`}
                  size="md"
                />
              </button>

              {/* Dropdown Menu */}
              {profileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-[#E5E7EB] shadow-lg z-50 py-1 animate-scale-in">
                    <div className="px-4 py-2 border-b border-[#E5E7EB]">
                      <p className="text-sm font-semibold text-[#111827] truncate">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-[#9CA3AF] truncate">{user?.email}</p>
                    </div>
                    <Link
                      to="/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#374151] hover:bg-[#F9FAFB] transition-colors"
                    >
                      <FiUser className="w-4 h-4 text-[#6B7280]" />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#374151] hover:bg-[#F9FAFB] transition-colors"
                    >
                      <FiSettings className="w-4 h-4 text-[#6B7280]" />
                      Settings
                    </Link>
                    <Link
                      to="/billing"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#374151] hover:bg-[#F9FAFB] transition-colors"
                    >
                      <FiCreditCard className="w-4 h-4 text-[#6B7280]" />
                      Billing
                    </Link>
                    <div className="border-t border-[#E5E7EB] mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#EF4444] hover:bg-[#FEF2F2] transition-colors w-full"
                      >
                        <FiLogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-16 right-4 z-50 animate-slide-down">
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}
    </>
  );
};

export default Topbar;