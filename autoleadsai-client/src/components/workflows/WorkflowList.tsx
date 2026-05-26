// src/components/workflows/WorkflowList.tsx

import { FiActivity, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import EmptyState from '../common/EmptyState';
import WorkflowCard from './WorkflowCard';
import Skeleton from '../common/Skeleton';

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

interface WorkflowListProps {
  workflows: Workflow[];
  loading?: boolean;
  onToggle?: (workflow: Workflow) => void;
  onDelete?: (workflow: Workflow) => void;
}

const WorkflowList = ({
  workflows,
  loading = false,
  onToggle,
  onDelete,
}: WorkflowListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#E5E7EB] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-6 w-10 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-20" />
            <div className="flex items-center gap-2 pt-3 border-t border-[#E5E7EB]">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (workflows.length === 0) {
    return (
      <EmptyState
        icon={<FiActivity className="w-8 h-8" />}
        title="No workflows yet"
        description="Create your first workflow to automate lead outreach and follow-ups."
        actionLabel="Create Workflow"
        onAction={() => {}}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {workflows.map((workflow) => (
        <WorkflowCard
          key={workflow._id}
          workflow={workflow}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default WorkflowList;