// src/components/scans/ScanHistoryTable.tsx

import { Link } from 'react-router-dom';
import { FiExternalLink, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import Badge from '../common/Badge';
import Pagination from '../common/Pagination';
import EmptyState from '../common/EmptyState';
import { SkeletonTable } from '../common/Skeleton';
import { formatDate } from '../../utils/formatDate';

interface Scan {
  _id: string;
  sources: string[];
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  totalFound: number;
  newLeads: number;
  startedAt?: string;
  completedAt?: string;
  errorLog?: string[];
  createdAt: string;
}

interface ScanHistoryTableProps {
  scans: Scan[];
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const statusBadges: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = {
  completed: 'success',
  running: 'info',
  pending: 'neutral',
  failed: 'danger',
  cancelled: 'neutral',
};

const ScanHistoryTable = ({
  scans,
  loading = false,
  error = '',
  onRetry,
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}: ScanHistoryTableProps) => {
  if (error) {
    return (
      <div className="p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-3 text-[#EF4444] text-sm animate-scale-in">
        <FiAlertCircle className="w-5 h-5 shrink-0" />
        <span>{error}</span>
        {onRetry && (
          <button onClick={onRetry} className="ml-auto flex items-center gap-1.5 text-[#2563EB] hover:underline font-medium shrink-0">
            <FiRefreshCw className="w-4 h-4" /> Retry
          </button>
        )}
      </div>
    );
  }

  if (loading) {
    return <SkeletonTable rows={8} />;
  }

  if (scans.length === 0) {
    return (
      <EmptyState
        title="No scans yet"
        description="Run your first scan to start discovering leads."
      />
    );
  }

  return (
    <div>
      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                <th className="text-left p-4 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">Date</th>
                <th className="text-left p-4 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">Sources</th>
                <th className="text-left p-4 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider hidden sm:table-cell">Status</th>
                <th className="text-left p-4 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">Found</th>
                <th className="text-left p-4 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">New</th>
                <th className="text-left p-4 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider hidden lg:table-cell">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6]">
              {scans.map((scan) => {
                const duration = scan.startedAt && scan.completedAt
                  ? Math.round((new Date(scan.completedAt).getTime() - new Date(scan.startedAt).getTime()) / 1000)
                  : null;

                return (
                  <tr key={scan._id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="p-4">
                      <Link
                        to={`/scans/${scan._id}`}
                        className="text-sm font-medium text-[#111827] hover:text-[#2563EB] transition-colors inline-flex items-center gap-1"
                      >
                        {formatDate(scan.createdAt, 'short')}
                        <FiExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                      </Link>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        {scan.sources.slice(0, 3).map((source) => (
                          <span
                            key={source}
                            className="px-2 py-0.5 bg-[#F3F4F6] text-[#6B7280] rounded text-[10px] font-medium capitalize"
                          >
                            {source.replace(/_/g, ' ')}
                          </span>
                        ))}
                        {scan.sources.length > 3 && (
                          <span className="text-[10px] text-[#9CA3AF]">+{scan.sources.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <Badge variant={statusBadges[scan.status] || 'neutral'} size="sm">
                        {scan.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium text-[#111827]">
                        {scan.totalFound.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium text-[#22C55E]">
                        {scan.newLeads > 0 ? '+' : ''}{scan.newLeads.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <span className="text-sm text-[#6B7280]">
                        {duration ? `${duration}s` : '-'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="border-t border-[#E5E7EB] px-4 py-3">
            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              limit={limit}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanHistoryTable;