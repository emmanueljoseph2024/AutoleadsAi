import { Link } from 'react-router-dom';
import { FiActivity, FiTarget, FiMail, FiCheckCircle, FiClock } from 'react-icons/fi';
import { sanitizeString } from '../../utils/sanitizers';

interface ActivityItem {
  type: 'scan' | 'email' | 'lead_update';
  message: string;
  timestamp: string;
  link: string;
}

interface LeadActivityFeedProps {
  activities: ActivityItem[];
  loading?: boolean;
}

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

const getTimeAgo = (timestamp: string): string => {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

const LeadActivityFeed = ({ activities, loading = false }: LeadActivityFeedProps) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-bold text-[#111827]">Recent Activity</h3>
        <FiActivity className="w-4 h-4 text-[#6B7280]" />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#F3F4F6] animate-shimmer relative overflow-hidden shrink-0">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
              </div>
              <div className="grow space-y-1.5">
                <div className="h-3 bg-[#F3F4F6] rounded animate-shimmer relative overflow-hidden w-3/4">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
                </div>
                <div className="h-2 bg-[#F3F4F6] rounded animate-shimmer relative overflow-hidden w-1/4">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : activities.length > 0 ? (
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <Link
              key={index}
              to={activity.link}
              className="flex items-start gap-3 group hover:bg-[#F9FAFB] rounded-xl p-2 -mx-2 transition-colors"
            >
              <div className="w-8 h-8 bg-[#F3F4F6] rounded-xl flex items-center justify-center shrink-0">
                {getActivityIcon(activity.type)}
              </div>
              <div className="grow min-w-0">
                <p className="text-xs sm:text-sm text-[#374151] truncate">
                  {sanitizeString(activity.message)}
                </p>
                <p className="text-[10px] sm:text-xs text-[#9CA3AF] mt-0.5">
                  {getTimeAgo(activity.timestamp)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <FiClock className="w-8 h-8 text-[#D1D5DB] mx-auto mb-2" />
          <p className="text-sm text-[#9CA3AF]">No recent activity</p>
        </div>
      )}
    </div>
  );
};

export default LeadActivityFeed;