import { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface DropdownProps {
  label: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const Dropdown = ({ label, options, value, onChange, placeholder = 'Select...', className = '' }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {label && (
        <label className="block text-xs sm:text-sm font-medium text-[#374151] mb-1.5">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm text-[#111827] hover:border-[#D1D5DB] transition-colors"
      >
        <span className={selected ? 'text-[#111827]' : 'text-[#9CA3AF]'}>
          {selected?.label || placeholder}
        </span>
        <FiChevronDown className={`w-4 h-4 text-[#9CA3AF] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute z-40 mt-1 w-full bg-white border border-[#E5E7EB] rounded-xl shadow-lg overflow-hidden animate-scale-in">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`
                w-full text-left px-4 py-2.5 text-sm transition-colors
                ${value === option.value
                  ? 'bg-[#EFF6FF] text-[#2563EB] font-medium'
                  : 'text-[#374151] hover:bg-[#F9FAFB]'
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;