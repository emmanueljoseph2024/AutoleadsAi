// src/components/leads/LeadScoreBreakdown.tsx

interface LeadScoreBreakdownProps {
  intentScore: number;
  relevanceScore: number;
  intentKeywords?: string[];
  intentSummary?: string;
  relevanceFactors?: {
    industryMatch: boolean;
    roleMatch: boolean;
    geoMatch: boolean;
  };
}

const LeadScoreBreakdown = ({
  intentScore = 0,
  relevanceScore = 0,
  intentKeywords = [],
  intentSummary = '',
  relevanceFactors = { industryMatch: false, roleMatch: false, geoMatch: false },
}: LeadScoreBreakdownProps) => {
  const combinedScore = Math.round((intentScore + relevanceScore) / 2);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-[#22C55E]';
    if (score >= 50) return 'bg-[#F59E0B]';
    return 'bg-[#EF4444]';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'High';
    if (score >= 50) return 'Medium';
    return 'Low';
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5 space-y-4">
      {/* Combined Score */}
      <div className="text-center pb-4 border-b border-[#E5E7EB]">
        <p className="text-xs text-[#9CA3AF] mb-1">Combined Score</p>
        <div className="text-3xl font-bold text-[#111827]">{combinedScore}</div>
        <span className={`text-xs font-medium ${combinedScore >= 80 ? 'text-[#22C55E]' : combinedScore >= 50 ? 'text-[#F59E0B]' : 'text-[#EF4444]'}`}>
          {getScoreLabel(combinedScore)}
        </span>
      </div>

      {/* Intent Score */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#374151]">Intent Score</span>
          <span className="text-sm font-bold text-[#111827]">{intentScore}/100</span>
        </div>
        <div className="w-full bg-[#F3F4F6] rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getScoreColor(intentScore)}`}
            style={{ width: `${intentScore}%` }}
          />
        </div>
        {intentSummary && (
          <p className="text-xs text-[#6B7280] mt-1.5">{intentSummary}</p>
        )}
        {intentKeywords.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {intentKeywords.map((kw) => (
              <span
                key={kw}
                className="px-2 py-0.5 bg-[#EFF6FF] text-[#2563EB] rounded-full text-[10px] font-medium"
              >
                {kw}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Relevance Score */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#374151]">Relevance Score</span>
          <span className="text-sm font-bold text-[#111827]">{relevanceScore}/100</span>
        </div>
        <div className="w-full bg-[#F3F4F6] rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getScoreColor(relevanceScore)}`}
            style={{ width: `${relevanceScore}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 mt-2">
          <div className={`text-center p-2 rounded-lg text-xs ${relevanceFactors.industryMatch ? 'bg-[#DCFCE7] text-[#22C55E]' : 'bg-[#F3F4F6] text-[#9CA3AF]'}`}>
            Industry
          </div>
          <div className={`text-center p-2 rounded-lg text-xs ${relevanceFactors.roleMatch ? 'bg-[#DCFCE7] text-[#22C55E]' : 'bg-[#F3F4F6] text-[#9CA3AF]'}`}>
            Role
          </div>
          <div className={`text-center p-2 rounded-lg text-xs ${relevanceFactors.geoMatch ? 'bg-[#DCFCE7] text-[#22C55E]' : 'bg-[#F3F4F6] text-[#9CA3AF]'}`}>
            Location
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadScoreBreakdown;