// src/utils/sourceConfig.ts

import { createElement } from 'react';
import type { ReactElement } from 'react';
import { FaLinkedinIn, FaFacebookF, FaRedditAlien, FaInstagram } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import { FiGlobe, FiMapPin, FiFileText, FiUserPlus, FiCode, FiMoreHorizontal } from 'react-icons/fi';

export interface SourceMeta {
  icon: () => ReactElement;
  label: string;
  color: string;
  bg: string;
  canChat: boolean;
}

const iconClass = 'w-3 h-3';

const configs: Record<string, SourceMeta> = {
  linkedin: {
    icon: () => createElement(FaLinkedinIn, { className: iconClass }),
    label: 'LinkedIn',
    color: '#0A66C2',
    bg: 'bg-[#E8F0FE]',
    canChat: true,
  },
  facebook: {
    icon: () => createElement(FaFacebookF, { className: iconClass }),
    label: 'Facebook',
    color: '#1877F2',
    bg: 'bg-[#E7F0FD]',
    canChat: true,
  },
  reddit: {
    icon: () => createElement(FaRedditAlien, { className: iconClass }),
    label: 'Reddit',
    color: '#FF4500',
    bg: 'bg-[#FFE8E0]',
    canChat: true,
  },
  twitter: {
    icon: () => createElement(SiX, { className: iconClass }),
    label: 'X',
    color: '#111827',
    bg: 'bg-[#F3F4F6]',
    canChat: true,
  },
  instagram: {
    icon: () => createElement(FaInstagram, { className: iconClass }),
    label: 'Instagram',
    color: '#E4405F',
    bg: 'bg-[#FDE8EC]',
    canChat: true,
  },
  website: {
    icon: () => createElement(FiGlobe, { className: iconClass }),
    label: 'Website',
    color: '#4CAF50',
    bg: 'bg-[#E8F5E9]',
    canChat: false,
  },
  google_maps: {
    icon: () => createElement(FiMapPin, { className: iconClass }),
    label: 'Google Maps',
    color: '#EA4335',
    bg: 'bg-[#FDE8E8]',
    canChat: false,
  },
  news: {
    icon: () => createElement(FiFileText, { className: iconClass }),
    label: 'News',
    color: '#FF9800',
    bg: 'bg-[#FFF3E0]',
    canChat: false,
  },
  manual: {
    icon: () => createElement(FiUserPlus, { className: iconClass }),
    label: 'Manual',
    color: '#9E9E9E',
    bg: 'bg-[#F5F5F5]',
    canChat: false,
  },
  api: {
    icon: () => createElement(FiCode, { className: iconClass }),
    label: 'API',
    color: '#607D8B',
    bg: 'bg-[#ECEFF1]',
    canChat: false,
  },
};

const fallback: SourceMeta = {
  icon: () => createElement(FiMoreHorizontal, { className: iconClass }),
  label: 'Other',
  color: '#9E9E9E',
  bg: 'bg-[#F3F4F6]',
  canChat: false,
};

export const getSourceConfig = (source: string): SourceMeta => {
  return configs[source] || { ...fallback, label: source || 'Other' };
};