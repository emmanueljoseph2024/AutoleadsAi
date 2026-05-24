import { Link } from 'react-router-dom';
import {
  FiUsers,
  FiZap,
  FiMail,
  FiEye,
  FiTrendingUp,
  FiTrendingDown,
  FiExternalLink,
} from 'react-icons/fi';
import { SkeletonStatCard } from '../common/Skeleton';

interface StatItem {
  label: string;
  value: string | number;
  link: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
  trendValue?: string;
  subtitle?: string;
}

interface StatsGridProps {
  stats: StatItem[];
  loading?: boolean;
}

const StatsGrid = ({ stats, loading = false }: StatsGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonStatCard key={i} />
        ))}
      </div>
    );
  }

  if (stats.length === 0) return null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {stats.map((stat) => (
        <Link
          key={stat.label}
          to={stat.link}
          className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs sm:text-sm text-[#6B7280] font-medium">{stat.label}</span>
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#EFF6FF] rounded-xl flex items-center justify-center">
              {stat.icon}
            </div>
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#111827]">{stat.value}</div>
          <div className="flex items-center gap-1.5 mt-1.5">
            {stat.trend && (
              <>
                {stat.trend === 'up' ? (
                  <FiTrendingUp className="w-3.5 h-3.5 text-[#22C55E]" />
                ) : (
                  <FiTrendingDown className="w-3.5 h-3.5 text-[#EF4444]" />
                )}
              </>
            )}
            {stat.trendValue && (
              <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                {stat.trendValue}
              </span>
            )}
            {stat.subtitle && <span className="text-xs text-[#9CA3AF]">{stat.subtitle}</span>}
            <FiExternalLink className="w-3 h-3 text-[#9CA3AF] opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default StatsGrid;
