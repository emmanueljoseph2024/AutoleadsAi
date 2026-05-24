import { sanitizeString } from '../../utils/sanitizers';

interface NicheSummary {
  _id: string;
  name: string;
  stats: {
    totalLeads: number;
    hotLeads: number;
  };
}

interface NicheSelectorProps {
  niches: NicheSummary[];
  selectedNicheId: string | null;
  onSelect: (nicheId: string | null) => void;
  loading?: boolean;
}

const NicheSelector = ({ niches, selectedNicheId, onSelect, loading = false }: NicheSelectorProps) => {
  if (loading) {
    return (
      <div className="flex items-center gap-3 flex-wrap">
        <div className="h-4 w-28 bg-[#F3F4F6] rounded animate-shimmer relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-8 w-24 bg-[#F3F4F6] rounded-lg animate-shimmer relative overflow-hidden"
            >
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (niches.length === 0) return null;

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm text-[#6B7280] font-medium">Showing data for:</span>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onSelect(null)}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
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
            onClick={() => onSelect(niche._id)}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              selectedNicheId === niche._id
                ? 'bg-[#2563EB] text-white shadow-md'
                : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#2563EB]/30'
            }`}
          >
            {sanitizeString(niche.name)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NicheSelector;
