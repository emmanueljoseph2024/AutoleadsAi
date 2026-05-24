interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className = '' }: SkeletonProps) => {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-[#F3F4F6] ${className}`}
    >
      {/* The traveling shimmer wave */}
      <div
        className="absolute inset-0 -translate-x-full animate-shimmer"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 25%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 75%, transparent 100%)',
        }}
      />
    </div>
  );
};

// ─── Pre-built skeleton layouts ──────────────────────

export const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-8 rounded-lg" />
    </div>
    <Skeleton className="h-8 w-32" />
    <Skeleton className="h-3 w-20" />
  </div>
);

export const SkeletonTable = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-3">
    {/* Header */}
    <div className="flex gap-4 pb-3 border-b border-[#E5E7EB]">
      <Skeleton className="h-4 w-8" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-16" />
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4 py-3">
        <Skeleton className="h-4 w-8" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    ))}
  </div>
);

export const SkeletonList = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div
        key={i}
        className="flex items-start gap-3 bg-white rounded-xl border border-[#E5E7EB] p-4"
      >
        {/* Avatar circle */}
        <Skeleton className="w-9 h-9 rounded-lg flex-shrink-0" />
        {/* Content lines */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-3 w-full" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonConversationRow = () => (
  <div className="flex items-start gap-3 bg-white rounded-xl border border-[#E5E7EB] p-4">
    {/* Platform icon */}
    <Skeleton className="w-9 h-9 rounded-lg flex-shrink-0" />
    {/* Content */}
    <div className="flex-1 space-y-2 min-w-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-2 w-2 rounded-full" />
        </div>
        <Skeleton className="h-3 w-14" />
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-3/4" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
    </div>
  </div>
);

export const SkeletonStatCard = () => (
  <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 space-y-3">
    <div className="flex items-center justify-between">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-9 w-9 rounded-xl" />
    </div>
    <Skeleton className="h-8 w-24" />
    <Skeleton className="h-3 w-16" />
  </div>
);

export const SkeletonChart = () => (
  <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 space-y-4">
    <Skeleton className="h-5 w-36" />
    <div className="flex items-end gap-3 h-40">
      <Skeleton className="flex-1 h-24" />
      <Skeleton className="flex-1 h-32" />
      <Skeleton className="flex-1 h-16" />
      <Skeleton className="flex-1 h-36" />
      <Skeleton className="flex-1 h-20" />
      <Skeleton className="flex-1 h-28" />
    </div>
  </div>
);

export default Skeleton;