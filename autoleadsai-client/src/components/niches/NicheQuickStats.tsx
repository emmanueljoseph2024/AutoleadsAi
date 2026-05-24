// src/components/niches/NicheQuickStats.tsx

import { FiTarget, FiZap, FiBarChart2, FiClock } from 'react-icons/fi';
import { formatDate } from '../../utils/formatDate';

interface NicheQuickStatsProps {
  totalLeads: number;
  hotLeads: number;
  totalScans: number;
  lastScanAt: string | null;
  loading?: boolean;
}

const NicheQuickStats = ({
  totalLeads,
  hotLeads,
  totalScans,
  lastScanAt,
  loading = false,
}: NicheQuickStatsProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-[#F3F4F6] rounded-xl p-3 h-16 animate-shimmer relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
          </div>
        ))}
      </div>
    );
  }

  const stats = [
    {
      label: 'Total Leads',
      value: totalLeads.toLocaleString(),
      icon: <FiTarget className="w-4 h-4" />,
      color: 'text-[#2563EB]',
      bg: 'bg-[#EFF6FF]',
    },
    {
      label: 'Hot Leads',
      value: hotLeads.toLocaleString(),
      icon: <FiZap className="w-4 h-4" />,
      color: 'text-[#F59E0B]',
      bg: 'bg-[#FEF3C7]',
    },
    {
      label: 'Total Scans',
      value: totalScans.toLocaleString(),
      icon: <FiBarChart2 className="w-4 h-4" />,
      color: 'text-[#22C55E]',
      bg: 'bg-[#DCFCE7]',
    },
    {
      label: 'Last Scan',
      value: lastScanAt ? formatDate(lastScanAt, 'relative') : 'Never',
      icon: <FiClock className="w-4 h-4" />,
      color: 'text-[#6B7280]',
      bg: 'bg-[#F3F4F6]',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-xl border border-[#E5E7EB] p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <div className={`w-7 h-7 ${stat.bg} rounded-lg flex items-center justify-center`}>
              <span className={stat.color}>{stat.icon}</span>
            </div>
          </div>
          <div className="text-lg font-bold text-[#111827]">{stat.value}</div>
          <p className="text-[10px] sm:text-xs text-[#9CA3AF]">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default NicheQuickStats;