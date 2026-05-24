// src/components/niches/NicheCard.tsx

import { useState } from 'react';
import {
  FiMapPin,
  FiTarget,
  FiZap,
  FiClock,
  FiEdit3,
  FiTrash2,
  FiBarChart2,
  FiMoreHorizontal,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../common/ConfirmDialog';
import { sanitizeString } from '../../utils/sanitizers';
import { formatDate } from '../../utils/formatDate';
import { getSourceConfig } from '../../utils/sourceConfig';

interface Niche {
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

interface NicheCardProps {
  niche: Niche;
  onViewDashboard?: (niche: Niche) => void;
  onEdit?: (niche: Niche) => void;
  onDelete?: (niche: Niche) => void;
}

const NicheCard = ({ niche, onViewDashboard, onEdit, onDelete }: NicheCardProps) => {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleViewDashboard = () => {
    if (onViewDashboard) {
      onViewDashboard(niche);
    } else {
      navigate(`/dashboard?nicheId=${niche._id}`);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(niche);
    }
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
    setMenuOpen(false);
  };

  const confirmDelete = () => {
    onDelete?.(niche);
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5 hover:shadow-md transition-all duration-200 group">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-[#111827] truncate">
              {sanitizeString(niche.name)}
            </h3>
            {niche.location && (
              <p className="text-xs text-[#6B7280] flex items-center gap-1 mt-1">
                <FiMapPin className="w-3 h-3" />
                {sanitizeString(niche.location)}
              </p>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F3F4F6] rounded-lg transition-colors opacity-0 group-hover:opacity-100"
            >
              <FiMoreHorizontal className="w-4 h-4" />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-[#E5E7EB] rounded-xl shadow-lg z-50 py-1 animate-scale-in">
                  <button
                    onClick={handleEdit}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#374151] hover:bg-[#F9FAFB] transition-colors"
                  >
                    <FiEdit3 className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#EF4444] hover:bg-[#FEF2F2] transition-colors"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Keywords */}
        {niche.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {niche.keywords.slice(0, 4).map((kw, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-[#F3F4F6] text-[#6B7280] rounded-full text-[10px] font-medium"
              >
                {sanitizeString(kw)}
              </span>
            ))}
            {niche.keywords.length > 4 && (
              <span className="px-2 py-0.5 text-[#9CA3AF] text-[10px]">
                +{niche.keywords.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Sources */}
        <div className="flex items-center gap-1.5 mb-3">
          {niche.sources.slice(0, 4).map((source) => {
            const config = getSourceConfig(source);
            const Icon = config.icon;
            return (
              <span
                key={source}
                className={`w-6 h-6 ${config.bg} rounded-lg flex items-center justify-center`}
                style={{ color: config.color }}
                title={config.label}
              >
                <Icon />
              </span>
            );
          })}
          {niche.sources.length > 4 && (
            <span className="text-[10px] text-[#9CA3AF]">+{niche.sources.length - 4}</span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 pt-3 border-t border-[#E5E7EB] text-xs">
          <span className="flex items-center gap-1 text-[#6B7280]">
            <FiTarget className="w-3 h-3 text-[#2563EB]" />
            {niche.stats.totalLeads} leads
          </span>
          <span className="flex items-center gap-1 text-[#6B7280]">
            <FiZap className="w-3 h-3 text-[#F59E0B]" />
            {niche.stats.hotLeads} hot
          </span>
          {niche.lastScanAt ? (
            <span className="flex items-center gap-1 text-[#9CA3AF] ml-auto">
              <FiClock className="w-3 h-3" />
              {formatDate(niche.lastScanAt, 'relative')}
            </span>
          ) : (
            <span className="text-[#9CA3AF] ml-auto">No scans yet</span>
          )}
        </div>

        {/* View Dashboard Button */}
        <button
          onClick={handleViewDashboard}
          className="mt-3 w-full py-2 bg-[#EFF6FF] text-[#2563EB] rounded-xl text-xs font-semibold hover:bg-[#DBEAFE] transition-colors flex items-center justify-center gap-1.5"
        >
          <FiBarChart2 className="w-3.5 h-3.5" />
          View Dashboard
        </button>
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete Niche"
        message={`Are you sure you want to delete "${niche.name}"? This will not delete the leads associated with this niche.`}
        confirmLabel="Delete"
        variant="danger"
      />
    </>
  );
};

export default NicheCard;