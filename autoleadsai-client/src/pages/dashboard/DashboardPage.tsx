// src/pages/dashboard/DashboardPage.tsx

import { useState, useEffect, useCallback } from 'react';
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
  FiMail,
  FiCheckCircle,
  FiGlobe,
  FiTarget,
  FiAlertCircle,
  FiRefreshCw,
} from 'react-icons/fi';
import { FaLinkedinIn, FaRedditAlien } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import { useAuth } from '../../contexts/AuthContext';
import AutoleadsAiLogo from '../../assets/AutoleadsAiLogo.svg';
import StatCard from '../../components/common/StatCard';
import SearchBar from '../../components/common/SearchBar';
import Avatar from '../../components/common/Avatar';
import { SkeletonStatCard, SkeletonChart } from '../../components/common/Skeleton';
import { sanitizeString } from '../../utils/sanitizers';
import { API_ENDPOINTS } from '../../utils/constants';
import { formatDate } from '../../utils/formatDate';
import api from '../../services/api';

// ─── Types ────────────────────────────────────────────

interface DashboardStats {
  leads: {
    total: { count: number; link: string };
    hot: { count: number; link: string };
    warm: { count: number; link: string };
    cold: { count: number; link: string };
    converted: { count: number; link: string };
    conversionRate: string;
    newThisWeek: { count: number; link: string };
    newThisMonth: { count: number; link: string };
  };
  emails: {
    sent: { count: number; link: string };
    opened: { count: number; link: string };
    replied: { count: number; link: string };
    openRate: string;
    replyRate: string;
  };
  scans: {
    total: { count: number; link: string };
    thisMonth: { count: number; link: string };
  };
  samples?: {
    hotLeads: LeadSample[];
    newThisWeek: LeadSample[];
    converted: LeadSample[];
  };
}

interface LeadSample {
  _id: string;
  name: string;
  email: string;
  company: string;
  source: string;
  sourceUrl: string;
  qualification: string;
  status: string;
  intent?: { score: number };
  createdAt: string;
}

interface PipelineData {
  statusBreakdown: { status: string; count: number; link: string }[];
  qualificationBreakdown: { qualification: string; count: number; link: string }[];
  sourceBreakdown: { source: string; count: number; link: string }[];
}

interface ActivityItem {
  type: 'scan' | 'email' | 'lead_update';
  message: string;
  timestamp: string;
  link: string;
}

interface NicheSummary {
  _id: string;
  name: string;
  keywords: string[];
  location: string;
  sources: string[];
  stats: {
    totalLeads: number;
    hotLeads: number;
    totalScans: number;
  };
  lastScanAt: string | null;
  createdAt: string;
}

const DashboardPage = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data states
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [pipeline, setPipeline] = useState<PipelineData | null>(null);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [niches, setNiches] = useState<NicheSummary[]>([]);
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null);

  // UI states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // ─── Fetch Dashboard Data ──────────────────────────

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const nicheParam = selectedNiche ? `?nicheId=${selectedNiche}` : '';

      const [statsRes, pipelineRes, activityRes, nichesRes] = await Promise.all([
        api.get(`${API_ENDPOINTS.DASHBOARD.STATS}${nicheParam}&expand=true`),
        api.get(`${API_ENDPOINTS.DASHBOARD.PIPELINE}${nicheParam}`),
        api.get(`${API_ENDPOINTS.DASHBOARD.ACTIVITY}?limit=8`),
        api.get(API_ENDPOINTS.DASHBOARD.NICHES),
      ]);

      setStats(statsRes.data);
      setPipeline(pipelineRes.data);
      setActivities(activityRes.data.activities || []);
      setNiches(nichesRes.data.niches || []);
    } catch (err: any) {
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedNiche]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'scan':
        return <FiTarget className="w-4 h-4 text-[#2563EB]" />;
      case 'email':
        return <FiMail className="w-4 h-4 text-[#06B6D4]" />;
      case 'lead_update':
        return <FiCheckCircle className="w-4 h-4 text-[#22C55E]" />;
      default:
        return <FiActivity className="w-4 h-4 text-[#6B7280]" />;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  // ─── Main Render ────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen w-60 bg-white border-r border-[#E5E7EB] flex flex-col
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-[#E5E7EB]">
          <div className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-[#4F46E5] rounded-lg flex items-center justify-center flex-shrink-0">
            <img src={AutoleadsAiLogo} alt="Logo" className="w-5 h-5" />
          </div>
          <h1 className="text-sm font-bold text-[#111827] leading-tight">AUTOLEDS AI</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto text-[#9CA3AF] hover:text-[#111827]">
            <FiX className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                item.active
                  ? 'bg-[#EFF6FF] text-[#2563EB]'
                  : 'text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]'
              }`}
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
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[#6B7280] hover:text-[#111827] transition-colors">
                <FiMenu className="w-5 h-5" />
              </button>
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search leads, companies, emails..."
                className="hidden sm:block max-w-md"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-[#6B7280] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-xl transition-colors">
                <FiBell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full ring-2 ring-white" />
              </button>
              <Avatar name={`${user?.firstName} ${user?.lastName}`} size="md" />
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Error State */}
          {error && (
            <div className="p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-3 text-[#EF4444] text-sm animate-scale-in">
              <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
              <button onClick={fetchDashboardData} className="ml-auto flex items-center gap-1.5 text-[#2563EB] hover:underline font-medium">
                <FiRefreshCw className="w-4 h-4" /> Retry
              </button>
            </div>
          )}

          {/* Niche Selector */}
          {niches.length > 0 && (
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-[#6B7280] font-medium">Showing data for:</span>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedNiche(null)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    !selectedNiche ? 'bg-[#2563EB] text-white shadow-md' : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#2563EB]/30'
                  }`}
                >
                  All Niches
                </button>
                {niches.map((niche) => (
                  <button
                    key={niche._id}
                    onClick={() => setSelectedNiche(niche._id)}
                    className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                      selectedNiche === niche._id ? 'bg-[#2563EB] text-white shadow-md' : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#2563EB]/30'
                    }`}
                  >
                    {sanitizeString(niche.name)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* KPI Cards — Shimmer when loading */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {[1, 2, 3].map((i) => <SkeletonStatCard key={i} />)}
            </div>
          ) : stats ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              <StatCard
                label="Qualified Leads"
                value={stats.leads.total.count.toLocaleString()}
                icon={<FiUsers className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB]" />}
                link={stats.leads.total.link}
                trend="up"
                trendValue={`${stats.leads.conversionRate}%`}
                subtitle="vs last 7 days"
              />
              <StatCard
                label="Hot Leads"
                value={stats.leads.hot.count.toLocaleString()}
                icon={<FiTarget className="w-4 h-4 sm:w-5 sm:h-5 text-[#EF4444]" />}
                link={stats.leads.hot.link}
                trend="up"
                subtitle="vs last 7 days"
              />
              <StatCard
                label="Open Rate"
                value={`${stats.emails.openRate}%`}
                icon={<FiMail className="w-4 h-4 sm:w-5 sm:h-5 text-[#06B6D4]" />}
                link={stats.emails.opened.link}
                subtitle={`${stats.emails.sent.count} emails sent`}
              />
            </div>
          ) : null}

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Pipeline Chart — Shimmer when loading */}
            {loading ? (
              <div className="lg:col-span-2"><SkeletonChart /></div>
            ) : pipeline ? (
              <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-[#111827] mb-4">Lead Pipeline</h3>
                <div className="space-y-3">
                  {pipeline.statusBreakdown.map((item, i) => {
                    const maxCount = Math.max(...pipeline.statusBreakdown.map((s) => s.count), 1);
                    const width = (item.count / maxCount) * 100;
                    const colors = ['bg-[#9CA3AF]', 'bg-[#06B6D4]', 'bg-[#2563EB]', 'bg-[#4F46E5]', 'bg-[#22C55E]'];
                    return (
                      <Link key={item.status} to={item.link} className="flex items-center gap-3 group">
                        <span className="text-xs sm:text-sm text-[#374151] w-20 sm:w-24 flex-shrink-0 capitalize">
                          {item.status.replace(/_/g, ' ')}
                        </span>
                        <div className="flex-1 bg-[#F3F4F6] rounded-full h-5 sm:h-6 overflow-hidden">
                          <div
                            className={`h-full ${colors[i]} rounded-full transition-all duration-500 group-hover:opacity-80 flex items-center justify-end pr-2`}
                            style={{ width: `${width}%` }}
                          >
                            <span className="text-[10px] sm:text-xs text-white font-medium">{item.count}</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {/* Activity Feed */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-bold text-[#111827]">Recent Activity</h3>
                <FiActivity className="w-4 h-4 text-[#6B7280]" />
              </div>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#F3F4F6] animate-shimmer relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <div className="h-3 bg-[#F3F4F6] rounded animate-shimmer relative overflow-hidden w-3/4">
                          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                        </div>
                        <div className="h-2 bg-[#F3F4F6] rounded animate-shimmer relative overflow-hidden w-1/4">
                          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : activities.length > 0 ? (
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <Link key={index} to={activity.link} className="flex items-start gap-3 group hover:bg-[#F9FAFB] rounded-xl p-2 -mx-2 transition-colors">
                      <div className="w-8 h-8 bg-[#F3F4F6] rounded-xl flex items-center justify-center flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-[#374151] truncate">{sanitizeString(activity.message)}</p>
                        <p className="text-[10px] sm:text-xs text-[#9CA3AF] mt-0.5">{getTimeAgo(activity.timestamp)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#9CA3AF] text-center py-8">No recent activity</p>
              )}
            </div>
          </div>

          {/* Bottom Row — Hot Leads Preview */}
          {!loading && stats?.samples?.hotLeads && stats.samples.hotLeads.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-bold text-[#111827]">🔥 Hot Leads This Week</h3>
                <Link to="/leads?qualification=hot" className="text-xs sm:text-sm text-[#2563EB] hover:underline font-medium">
                  View All Hot Leads
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-[#9CA3AF] border-b border-[#E5E7EB]">
                      <th className="pb-3 font-medium">Name</th>
                      <th className="pb-3 font-medium hidden sm:table-cell">Company</th>
                      <th className="pb-3 font-medium hidden md:table-cell">Source</th>
                      <th className="pb-3 font-medium">Score</th>
                      <th className="pb-3 font-medium hidden lg:table-cell">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.samples.hotLeads.slice(0, 5).map((lead) => (
                      <tr key={lead._id} className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors">
                        <td className="py-3">
                          <Link to={`/leads/${lead._id}`} className="text-sm font-medium text-[#111827] hover:text-[#2563EB]">
                            {sanitizeString(lead.name || 'Unknown')}
                          </Link>
                        </td>
                        <td className="py-3 text-sm text-[#6B7280] hidden sm:table-cell">{sanitizeString(lead.company || '-')}</td>
                        <td className="py-3 hidden md:table-cell">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#EFF6FF] text-[#2563EB] rounded-lg text-xs font-medium">
                            {sanitizeString(lead.source)}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-12 sm:w-16 bg-[#F3F4F6] rounded-full h-1.5">
                              <div className="h-full bg-[#22C55E] rounded-full" style={{ width: `${lead.intent?.score || 0}%` }} />
                            </div>
                            <span className="text-xs text-[#6B7280]">{lead.intent?.score || 0}</span>
                          </div>
                        </td>
                        <td className="py-3 hidden lg:table-cell">
                          <span className="px-2 py-0.5 bg-[#DCFCE7] text-[#22C55E] rounded-lg text-xs font-medium capitalize">
                            {lead.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;