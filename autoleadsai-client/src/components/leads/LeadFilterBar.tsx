// src/components/leads/LeadFilterBar.tsx

import SearchBar from '../common/SearchBar';
import Dropdown from '../common/Dropdown';
import { FiX } from 'react-icons/fi';

interface LeadFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  qualification: string;
  onQualificationChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  source: string;
  onSourceChange: (value: string) => void;
  onClear: () => void;
}

const qualificationOptions = [
  { value: 'all', label: 'All Qualifications' },
  { value: 'hot', label: 'Hot' },
  { value: 'warm', label: 'Warm' },
  { value: 'cold', label: 'Cold' },
];

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'new', label: 'New' },
  { value: 'scored', label: 'Scored' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'replied', label: 'Replied' },
  { value: 'converted', label: 'Converted' },
  { value: 'disqualified', label: 'Disqualified' },
];

const sourceOptions = [
  { value: 'all', label: 'All Sources' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'reddit', label: 'Reddit' },
  { value: 'twitter', label: 'X (Twitter)' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'website', label: 'Website' },
  { value: 'google_maps', label: 'Google Maps' },
  { value: 'news', label: 'News' },
  { value: 'manual', label: 'Manual' },
  { value: 'api', label: 'API' },
];

const hasActiveFilters = (qualification: string, status: string, source: string) => {
  return qualification !== 'all' || status !== 'all' || source !== 'all';
};

const LeadFilterBar = ({
  search,
  onSearchChange,
  qualification,
  onQualificationChange,
  status,
  onStatusChange,
  source,
  onSourceChange,
  onClear,
}: LeadFilterBarProps) => {
  const active = hasActiveFilters(qualification, status, source);

  return (
    <div className="space-y-3">
      <SearchBar
        value={search}
        onChange={onSearchChange}
        placeholder="Search by name, email, or company..."
        className="w-full"
      />
      <div className="flex flex-col sm:flex-row gap-3">
        <Dropdown
          label=""
          options={qualificationOptions}
          value={qualification}
          onChange={onQualificationChange}
          className="flex-1"
        />
        <Dropdown
          label=""
          options={statusOptions}
          value={status}
          onChange={onStatusChange}
          className="flex-1"
        />
        <Dropdown
          label=""
          options={sourceOptions}
          value={source}
          onChange={onSourceChange}
          className="flex-1"
        />
        {active && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg transition-colors shrink-0"
          >
            <FiX className="w-3.5 h-3.5" />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default LeadFilterBar;