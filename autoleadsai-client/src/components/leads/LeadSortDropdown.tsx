// src/components/leads/LeadSortDropdown.tsx

import { useState, useRef, useEffect } from 'react';
import {
  FiChevronDown,
  FiArrowUp,
  FiArrowDown,
  FiClock,
  FiStar,
  FiTrendingUp,
} from 'react-icons/fi';

interface SortOption {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface LeadSortDropdownProps {
  value: string;
  direction: 'asc' | 'desc';
  onChange: (sortKey: string, direction: 'asc' | 'desc') => void;
  className?: string;
}

const sortOptions: SortOption[] = [
  { value: 'createdAt', label: 'Date Added', icon: <FiClock className="w-4 h-4" /> },
  { value: 'intent.score', label: 'Intent Score', icon: <FiStar className="w-4 h-4" /> },
  { value: 'relevance.score', label: 'Relevance Score', icon: <FiTrendingUp className="w-4 h-4" /> },
  { value: 'name', label: 'Name', icon: <FiArrowUp className="w-4 h-4" /> },
  { value: 'company', label: 'Company', icon: <FiArrowUp className="w-4 h-4" /> },
  { value: 'qualification', label: 'Qualification', icon: <FiStar className="w-4 h-4" /> },
  { value: 'status', label: 'Status', icon: <FiTrendingUp className="w-4 h-4" /> },
];

const LeadSortDropdown = ({
  value,
  direction,
  onChange,
  className = '',
}: LeadSortDropdownProps) => {
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

  const selectedOption = sortOptions.find((o) => o.value === value) || sortOptions[0];

  const handleSelect = (option: SortOption) => {
    if (option.value === value) {
      // Toggle direction
      onChange(option.value, direction === 'asc' ? 'desc' : 'asc');
    } else {
      onChange(option.value, 'desc');
    }
    setIsOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#374151] hover:border-[#D1D5DB] transition-colors"
      >
        <span className="text-[#9CA3AF] text-xs">Sort:</span>
        <span className="flex items-center gap-1.5 font-medium">
          {selectedOption.icon}
          {selectedOption.label}
        </span>
        {direction === 'asc' ? (
          <FiArrowUp className="w-3.5 h-3.5 text-[#2563EB]" />
        ) : (
          <FiArrowDown className="w-3.5 h-3.5 text-[#2563EB]" />
        )}
        <FiChevronDown
          className={`w-4 h-4 text-[#9CA3AF] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-40 right-0 mt-1 w-52 bg-white border border-[#E5E7EB] rounded-xl shadow-lg overflow-hidden animate-scale-in">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option)}
              className={`
                w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors
                ${value === option.value
                  ? 'bg-[#EFF6FF] text-[#2563EB] font-medium'
                  : 'text-[#374151] hover:bg-[#F9FAFB]'
                }
              `}
            >
              <span className="flex items-center gap-2">
                {option.icon}
                {option.label}
              </span>
              {value === option.value && (
                <span className="flex items-center gap-1 text-[10px] text-[#2563EB]">
                  {direction === 'asc' ? (
                    <FiArrowUp className="w-3 h-3" />
                  ) : (
                    <FiArrowDown className="w-3 h-3" />
                  )}
                  {direction === 'asc' ? 'Asc' : 'Desc'}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadSortDropdown;