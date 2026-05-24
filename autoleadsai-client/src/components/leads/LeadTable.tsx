// src/components/leads/LeadTable.tsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiMoreHorizontal, FiAlertCircle } from 'react-icons/fi';
import Badge from '../common/Badge';
import Pagination from '../common/Pagination';
import SourceBadge from '../common/SourceBadge';
import EmptyState from '../common/EmptyState';
import { SkeletonTable } from '../common/Skeleton';
import { sanitizeString } from '../../utils/sanitizers';
import { formatDate } from '../../utils/formatDate';

interface Lead {
  _id: string;
  name: string;
  email: string;
  company: string;
  source: string;
  sourceUrl: string;
  qualification: 'hot' | 'warm' | 'cold';
  status: string;
  intent?: { score: number };
  createdAt: string;
}

interface LeadTableProps {
  leads: Lead[];
  loading?: boolean;
  error?: string;
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  onRowClick?: (lead: Lead) => void;
  selectedIds?: string[];
  onSelectChange?: (ids: string[]) => void;
}

const qualificationBadges: Record<string, 'danger' | 'warning' | 'info'> = {
  hot: 'danger',
  warm: 'warning',
  cold: 'info',
};

const statusBadges: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = {
  new: 'neutral',
  scored: 'info',
  qualified: 'info',
  contacted: 'warning',
  replied: 'success',
  converted: 'success',
  disqualified: 'danger',
};

const LeadTable = ({
  leads,
  loading = false,
  error = '',
  page,
  totalPages,
  total,
  limit,
  onPageChange,
  onRowClick,
  selectedIds = [],
  onSelectChange,
}: LeadTableProps) => {
  const [sortKey, setSortKey] = useState('createdAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectChange?.(leads.map((l) => l._id));
    } else {
      onSelectChange?.([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      onSelectChange?.([...selectedIds, id]);
    } else {
      onSelectChange?.(selectedIds.filter((i) => i !== id));
    }
  };

  const allSelected = leads.length > 0 && selectedIds.length === leads.length;

  if (error) {
    return (
      <div className="p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-3 text-[#EF4444] text-sm animate-scale-in">
        <FiAlertCircle className="w-5 h-5 shrink-0" />
        <span>{error}</span>
      </div>
    );
  }

  if (loading) {
    return <SkeletonTable rows={10} />;
  }

  if (leads.length === 0) {
    return (
      <EmptyState
        title="No leads found"
        description="Run your first scan to start discovering leads."
      />
    );
  }

  return (
    <div>
      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="bg-[#EFF6FF] border border-[#2563EB]/20 rounded-xl px-4 py-3 mb-4 flex items-center gap-3 animate-slide-up">
          <span className="text-sm font-medium text-[#2563EB]">
            {selectedIds.length} lead{selectedIds.length !== 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2 ml-auto">
            <button className="px-3 py-1.5 text-xs font-medium text-[#2563EB] hover:bg-[#2563EB]/10 rounded-lg transition-colors">
              Assign
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-[#2563EB] hover:bg-[#2563EB]/10 rounded-lg transition-colors">
              Change Status
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-[#EF4444] hover:bg-[#EF4444]/10 rounded-lg transition-colors">
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                {onSelectChange && (
                  <th className="p-4 w-10">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="w-4 h-4 rounded border-[#D1D5DB] text-[#2563EB] focus:ring-[#2563EB]"
                    />
                  </th>
                )}
                <th className="text-left p-4 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left p-4 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider hidden sm:table-cell">
                  Company
                </th>
                <th className="text-left p-4 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider hidden md:table-cell">
                  Source
                </th>
                <th className="text-left p-4 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                  Score
                </th>
                <th className="text-left p-4 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left p-4 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider hidden lg:table-cell">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6]">
              {leads.map((lead) => (
                <tr
                  key={lead._id}
                  onClick={() => onRowClick?.(lead)}
                  className={`hover:bg-[#F9FAFB] transition-colors ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                >
                  {onSelectChange && (
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(lead._id)}
                        onChange={(e) => handleSelectOne(lead._id, e.target.checked)}
                        className="w-4 h-4 rounded border-[#D1D5DB] text-[#2563EB] focus:ring-[#2563EB]"
                      />
                    </td>
                  )}
                  <td className="p-4">
                    <div>
                      <Link
                        to={`/leads/${lead._id}`}
                        className="text-sm font-medium text-[#111827] hover:text-[#2563EB] transition-colors inline-flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {sanitizeString(lead.name || 'Unknown')}
                        <FiExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                      </Link>
                      <p className="text-xs text-[#9CA3AF] mt-0.5">{sanitizeString(lead.email)}</p>
                    </div>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <span className="text-sm text-[#6B7280]">
                      {sanitizeString(lead.company || '-')}
                    </span>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <SourceBadge source={lead.source} />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 sm:w-16 bg-[#F3F4F6] rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full bg-[#22C55E] rounded-full transition-all"
                          style={{ width: `${lead.intent?.score || 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-[#6B7280]">{lead.intent?.score || 0}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Badge variant={qualificationBadges[lead.qualification] || 'neutral'} size="sm">
                        {lead.qualification}
                      </Badge>
                      <Badge variant={statusBadges[lead.status] || 'neutral'} size="sm">
                        {lead.status}
                      </Badge>
                    </div>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className="text-sm text-[#6B7280]">
                      {formatDate(lead.createdAt, 'short')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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

export default LeadTable;