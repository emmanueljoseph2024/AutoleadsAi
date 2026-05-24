import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  link?: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  subtitle?: string;
  className?: string;
}

const StatCard = ({
  label,
  value,
  icon,
  link,
  trend,
  trendValue,
  subtitle,
  className = '',
}: StatCardProps) => {
  const content = (
    <div
      className={`
        bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5
        hover:shadow-md hover:-translate-y-0.5 transition-all duration-200
        ${link ? 'cursor-pointer group' : ''}
        ${className}
      `}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs sm:text-sm text-[#6B7280] font-medium">{label}</span>
        {icon && (
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#EFF6FF] rounded-xl flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#111827]">{value}</div>
      <div className="flex items-center gap-1.5 mt-1.5">
        {trend && (
          <>
            {trend === 'up' ? (
              <FiTrendingUp className="w-3.5 h-3.5 text-[#22C55E]" />
            ) : (
              <FiTrendingDown className="w-3.5 h-3.5 text-[#EF4444]" />
            )}
            {trendValue && (
              <span className={`text-xs font-medium ${trend === 'up' ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                {trendValue}
              </span>
            )}
          </>
        )}
        {subtitle && <span className="text-xs text-[#9CA3AF]">{subtitle}</span>}
        {link && (
          <FiExternalLink className="w-3 h-3 text-[#9CA3AF] opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
        )}
      </div>
    </div>
  );

  if (link) return <Link to={link}>{content}</Link>;
  return content;
};

export default StatCard;