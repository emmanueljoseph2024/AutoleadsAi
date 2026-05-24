// src/components/leads/LeadStatusBadge.tsx

import Badge from '../common/Badge';

interface LeadStatusBadgeProps {
  status: string;
  qualification?: string;
  size?: 'sm' | 'md';
}

const qualificationConfig: Record<string, 'danger' | 'warning' | 'info'> = {
  hot: 'danger',
  warm: 'warning',
  cold: 'info',
};

const statusConfig: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = {
  new: 'neutral',
  scored: 'info',
  qualified: 'info',
  contacted: 'warning',
  replied: 'success',
  converted: 'success',
  disqualified: 'danger',
};

const LeadStatusBadge = ({ status, qualification, size = 'md' }: LeadStatusBadgeProps) => {
  return (
    <div className="flex items-center gap-1.5">
      {qualification && (
        <Badge variant={qualificationConfig[qualification] || 'neutral'} size={size}>
          {qualification}
        </Badge>
      )}
      <Badge variant={statusConfig[status] || 'neutral'} size={size}>
        {status}
      </Badge>
    </div>
  );
};

export default LeadStatusBadge;