import { type ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

const variants = {
  default: 'bg-[#EFF6FF] text-[#2563EB]',
  success: 'bg-[#DCFCE7] text-[#22C55E]',
  warning: 'bg-[#FEF3C7] text-[#F59E0B]',
  danger: 'bg-[#FEE2E2] text-[#EF4444]',
  info: 'bg-[#ECFEFF] text-[#06B6D4]',
  neutral: 'bg-[#F3F4F6] text-[#6B7280]',
};

const sizes = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-0.5 text-xs',
};

const Badge = ({ children, variant = 'default', size = 'md', className = '' }: BadgeProps) => {
  return (
    <span
      className={`
        inline-flex items-center gap-1 font-medium rounded-full
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;