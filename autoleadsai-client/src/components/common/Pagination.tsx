import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, total, limit, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-xs sm:text-sm text-[#6B7280]">
        Showing {start}–{end} of {total.toLocaleString()}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="p-2 text-[#6B7280] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <FiChevronLeft className="w-4 h-4" />
        </button>
        {getPageNumbers().map((p, i) =>
          typeof p === 'string' ? (
            <span key={`ellipsis-${i}`} className="px-2 text-[#9CA3AF]">...</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`
                w-8 h-8 rounded-lg text-sm font-medium transition-colors
                ${page === p
                  ? 'bg-[#2563EB] text-white'
                  : 'text-[#6B7280] hover:bg-[#F3F4F6]'
                }
              `}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="p-2 text-[#6B7280] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <FiChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;