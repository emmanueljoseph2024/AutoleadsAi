// src/components/leads/LeadBulkActions.tsx

import { FiDownload, FiTrash2, FiUserPlus } from 'react-icons/fi';

interface LeadBulkActionsProps {
  selectedCount: number;
  onAssign: () => void;
  onExport: () => void;
  onDelete: () => void;
  loading?: boolean;
}

const LeadBulkActions = ({
  selectedCount,
  onAssign,
  onExport,
  onDelete,
  loading = false,
}: LeadBulkActionsProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-[#EFF6FF] border border-[#2563EB]/20 rounded-xl px-4 py-3 flex items-center gap-3 animate-slide-up">
      <span className="text-sm font-medium text-[#2563EB]">
        {selectedCount} lead{selectedCount !== 1 ? 's' : ''} selected
      </span>
      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={onAssign}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#2563EB] hover:bg-[#2563EB]/10 rounded-lg transition-colors disabled:opacity-50"
        >
          <FiUserPlus className="w-3.5 h-3.5" />
          Assign
        </button>
        <button
          onClick={onExport}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#2563EB] hover:bg-[#2563EB]/10 rounded-lg transition-colors disabled:opacity-50"
        >
          <FiDownload className="w-3.5 h-3.5" />
          Export
        </button>
        <button
          onClick={onDelete}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#EF4444] hover:bg-[#EF4444]/10 rounded-lg transition-colors disabled:opacity-50"
        >
          <FiTrash2 className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default LeadBulkActions;