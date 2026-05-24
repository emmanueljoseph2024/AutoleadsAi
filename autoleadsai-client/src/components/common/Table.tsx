import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  loading?: boolean;
  emptyMessage?: string;
}

const Table = <T extends { _id?: string }>({
  columns,
  data,
  onRowClick,
  sortKey,
  sortDirection,
  onSort,
  loading = false,
  emptyMessage = 'No data found',
}: TableProps<T>) => {
  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-12 bg-[#F3F4F6] rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-[#6B7280]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#E5E7EB]">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`text-left pb-3 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider ${
                  col.sortable ? 'cursor-pointer hover:text-[#2563EB] select-none' : ''
                } ${col.className || ''}`}
                onClick={() => col.sortable && onSort?.(col.key)}
              >
                <div className="flex items-center gap-1">
                  {col.header}
                  {col.sortable && sortKey === col.key && (
                    sortDirection === 'asc' ? <FiChevronUp className="w-3.5 h-3.5" /> : <FiChevronDown className="w-3.5 h-3.5" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F3F4F6]">
          {data.map((item, index) => (
            <tr
              key={item._id || index}
              onClick={() => onRowClick?.(item)}
              className={`
                hover:bg-[#F9FAFB] transition-colors
                ${onRowClick ? 'cursor-pointer' : ''}
              `}
            >
              {columns.map((col) => (
                <td key={col.key} className={`py-3 text-sm ${col.className || ''}`}>
                  {col.render
                    ? col.render(item)
                    : (item as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;