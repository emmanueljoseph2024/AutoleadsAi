// src/components/messages/PlatformSelector.tsx

import { FaLinkedinIn, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import { FiMail } from 'react-icons/fi';

interface Platform {
  value: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
}

interface PlatformSelectorProps {
  selected: string;
  onChange: (platform: string) => void;
  className?: string;
}

const platforms: Platform[] = [
  {
    value: 'linkedin',
    label: 'LinkedIn',
    icon: <FaLinkedinIn className="w-4 h-4" />,
    color: 'text-[#0A66C2]',
    bg: 'bg-[#E8F0FE] hover:bg-[#D0E3FC]',
  },
  {
    value: 'facebook',
    label: 'Facebook',
    icon: <FaFacebookF className="w-4 h-4" />,
    color: 'text-[#1877F2]',
    bg: 'bg-[#E7F0FD] hover:bg-[#CFE2FB]',
  },
  {
    value: 'twitter',
    label: 'X',
    icon: <SiX className="w-4 h-4" />,
    color: 'text-[#111827]',
    bg: 'bg-[#F3F4F6] hover:bg-[#E5E7EB]',
  },
  {
    value: 'instagram',
    label: 'Instagram',
    icon: <FaInstagram className="w-4 h-4" />,
    color: 'text-[#E4405F]',
    bg: 'bg-[#FDE8EC] hover:bg-[#FBD0D9]',
  },
  {
    value: 'email',
    label: 'Email',
    icon: <FiMail className="w-4 h-4" />,
    color: 'text-[#2563EB]',
    bg: 'bg-[#EFF6FF] hover:bg-[#DBEAFE]',
  },
];

const PlatformSelector = ({ selected, onChange, className = '' }: PlatformSelectorProps) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      {platforms.map((platform) => (
        <button
          key={platform.value}
          onClick={() => onChange(platform.value)}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all
            ${selected === platform.value
              ? `${platform.bg} ring-2 ring-[#2563EB]/30 scale-105`
              : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB]'
            }
          `}
        >
          <span className={selected === platform.value ? platform.color : 'text-[#9CA3AF]'}>
            {platform.icon}
          </span>
          <span className="hidden sm:inline">{platform.label}</span>
        </button>
      ))}
    </div>
  );
};

export default PlatformSelector;