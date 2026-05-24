import { type ReactNode } from 'react';
import { FiInbox } from 'react-icons/fi';
import Button from './Button';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <div className="text-center py-12 sm:py-16">
      <div className="w-16 h-16 bg-[#F3F4F6] rounded-2xl flex items-center justify-center mx-auto mb-4">
        {icon || <FiInbox className="w-8 h-8 text-[#9CA3AF]" />}
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-[#111827] mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-[#6B7280] max-w-sm mx-auto mb-6">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction} size="md">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;