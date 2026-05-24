import { type InputHTMLAttributes, forwardRef } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, rightIcon, onRightIconClick, className = '', ...props }, ref) => {
    return (
      <div>
        {label && (
          <label className="block text-xs sm:text-sm font-medium text-[#374151] mb-1.5 sm:mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full py-2.5 sm:py-3 bg-[#F9FAFB] border rounded-xl text-sm sm:text-base text-[#111827]
              placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent
              transition-all
              ${icon ? 'pl-10 sm:pl-12' : 'pl-3 sm:pl-4'}
              ${rightIcon ? 'pr-10 sm:pr-12' : 'pr-3 sm:pr-4'}
              ${error ? 'border-[#EF4444]' : 'border-[#E5E7EB]'}
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <button
              type="button"
              onClick={onRightIconClick}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
              tabIndex={-1}
            >
              {rightIcon}
            </button>
          )}
        </div>
        {error && (
          <p className="text-[10px] sm:text-xs text-[#EF4444] mt-1 flex items-center gap-1">
            <FiAlertCircle className="w-3 h-3" />
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-[10px] sm:text-xs text-[#9CA3AF] mt-1">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;