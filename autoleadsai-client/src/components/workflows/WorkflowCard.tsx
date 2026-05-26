// src/components/workflows/WorkflowCard.tsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiEdit3,
  FiTrash2,
  FiMoreHorizontal,
  FiActivity,
  FiClock,
} from 'react-icons/fi';
import Badge from '../common/Badge';
import ConfirmDialog from '../common/ConfirmDialog';
import { sanitizeString } from '../../utils/sanitizers';
import { formatDate } from '../../utils/formatDate';

interface Workflow {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  trigger: {
    type: string;
    config: any;
  };
  steps: {
    type: string;
    config: any;
    order: number;
  }[];
  runCount: number;
  lastRunAt?: string;
  createdAt: string;
}

interface WorkflowCardProps {
  workflow: Workflow;
  onToggle?: (workflow: Workflow) => void;
  onDelete?: (workflow: Workflow) => void;
}

const triggerLabels: Record<string, string> = {
  new_lead: 'New Lead',
  lead_scored: 'Lead Scored',
  manual: 'Manual',
};

const stepIcons: Record<string, string> = {
  scoring: '📊',
  filter: '🔍',
  email: '✉️',
  crm_sync: '🔄',
  slack_alert: '🔔',
  delay: '⏱️',
  condition: '🔀',
};

const WorkflowCard = ({ workflow, onToggle, onDelete }: WorkflowCardProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState(workflow.isActive);

  const handleToggle = () => {
    setIsActive(!isActive);
    onToggle?.(workflow);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
    setMenuOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5 hover:shadow-md transition-all duration-200 group">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="min-w-0 flex-1">
            <Link
              to={`/workflows/${workflow._id}/build`}
              className="text-base font-semibold text-[#111827] hover:text-[#2563EB] transition-colors truncate block"
            >
              {sanitizeString(workflow.name)}
            </Link>
            {workflow.description && (
              <p className="text-xs text-[#6B7280] mt-0.5 line-clamp-2">
                {sanitizeString(workflow.description)}
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
                <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-[#E5E7EB] rounded-xl shadow-lg z-50 py-1 animate-scale-in">
                  <Link
                    to={`/workflows/${workflow._id}/build`}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#374151] hover:bg-[#F9FAFB] transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FiEdit3 className="w-3.5 h-3.5" />
                    Edit
                  </Link>
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

        {/* Trigger & Steps */}
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="info" size="sm">
            {triggerLabels[workflow.trigger.type] || workflow.trigger.type}
          </Badge>
          <span className="text-xs text-[#9CA3AF]">
            {workflow.steps.length} step{workflow.steps.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Step Preview */}
        <div className="flex items-center gap-1 mb-3">
          {workflow.steps.slice(0, 5).map((step, i) => (
            <span
              key={i}
              className="w-7 h-7 bg-[#F3F4F6] rounded-lg flex items-center justify-center text-xs"
              title={step.type.replace(/_/g, ' ')}
            >
              {stepIcons[step.type] || '⚙️'}
            </span>
          ))}
          {workflow.steps.length > 5 && (
            <span className="text-[10px] text-[#9CA3AF] ml-1">
              +{workflow.steps.length - 5}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-3 text-xs text-[#6B7280]">
            <span className="flex items-center gap-1">
              <FiActivity className="w-3 h-3" />
              {workflow.runCount} runs
            </span>
            {workflow.lastRunAt && (
              <span className="flex items-center gap-1">
                <FiClock className="w-3 h-3" />
                {formatDate(workflow.lastRunAt, 'relative')}
              </span>
            )}
          </div>

          {/* Toggle Switch */}
          <button
            onClick={handleToggle}
            className={`
              relative w-10 h-5 rounded-full transition-colors duration-200 shrink-0
              ${isActive ? 'bg-[#22C55E]' : 'bg-[#D1D5DB]'}
            `}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                isActive ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          onDelete?.(workflow);
          setShowDeleteConfirm(false);
        }}
        title="Delete Workflow"
        message={`Are you sure you want to delete "${workflow.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
      />
    </>
  );
};

export default WorkflowCard;