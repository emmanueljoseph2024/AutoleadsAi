import { FiExternalLink, FiGlobe } from 'react-icons/fi';
import { sanitizeUrl, sanitizeString } from '../../utils/sanitizers';

interface LinkPreview {
  title: string;
  description: string;
  image: string | null;
  favicon: string | null;
  domain: string;
  siteName: string;
}

interface LinkPreviewCardProps {
  url: string;
  preview?: LinkPreview | null;
  loading?: boolean;
  className?: string;
}

const LinkPreviewCard = ({ url, preview, loading = false, className = '' }: LinkPreviewCardProps) => {
  const safeUrl = sanitizeUrl(url);

  if (loading) {
    return (
      <div className={`bg-white rounded-xl border border-[#E5E7EB] p-3 animate-pulse ${className}`}>
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-[#F3F4F6] rounded-lg shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-[#F3F4F6] rounded w-3/4" />
            <div className="h-2 bg-[#F3F4F6] rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!preview) {
    return (
      <a
        href={safeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 text-sm text-[#2563EB] hover:underline ${className}`}
      >
        <FiGlobe className="w-4 h-4" />
        {sanitizeString(new URL(safeUrl).hostname.replace('www.', ''))}
        <FiExternalLink className="w-3 h-3" />
      </a>
    );
  }

  return (
    <a
      href={safeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`block bg-white rounded-xl border border-[#E5E7EB] overflow-hidden hover:shadow-md hover:border-[#2563EB]/20 transition-all duration-200 group ${className}`}
    >
      {/* Image Preview */}
      {preview.image && (
        <div className="relative h-32 sm:h-40 overflow-hidden bg-[#F3F4F6]">
          <img
            src={preview.image}
            alt={sanitizeString(preview.title)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-3 sm:p-4">
        <div className="flex items-center gap-2 mb-1.5">
          {preview.favicon && (
            <img
              src={preview.favicon}
              alt=""
              className="w-4 h-4 rounded"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <span className="text-[10px] sm:text-xs text-[#9CA3AF] font-medium uppercase tracking-wider">
            {sanitizeString(preview.domain)}
          </span>
          {preview.siteName && (
            <span className="text-[10px] sm:text-xs text-[#9CA3AF]">
              · {sanitizeString(preview.siteName)}
            </span>
          )}
        </div>

        <h4 className="text-sm font-semibold text-[#111827] line-clamp-2 group-hover:text-[#2563EB] transition-colors mb-1">
          {sanitizeString(preview.title)}
        </h4>

        {preview.description && (
          <p className="text-xs text-[#6B7280] line-clamp-2">
            {sanitizeString(preview.description)}
          </p>
        )}

        <div className="flex items-center gap-1 mt-2 text-[10px] text-[#9CA3AF] group-hover:text-[#2563EB] transition-colors">
          <FiExternalLink className="w-3 h-3" />
          {safeUrl.length > 50 ? safeUrl.slice(0, 50) + '...' : safeUrl}
        </div>
      </div>
    </a>
  );
};

export default LinkPreviewCard;