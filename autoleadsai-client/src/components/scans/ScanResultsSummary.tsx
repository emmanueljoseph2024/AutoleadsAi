// src/components/scans/ScanResultsSummary.tsx

import { FiUsers, FiUserPlus, FiCheckCircle } from 'react-icons/fi';
import { SkeletonStatCard } from '../common/Skeleton';

interface ScanResultsSummaryProps {
  totalFound: number;
  newLeads: number;
  existingLeads: number;
  loading?: boolean;
}

const ScanResultsSummary = ({
  totalFound,
  newLeads,
  existingLeads,
  loading = false,
}: ScanResultsSummaryProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => <SkeletonStatCard key={i} />)}
      </div>
    );
  }

  const cards = [
    {
      label: 'Total Found',
      value: totalFound.toLocaleString(),
      icon: <FiUsers className="w-5 h-5" />,
      color: 'text-[#2563EB]',
      bg: 'bg-[#EFF6FF]',
    },
    {
      label: 'New Leads',
      value: `+${newLeads.toLocaleString()}`,
      icon: <FiUserPlus className="w-5 h-5" />,
      color: 'text-[#22C55E]',
      bg: 'bg-[#DCFCE7]',
    },
    {
      label: 'Already Existed',
      value: existingLeads.toLocaleString(),
      icon: <FiCheckCircle className="w-5 h-5" />,
      color: 'text-[#6B7280]',
      bg: 'bg-[#F3F4F6]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5 text-center"
        >
          <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
            <span className={card.color}>{card.icon}</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#111827]">{card.value}</div>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-1">{card.label}</p>
        </div>
      ))}
    </div>
  );
};

export default ScanResultsSummary;