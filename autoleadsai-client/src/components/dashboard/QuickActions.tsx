import { Link } from 'react-router-dom';
import { FiPlus, FiTarget, FiMail, FiMessageSquare } from 'react-icons/fi';

interface QuickAction {
  label: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  bg: string;
}

const QuickActions = () => {
  const actions: QuickAction[] = [
    {
      label: 'New Scan',
      icon: <FiTarget className="w-5 h-5" />,
      path: '/scans',
      color: 'text-[#2563EB]',
      bg: 'bg-[#EFF6FF] hover:bg-[#DBEAFE]',
    },
    {
      label: 'Add Lead',
      icon: <FiPlus className="w-5 h-5" />,
      path: '/leads',
      color: 'text-[#22C55E]',
      bg: 'bg-[#DCFCE7] hover:bg-[#BBF7D0]',
    },
    {
      label: 'Messages',
      icon: <FiMessageSquare className="w-5 h-5" />,
      path: '/messages',
      color: 'text-[#4F46E5]',
      bg: 'bg-[#EEF2FF] hover:bg-[#E0E7FF]',
    },
    {
      label: 'Email Logs',
      icon: <FiMail className="w-5 h-5" />,
      path: '/email-logs',
      color: 'text-[#06B6D4]',
      bg: 'bg-[#ECFEFF] hover:bg-[#CFFAFE]',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-bold text-[#111827] mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            to={action.path}
            className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl transition-colors ${action.bg}`}
          >
            <span className={action.color}>{action.icon}</span>
            <span className="text-xs sm:text-sm font-medium text-[#374151]">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
