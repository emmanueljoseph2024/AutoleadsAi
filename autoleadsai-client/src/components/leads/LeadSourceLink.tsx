// src/components/leads/LeadSourceLink.tsx

import { FiExternalLink } from 'react-icons/fi';
import SourceBadge from '../common/SourceBadge';
import { sanitizeUrl } from '../../utils/sanitizers';

interface LeadSourceLinkProps {
  source: string;
  sourceUrl?: string;
}

const LeadSourceLink = ({ source, sourceUrl }: LeadSourceLinkProps) => {
  const safeUrl = sanitizeUrl(sourceUrl || '');

  return (
    <div className="flex items-center gap-2">
      <SourceBadge source={source} />
      {safeUrl && (
        <a
          href={safeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#2563EB] hover:underline inline-flex items-center gap-1"
        >
          Open Source <FiExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  );
};

export default LeadSourceLink;