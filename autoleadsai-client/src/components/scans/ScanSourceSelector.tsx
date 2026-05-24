// src/components/scans/ScanSourceSelector.tsx

import { FaLinkedinIn, FaFacebookF, FaRedditAlien, FaInstagram } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import { FiGlobe, FiMapPin, FiFileText, FiSearch } from 'react-icons/fi';

interface Source {
  value: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  selectedBg: string;
  description: string;
}

interface ScanSourceSelectorProps {
  selected: string[];
  onChange: (sources: string[]) => void;
  maxSources?: number;
  className?: string;
}

const allSources: Source[] = [
  {
    value: 'linkedin',
    label: 'LinkedIn',
    icon: <FaLinkedinIn className="w-5 h-5" />,
    color: 'text-[#0A66C2]',
    bg: 'bg-[#E8F0FE]',
    selectedBg: 'bg-[#0A66C2] text-white',
    description: 'Professional profiles & companies',
  },
  {
    value: 'facebook',
    label: 'Facebook',
    icon: <FaFacebookF className="w-5 h-5" />,
    color: 'text-[#1877F2]',
    bg: 'bg-[#E7F0FD]',
    selectedBg: 'bg-[#1877F2] text-white',
    description: 'Pages, groups & marketplace',
  },
  {
    value: 'reddit',
    label: 'Reddit',
    icon: <FaRedditAlien className="w-5 h-5" />,
    color: 'text-[#FF4500]',
    bg: 'bg-[#FFE8E0]',
    selectedBg: 'bg-[#FF4500] text-white',
    description: 'Discussions & communities',
  },
  {
    value: 'twitter',
    label: 'X (Twitter)',
    icon: <SiX className="w-5 h-5" />,
    color: 'text-[#111827]',
    bg: 'bg-[#F3F4F6]',
    selectedBg: 'bg-[#111827] text-white',
    description: 'Posts & mentions',
  },
  {
    value: 'instagram',
    label: 'Instagram',
    icon: <FaInstagram className="w-5 h-5" />,
    color: 'text-[#E4405F]',
    bg: 'bg-[#FDE8EC]',
    selectedBg: 'bg-[#E4405F] text-white',
    description: 'Profiles & hashtags',
  },
  {
    value: 'website',
    label: 'Website',
    icon: <FiGlobe className="w-5 h-5" />,
    color: 'text-[#4CAF50]',
    bg: 'bg-[#E8F5E9]',
    selectedBg: 'bg-[#4CAF50] text-white',
    description: 'Contact pages & emails',
  },
  {
    value: 'google_maps',
    label: 'Google Maps',
    icon: <FiMapPin className="w-5 h-5" />,
    color: 'text-[#EA4335]',
    bg: 'bg-[#FDE8E8]',
    selectedBg: 'bg-[#EA4335] text-white',
    description: 'Business listings',
  },
  {
    value: 'news',
    label: 'News',
    icon: <FiFileText className="w-5 h-5" />,
    color: 'text-[#FF9800]',
    bg: 'bg-[#FFF3E0]',
    selectedBg: 'bg-[#FF9800] text-white',
    description: 'Articles & press releases',
  },
  {
    value: 'apollo',
    label: 'Apollo',
    icon: <FiSearch className="w-5 h-5" />,
    color: 'text-[#6366F1]',
    bg: 'bg-[#EEF2FF]',
    selectedBg: 'bg-[#6366F1] text-white',
    description: 'B2B contact database',
  },
];

const ScanSourceSelector = ({
  selected,
  onChange,
  maxSources = 5,
  className = '',
}: ScanSourceSelectorProps) => {
  const handleToggle = (source: string) => {
    if (selected.includes(source)) {
      onChange(selected.filter((s) => s !== source));
    } else if (selected.length < maxSources) {
      onChange([...selected, source]);
    }
  };

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 ${className}`}>
      {allSources.map((source) => {
        const isSelected = selected.includes(source.value);
        const isDisabled = !isSelected && selected.length >= maxSources;

        return (
          <button
            key={source.value}
            onClick={() => handleToggle(source.value)}
            disabled={isDisabled}
            className={`
              relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200
              ${isSelected
                ? `${source.selectedBg} border-transparent shadow-md scale-[1.02]`
                : isDisabled
                ? 'bg-[#F9FAFB] border-[#E5E7EB] opacity-40 cursor-not-allowed'
                : 'bg-white border-[#E5E7EB] hover:border-[#2563EB]/30 hover:bg-[#F9FAFB]'
              }
            `}
          >
            {isSelected && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            <span className={isSelected ? 'text-white' : source.color}>
              {source.icon}
            </span>
            <span className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-[#374151]'}`}>
              {source.label}
            </span>
            <span className={`text-[10px] leading-tight text-center ${isSelected ? 'text-white/70' : 'text-[#9CA3AF]'}`}>
              {source.description}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ScanSourceSelector;