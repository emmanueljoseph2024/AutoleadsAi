import { Link } from 'react-router-dom';
import { FiMapPin, FiTarget, FiZap } from 'react-icons/fi';
import { sanitizeString } from '../../utils/sanitizers';

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

interface NicheSidebarProps {
  niches: NicheSummary[];
  selectedNicheId: string | null;
  onSelectNiche: (nicheId: string | null) => void;
  loading?: boolean;
}

const NicheSidebar = ({ niches, selectedNicheId, onSelectNiche, loading = false }: NicheSidebarProps) => {
  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-20 bg-[#F3F4F6] rounded-xl animate-shimmer relative overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
          </div>
        ))}
      </div>
    );
  }

  if (niches.length === 0) return null;

  return (
    <div className="space-y-2">
      <button
        onClick={() => onSelectNiche(null)}
        className={`w-full text-left px-4 py-3 rounded-xl transition-all text-sm font-medium ${
          !selectedNicheId
            ? 'bg-[#2563EB] text-white shadow-md'
            : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#2563EB]/30'
        }`}
      >
        All Niches
      </button>
      {niches.map((niche) => (
        <button
          key={niche._id}
          onClick={() => onSelectNiche(niche._id)}
          className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
            selectedNicheId === niche._id
              ? 'bg-[#2563EB] text-white shadow-md'
              : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#2563EB]/30'
          }`}
        >
          <div className="text-sm font-semibold truncate">
            {selectedNicheId === niche._id ? (
              sanitizeString(niche.name)
            ) : (
              <span className="text-[#111827]">{sanitizeString(niche.name)}</span>
            )}
          </div>
          {niche.location && (
            <div className="flex items-center gap-1 mt-1 text-xs opacity-70">
              <FiMapPin className="w-3 h-3" />
              {sanitizeString(niche.location)}
            </div>
          )}
          <div className="flex items-center gap-3 mt-2 text-xs">
            <span className="flex items-center gap-1">
              <FiTarget className="w-3 h-3" />
              {niche.stats.totalLeads}
            </span>
            <span className="flex items-center gap-1">
              <FiZap className="w-3 h-3" />
              {niche.stats.hotLeads}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default NicheSidebar;
