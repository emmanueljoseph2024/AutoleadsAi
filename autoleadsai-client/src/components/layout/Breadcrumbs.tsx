// src/components/layout/Breadcrumbs.tsx

import { Link } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';
import { sanitizeString } from '../../utils/sanitizers';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-1.5 text-sm">
        <li>
          <Link
            to="/dashboard"
            className="text-[#9CA3AF] hover:text-[#2563EB] transition-colors inline-flex items-center gap-1"
          >
            <FiHome className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <FiChevronRight className="w-3.5 h-3.5 text-[#D1D5DB]" />
            {item.path ? (
              <Link
                to={item.path}
                className="text-[#9CA3AF] hover:text-[#2563EB] transition-colors"
              >
                {sanitizeString(item.label)}
              </Link>
            ) : (
              <span className="text-[#111827] font-medium">
                {sanitizeString(item.label)}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;