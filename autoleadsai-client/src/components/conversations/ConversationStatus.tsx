import Badge from '../common/Badge';

interface ConversationStatusProps {
  status: 'active' | 'waiting' | 'human_needed' | 'closed' | 'spam';
  className?: string;
}

const statusConfig: Record<string, { variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral'; label: string }> = {
  active: { variant: 'success', label: 'Active' },
  waiting: { variant: 'warning', label: 'Waiting' },
  human_needed: { variant: 'danger', label: 'Needs You' },
  closed: { variant: 'neutral', label: 'Closed' },
  spam: { variant: 'neutral', label: 'Spam' },
};

const ConversationStatus = ({ status, className = '' }: ConversationStatusProps) => {
  const config = statusConfig[status] || statusConfig.closed;

  return (
    <Badge variant={config.variant} size="sm" className={className}>
      {config.label}
    </Badge>
  );
};

export default ConversationStatus;