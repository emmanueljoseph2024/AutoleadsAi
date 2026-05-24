// src/components/niches/NicheList.tsx

import { FiTarget } from 'react-icons/fi';
import EmptyState from '../common/EmptyState';
import NicheCard from './NicheCard';
import Skeleton  from '../common/Skeleton';

interface Niche {
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

interface NicheListProps {
  niches: Niche[];
  loading?: boolean;
  onViewDashboard?: (niche: Niche) => void;
  onEdit?: (niche: Niche) => void;
  onDelete?: (niche: Niche) => void;
}

const NicheList = ({
  niches,
  loading = false,
  onViewDashboard,
  onEdit,
  onDelete,
}: NicheListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#E5E7EB] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-5 rounded" />
            </div>
            <Skeleton className="h-4 w-20" />
            <div className="flex gap-1">
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
            <div className="flex items-center gap-4 pt-2 border-t border-[#E5E7EB]">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (niches.length === 0) {
    return (
      <EmptyState
        icon={<FiTarget className="w-8 h-8" />}
        title="No niches yet"
        description="Create your first niche to start organizing your lead searches."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {niches.map((niche) => (
        <NicheCard
          key={niche._id}
          niche={niche}
          onViewDashboard={onViewDashboard}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default NicheList;