import { FaLinkedinIn, FaFacebookF, FaRedditAlien, FaInstagram } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import { FiGlobe, FiMapPin, FiFileText, FiUserPlus, FiCode, FiMoreHorizontal } from 'react-icons/fi';

interface SourceBadgeProps {
  source: string;
  showLabel?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

const sourceConfig: Record<string, { icon: React.ReactNode; label: string; color: string; bg: string }> = {
  linkedin: {
    icon: <FaLinkedinIn className="w-3 h-3" />,
    label: 'LinkedIn',
    color: '#0A66C2',
    bg: 'bg-[#E8F0FE]',
  },
  facebook: {
    icon: <FaFacebookF className="w-3 h-3" />,
    label: 'Facebook',
    color: '#1877F2',
    bg: 'bg-[#E7F0FD]',
  },
  reddit: {
    icon: <FaRedditAlien className="w-3 h-3" />,
    label: 'Reddit',
    color: '#FF4500',
    bg: 'bg-[#FFE8E0]',
  },
  twitter: {
    icon: <SiX className="w-3 h-3" />,
    label: 'X',
    color: '#111827',
    bg: 'bg-[#F3F4F6]',
  },
  instagram: {
    icon: <FaInstagram className="w-3 h-3" />,
    label: 'Instagram',
    color: '#E4405F',
    bg: 'bg-[#FDE8EC]',
  },
  website: {
    icon: <FiGlobe className="w-3 h-3" />,
    label: 'Website',
    color: '#4CAF50',
    bg: 'bg-[#E8F5E9]',
  },
  google_maps: {
    icon: <FiMapPin className="w-3 h-3" />,
    label: 'Google Maps',
    color: '#EA4335',
    bg: 'bg-[#FDE8E8]',
  },
  news: {
    icon: <FiFileText className="w-3 h-3" />,
    label: 'News',
    color: '#FF9800',
    bg: 'bg-[#FFF3E0]',
  },
  manual: {
    icon: <FiUserPlus className="w-3 h-3" />,
    label: 'Manual',
    color: '#9E9E9E',
    bg: 'bg-[#F5F5F5]',
  },
  api: {
    icon: <FiCode className="w-3 h-3" />,
    label: 'API',
    color: '#607D8B',
    bg: 'bg-[#ECEFF1]',
  },
};

const sizes = {
  sm: 'px-1.5 py-0.5 text-[10px] gap-1',
  md: 'px-2 py-0.5 text-xs gap-1.5',
};

const SourceBadge = ({ source, showLabel = true, size = 'md', className = '' }: SourceBadgeProps) => {
  const config = sourceConfig[source] || {
    icon: <FiMoreHorizontal className="w-3 h-3" />,
    label: source,
    color: '#9E9E9E',
    bg: 'bg-[#F3F4F6]',
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full font-medium
        ${config.bg}
        ${sizes[size]}
        ${className}
      `}
      style={{ color: config.color }}
    >
      {config.icon}
      {showLabel && config.label}
    </span>
  );
};

export default SourceBadge;