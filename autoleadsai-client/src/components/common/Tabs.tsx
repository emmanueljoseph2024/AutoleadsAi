import { type ReactNode } from 'react';

interface Tab {
  key: string;
  label: string;
  icon?: ReactNode;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (key: string) => void;
  className?: string;
}

const Tabs = ({ tabs, activeTab, onChange, className = '' }: TabsProps) => {
  return (
    <div className={`flex gap-1 border-b border-[#E5E7EB] ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`
            flex items-center gap-2 px-3 sm:px-4 py-2.5 text-sm font-medium border-b-2 transition-all
            -mb-px
            ${activeTab === tab.key
              ? 'border-[#2563EB] text-[#2563EB]'
              : 'border-transparent text-[#6B7280] hover:text-[#111827] hover:border-[#D1D5DB]'
            }
          `}
        >
          {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
          {tab.label}
          {tab.count !== undefined && (
            <span className={`
              px-1.5 py-0.5 rounded-full text-[10px] font-bold
              ${activeTab === tab.key
                ? 'bg-[#EFF6FF] text-[#2563EB]'
                : 'bg-[#F3F4F6] text-[#9CA3AF]'
              }
            `}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;