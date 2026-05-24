import { useEffect, useState } from 'react';
import { FiCheckCircle, FiAlertCircle, FiX, FiInfo } from 'react-icons/fi';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose: () => void;
}

const config = {
  success: {
    icon: FiCheckCircle,
    bg: 'bg-[#DCFCE7] border-[#22C55E]/30',
    text: 'text-[#22C55E]',
    iconBg: 'text-[#22C55E]',
  },
  error: {
    icon: FiAlertCircle,
    bg: 'bg-[#FEE2E2] border-[#EF4444]/30',
    text: 'text-[#EF4444]',
    iconBg: 'text-[#EF4444]',
  },
  warning: {
    icon: FiAlertCircle,
    bg: 'bg-[#FEF3C7] border-[#F59E0B]/30',
    text: 'text-[#F59E0B]',
    iconBg: 'text-[#F59E0B]',
  },
  info: {
    icon: FiInfo,
    bg: 'bg-[#EFF6FF] border-[#2563EB]/30',
    text: 'text-[#2563EB]',
    iconBg: 'text-[#2563EB]',
  },
};

const Toast = ({ message, type = 'info', duration = 4000, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const { icon: Icon, bg, text, iconBg } = config[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg
        transition-all duration-300 bg-white
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
      `}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${iconBg}`} />
      <p className={`text-sm font-medium flex-1 ${text}`}>{message}</p>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
      >
        <FiX className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;