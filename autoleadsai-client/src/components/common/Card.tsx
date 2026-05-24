import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FiMoreHorizontal } from 'react-icons/fi';

interface CardProps {
  children: ReactNode;
  title?: string;
  action?: ReactNode;
  linkTo?: string;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const paddings = {
  sm: 'p-3 sm:p-4',
  md: 'p-4 sm:p-5',
  lg: 'p-4 sm:p-6 lg:p-8',
};

const Card = ({
  children,
  title,
  action,
  linkTo,
  className = '',
  padding = 'md',
  hover = false,
}: CardProps) => {
  const content = (
    <div
      className={`
        bg-white rounded-2xl border border-[#E5E7EB]
        ${paddings[padding]}
        ${hover ? 'hover:shadow-md transition-shadow' : ''}
        ${className}
      `}
    >
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h3 className="text-base sm:text-lg font-bold text-[#111827]">{title}</h3>
          )}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo} className="block">{content}</Link>;
  }

  return content;
};

export default Card;