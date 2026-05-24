// src/pages/dashboard/DashboardPage.tsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiSearch,
  FiBell,
  FiMenu,
  FiX,
  FiHome,
  FiUsers,
  FiCompass,
  FiFilter,
  FiBarChart2,
  FiActivity,
  FiGrid,
  FiSettings,
  FiExternalLink,
  FiArrowUp,
  FiMoreHorizontal,
  FiMessageCircle,
  FiGlobe,
  FiTarget,
} from 'react-icons/fi';
import { FaLinkedinIn, FaRedditAlien } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import { useAuth } from '../../contexts/AuthContext';
import AutoleadsAiLogo from '../../assets/AutoleadsAiLogo.svg';

// ─── Types ────────────────────────────────────────────
interface KpiStats {
  qualifiedLeads: number;
  conversionRate: number;
  highIntentLeads: number;
  qualifiedChange: number;
  conversionChange: number;
  intentChange: number;
}

interface QualityDistribution {
  high: { percentage: number; count: number };
  medium: { percentage: number; count: number };
  low: { percentage: number; count: number };
}

interface MonitoringAlert {
  id: string;
  platform: 'linkedin' | 'reddit' | 'twitter';
  message: string;
  time: string;
  timestamp: string;
}

const DashboardPage = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [kpi] = useState<KpiStats>({
    qualifiedLeads: 36782,
    conversionRate: 18.6,
    highIntentLeads: 7532,
    qualifiedChange: 12.5,
    conversionChange: 4.3,
    intentChange: 8.2,
  });

  const [quality] = useState<QualityDistribution>({
    high: { percentage: 28.5, count: 10467 },
    medium: { percentage: 50.1, count: 18430 },
    low: { percentage: 21.4, count: 7885 },
  });

  const [alerts] = useState<MonitoringAlert[]>([
    {
      id: '1',
      platform: 'linkedin',
      message: 'Potential 828 Lead Found',
      time: 'Just now',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      platform: 'reddit',
      message: 'High Intent Keyword Detected',
      time: '2m ago',
      timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
    },
    {
      id: '3',
      platform: 'twitter',
      message: 'Lead Opportunity Found',
      time: '3m ago',
      timestamp: new Date(Date.now() - 3 * 60000).toISOString(),
    },
  ]);

  // ─── Sidebar Nav ────────────────────────────────────
  const navItems = [
    { icon: FiHome, label: 'Dashboard', path: '/dashboard', active: true },
    { icon: FiUsers, label: 'Leads', path: '/leads' },
    { icon: FiCompass, label: 'Discover', path: '/scans' },
    { icon: FiFilter, label: 'AI Filter', path: '/niches' },
    { icon: FiBarChart2, label: 'Analytics', path: '/dashboard' },
    { icon: FiActivity, label: 'Monitoring', path: '/conversations' },
    { icon: FiGrid, label: 'Integrations', path: '/workflows' },
    { icon: FiSettings, label: 'Settings', path: '/settings' },
  ];

  // ─── Helpers ────────────────────────────────────────
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <FaLinkedinIn className="w-3.5 h-3.5 text-[#0A66C2]" />;
      case 'reddit':
        return <FaRedditAlien className="w-3.5 h-3.5 text-[#FF4500]" />;
      case 'twitter':
        return <SiX className="w-3.5 h-3.5 text-[#111827]" />;
      default:
        return <FiGlobe className="w-3.5 h-3.5 text-[#6B7280]" />;
    }
  };

  const getPlatformLabel = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return 'LinkedIn Post';
      case 'reddit':
        return 'Reddit Discussion';
      case 'twitter':
        return 'X (Twitter) Mention';
      default:
        return platform;
    }
  };

  // ─── Donut Chart Component ──────────────────────────
  const DonutChart = () => {
    const total = quality.high.count + quality.medium.count + quality.low.count;
    const highAngle = (quality.high.count / total) * 360;
    const mediumAngle = (quality.medium.count / total) * 360;
    const lowAngle = 360 - highAngle - mediumAngle;

    return (
      <div className="flex items-center gap-6 sm:gap-8">
        {/* SVG Donut */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle
              cx="18"
              cy="18"
              r="15.9"
              fill="none"
              stroke="#2563EB"
              strokeWidth="4"
              strokeDasharray={`${(highAngle / 360) * 100} ${100 - (highAngle / 360) * 100}`}
              strokeDashoffset="0"
              className="transition-all duration-700"
            />
            <circle
              cx="18"
              cy="18"
              r="15.9"
              fill="none"
              stroke="#06B6D4"
              strokeWidth="4"
              strokeDasharray={`${(mediumAngle / 360) * 100} ${100 - (mediumAngle / 360) * 100}`}
              strokeDashoffset={`${-(highAngle / 360) * 100}`}
              className="transition-all duration-700"
            />
            <circle
              cx="18"
              cy="18"
              r="15.9"
              fill="none"
              stroke="#9CA3AF"
              strokeWidth="4"
              strokeDasharray={`${(lowAngle / 360) * 100} ${100 - (lowAngle / 360) * 100}`}
              strokeDashoffset={`${-((highAngle + mediumAngle) / 360) * 100}`}
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-base sm:text-lg font-bold text-[#111827]">
              {kpi.qualifiedLeads.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#2563EB] flex-shrink-0" />
            <span className="text-xs sm:text-sm text-[#374151]">High Quality</span>
            <span className="text-xs sm:text-sm font-semibold text-[#111827] ml-auto">
              {quality.high.percentage}%
            </span>
            <span className="text-[10px] sm:text-xs text-[#9CA3AF]">
              ({quality.high.count.toLocaleString()})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#06B6D4] flex-shrink-0" />
            <span className="text-xs sm:text-sm text-[#374151]">Medium Quality</span>
            <span className="text-xs sm:text-sm font-semibold text-[#111827] ml-auto">
              {quality.medium.percentage}%
            </span>
            <span className="text-[10px] sm:text-xs text-[#9CA3AF]">
              ({quality.medium.count.toLocaleString()})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#9CA3AF] flex-shrink-0" />
            <span className="text-xs sm:text-sm text-[#374151]">Low Quality</span>
            <span className="text-xs sm:text-sm font-semibold text-[#111827] ml-auto">
              {quality.low.percentage}%
            </span>
            <span className="text-[10px] sm:text-xs text-[#9CA3AF]">
              ({quality.low.count.toLocaleString()})
            </span>
          </div>
        </div>
      </div>
    );
  };

  // ─── Main Render ────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen w-60 bg-white border-r border-[#E5E7EB] flex flex-col
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-[#E5E7EB]">
          <div className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-[#4F46E5] rounded-lg flex items-center justify-center flex-shrink-0">
            <img src={AutoleadsAiLogo} alt="Logo" className="w-5 h-5" />
          </div>
          <h1 className="text-sm font-bold text-[#111827] leading-tight">AUTOLEDS AI</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden ml-auto text-[#9CA3AF] hover:text-[#111827]"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                ${item.active
                  ? 'bg-[#EFF6FF] text-[#2563EB]'
                  : 'text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]'
                }
              `}
            >
              <item.icon className={`w-4 h-4 ${item.active ? 'text-[#2563EB]' : ''}`} />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-[#E5E7EB] px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-3 flex-1">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-[#6B7280] hover:text-[#111827] transition-colors"
              >
                <FiMenu className="w-5 h-5" />
              </button>
              <div className="relative flex-1 max-w-md hidden sm:block">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="Search leads, companies, emails..."
                  className="w-full pl-10 pr-4 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 text-[#6B7280] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-xl transition-colors">
                <FiBell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full ring-2 ring-white" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-[#4F46E5] rounded-xl flex items-center justify-center text-white text-xs font-bold">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs sm:text-sm text-[#6B7280] font-medium">Qualified Leads</span>
                <FiMoreHorizontal className="w-4 h-4 text-[#9CA3AF]" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-[#111827]">
                {kpi.qualifiedLeads.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 mt-1.5">
                <FiArrowUp className="w-3.5 h-3.5 text-[#22C55E]" />
                <span className="text-xs font-medium text-[#22C55E]">{kpi.qualifiedChange}%</span>
                <span className="text-xs text-[#9CA3AF]">vs last 7 days</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs sm:text-sm text-[#6B7280] font-medium">Conversion Rate</span>
                <FiMoreHorizontal className="w-4 h-4 text-[#9CA3AF]" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-[#111827]">{kpi.conversionRate}%</div>
              <div className="flex items-center gap-1 mt-1.5">
                <FiArrowUp className="w-3.5 h-3.5 text-[#22C55E]" />
                <span className="text-xs font-medium text-[#22C55E]">{kpi.conversionChange}%</span>
                <span className="text-xs text-[#9CA3AF]">vs last 7 days</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs sm:text-sm text-[#6B7280] font-medium">High Intent Leads</span>
                <FiMoreHorizontal className="w-4 h-4 text-[#9CA3AF]" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-[#111827]">
                {kpi.highIntentLeads.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 mt-1.5">
                <FiArrowUp className="w-3.5 h-3.5 text-[#22C55E]" />
                <span className="text-xs font-medium text-[#22C55E]">{kpi.intentChange}%</span>
                <span className="text-xs text-[#9CA3AF]">vs last 7 days</span>
              </div>
            </div>
          </div>

          {/* Scanning Banner */}
          <div className="bg-gradient-to-r from-[#EFF6FF] to-[#EEF2FF] border border-[#2563EB]/10 rounded-2xl p-3 sm:p-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-[#2563EB]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <div className="w-2.5 h-2.5 bg-[#2563EB] rounded-full animate-pulse" />
            </div>
            <p className="text-xs sm:text-sm text-[#2563EB] font-medium">
              Scanning the web... Finding leads <span className="font-bold">24/7</span>
            </p>
          </div>

          {/* Middle Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Lead Quality Distribution */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-bold text-[#111827]">High Quality Distribution</h3>
                <FiMoreHorizontal className="w-4 h-4 text-[#9CA3AF]" />
              </div>
              <div className="flex items-baseline gap-2 mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-[#111827]">36,782</span>
                <span className="text-xs text-[#9CA3AF]">vs last 7 days</span>
              </div>
              <DonutChart />
            </div>

            {/* Real-Time Monitoring */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-bold text-[#111827]">Real-Time Monitoring</h3>
                <span className="px-2.5 py-0.5 bg-[#EFF6FF] text-[#2563EB] rounded-full text-xs font-bold">
                  {alerts.length}
                </span>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start gap-3 p-3 rounded-xl bg-[#F9FAFB] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-[#E5E7EB]">
                      {getPlatformIcon(alert.platform)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#9CA3AF]">{getPlatformLabel(alert.platform)}</p>
                      <p className="text-sm font-medium text-[#111827] truncate">{alert.message}</p>
                    </div>
                    <span className="text-[10px] sm:text-xs text-[#9CA3AF] flex-shrink-0">{alert.time}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/conversations"
                className="inline-flex items-center gap-1 text-xs sm:text-sm text-[#2563EB] hover:underline font-medium mt-4"
              >
                View All Alerts
                <FiExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Channel Performance */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-[#111827] mb-4">Channel Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F9FAFB] rounded-xl p-4 text-center">
                  <div className="w-8 h-8 bg-[#EFF6FF] rounded-lg flex items-center justify-center mx-auto mb-2">
                    <FiArrowUp className="w-4 h-4 text-[#2563EB]" />
                  </div>
                  <p className="text-xs text-[#6B7280] mb-1">Inbound</p>
                  <p className="text-xl sm:text-2xl font-bold text-[#111827]">2,451</p>
                  <p className="text-xs text-[#9CA3AF] mt-1">Conversation Rate</p>
                  <p className="text-sm font-semibold text-[#22C55E]">12.8%</p>
                </div>
                <div className="bg-[#F9FAFB] rounded-xl p-4 text-center">
                  <div className="w-8 h-8 bg-[#EEF2FF] rounded-lg flex items-center justify-center mx-auto mb-2">
                    <FiTarget className="w-4 h-4 text-[#4F46E5]" />
                  </div>
                  <p className="text-xs text-[#6B7280] mb-1">Outbound</p>
                  <p className="text-xl sm:text-2xl font-bold text-[#111827]">5,128</p>
                  <p className="text-xs text-[#9CA3AF] mt-1">Conversation Rate</p>
                  <p className="text-sm font-semibold text-[#22C55E]">8.4%</p>
                </div>
              </div>
            </div>

            {/* Conversion Rate Detail */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-[#111827] mb-4">Conversion Rate</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F9FAFB] rounded-xl p-4 text-center">
                  <div className="w-8 h-8 bg-[#DCFCE7] rounded-lg flex items-center justify-center mx-auto mb-2">
                    <FiMessageCircle className="w-4 h-4 text-[#22C55E]" />
                  </div>
                  <p className="text-xs text-[#6B7280] mb-1">Email Outreach</p>
                  <p className="text-xl sm:text-2xl font-bold text-[#111827]">24.3%</p>
                  <p className="text-xs text-[#9CA3AF] mt-1">vs last 7 days</p>
                  <p className="text-sm font-semibold text-[#22C55E]">+5.1%</p>
                </div>
                <div className="bg-[#F9FAFB] rounded-xl p-4 text-center">
                  <div className="w-8 h-8 bg-[#FEF3C7] rounded-lg flex items-center justify-center mx-auto mb-2">
                    <FiGlobe className="w-4 h-4 text-[#F59E0B]" />
                  </div>
                  <p className="text-xs text-[#6B7280] mb-1">Social Media</p>
                  <p className="text-xl sm:text-2xl font-bold text-[#111827]">15.7%</p>
                  <p className="text-xs text-[#9CA3AF] mt-1">vs last 7 days</p>
                  <p className="text-sm font-semibold text-[#22C55E]">+2.3%</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;