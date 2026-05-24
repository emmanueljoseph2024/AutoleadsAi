// src/components/email/EmailLogTable.tsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiMail,
  FiEye,
  FiMessageSquare,
  FiAlertCircle,
  FiExternalLink,
} from 'react-icons/fi';
import Badge from '../common/Badge';
import Pagination from '../common/Pagination';
import SearchBar from '../common/SearchBar';
import Dropdown from '../common/Dropdown';
import EmptyState from '../common/EmptyState';
import { SkeletonTable } from '../common/Skeleton';
import { sanitizeString } from '../../utils/sanitizers';
import { formatDate } from '../../utils/formatDate';
import { API_ENDPOINTS } from '../../utils/constants';
import api from '../../services/api';

interface EmailLog {
  _id: string;
  leadId?: {
    _id: string;
    name: string;
    email: string;
  };
  to: string;
  from: string;
  subject: string;
  type: string;
  status: 'sent' | 'delivered' | 'opened' | 'clicked' | 'replied' | 'bounced';
  sentAt: string;
  openedAt?: string;
  repliedAt?: string;
}

interface EmailLogTableProps {
  nicheId?: string | null;
}

const statusVariants: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = {
  delivered: 'success',
  opened: 'info',
  clicked: 'info',
  replied: 'success',
  bounced: 'danger',
  sent: 'neutral',
};

const statusLabels: Record<string, string> = {
  sent: 'Sent',
  delivered: 'Delivered',
  opened: 'Opened',
  clicked: 'Clicked',
  replied: 'Replied',
  bounced: 'Bounced',
};

const typeLabels: Record<string, string> = {
  initial: 'Initial',
  follow_up_1: 'Follow-up 1',
  follow_up_2: 'Follow-up 2',
  follow_up_3: 'Follow-up 3',
  follow_up_4: 'Follow-up 4',
  follow_up_5: 'Follow-up 5',
  manual: 'Manual',
};

const EmailLogTable = ({ nicheId = null }: EmailLogTableProps) => {
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchLogs = async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', '25');
      if (search) params.append('search', sanitizeString(search));
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (nicheId) params.append('nicheId', nicheId);

      const { data } = await api.get(`${API_ENDPOINTS.DASHBOARD.EMAIL_PERFORMANCE}?${params.toString()}`);
      setLogs(data.logs || []);
      setTotalPages(data.pages || 1);
      setTotal(data.total || 0);
    } catch (err: any) {
      setError('Failed to load email logs.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and when filters change
  useState(() => {
    fetchLogs();
  });

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'sent', label: 'Sent' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'opened', label: 'Opened' },
    { value: 'clicked', label: 'Clicked' },
    { value: 'replied', label: 'Replied' },
    { value: 'bounced', label: 'Bounced' },
  ];

  if (error) {
    return (
      <div className="p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-3 text-[#EF4444] text-sm animate-scale-in">
        <FiAlertCircle className="w-5 h-5 shrink-0" />
        <span>{error}</span>
        <button onClick={fetchLogs} className="ml-auto text-[#2563EB] hover:underline font-medium shrink-0">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by email or subject..."
          className="grow"
        />
        <Dropdown
          label=""
          options={statusOptions}
          value={statusFilter}
          onChange={setStatusFilter}
          className="w-full sm:w-40 shrink-0"
        />
      </div>

      {/* Loading */}
      {loading && <SkeletonTable rows={8} />}

      {/* Empty */}
      {!loading && logs.length === 0 && (
        <EmptyState
          icon={<FiMail className="w-8 h-8" />}
          title="No email logs yet"
          description="Email logs will appear here when outreach emails are sent."
        />
      )}

      {/* Table */}
      {!loading && logs.length > 0 && (
        <>
          <div className="overflow-x-auto bg-white rounded-2xl border border-[#E5E7EB]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E5E7EB]">
                  <th className="text-left p-4 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">Lead</th>
                  <th className="text-left p-4 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider hidden sm:table-cell">Subject</th>
                  <th className="text-left p-4 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">Type</th>
                  <th className="text-left p-4 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">Status</th>
                  <th className="text-left p-4 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider hidden md:table-cell">Sent</th>
                  <th className="text-left p-4 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider hidden lg:table-cell">Opened</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {logs.map((log) => (
                  <tr key={log._id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="p-4">
                      {log.leadId ? (
                        <Link
                          to={`/leads/${log.leadId._id}`}
                          className="text-sm font-medium text-[#111827] hover:text-[#2563EB] transition-colors inline-flex items-center gap-1"
                        >
                          {sanitizeString(log.leadId.name || log.to)}
                          <FiExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                        </Link>
                      ) : (
                        <span className="text-sm text-[#374151]">{sanitizeString(log.to)}</span>
                      )}
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <span className="text-sm text-[#6B7280] truncate block max-w-[200px]">
                        {sanitizeString(log.subject || '-')}
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge variant="neutral" size="sm">
                        {typeLabels[log.type] || log.type}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={statusVariants[log.status] || 'neutral'} size="sm">
                        {statusLabels[log.status] || log.status}
                      </Badge>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-sm text-[#6B7280]">
                        {formatDate(log.sentAt, 'relative')}
                      </span>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <span className="text-sm text-[#6B7280]">
                        {log.openedAt ? formatDate(log.openedAt, 'relative') : '-'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              limit={25}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default EmailLogTable;