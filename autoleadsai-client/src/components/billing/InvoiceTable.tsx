import { FiDownload, FiEye } from 'react-icons/fi';

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  currency: string;
  status: 'paid' | 'open' | 'void';
  pdfUrl?: string;
}

interface InvoiceTableProps {
  invoices: Invoice[];
  loading?: boolean;
}

const InvoiceTable = ({ invoices, loading = false }: InvoiceTableProps) => {
  const statusStyles = {
    paid: 'bg-[#DCFCE7] text-[#22C55E]',
    open: 'bg-[#FEF3C7] text-[#F59E0B]',
    void: 'bg-[#F3F4F6] text-[#9CA3AF]',
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-[#F3F4F6] rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-14 h-14 bg-[#F3F4F6] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FiEye className="w-6 h-6 text-[#9CA3AF]" />
        </div>
        <p className="text-sm text-[#6B7280]">No invoices yet</p>
        <p className="text-xs text-[#9CA3AF] mt-1">Invoices will appear here once your subscription is active</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#E5E7EB]">
            <th className="text-left pb-3 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">Invoice</th>
            <th className="text-left pb-3 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">Date</th>
            <th className="text-left pb-3 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">Amount</th>
            <th className="text-left pb-3 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">Status</th>
            <th className="text-right pb-3 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F3F4F6]">
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="hover:bg-[#F9FAFB] transition-colors">
              <td className="py-3 text-sm font-medium text-[#111827]">{invoice.invoiceNumber}</td>
              <td className="py-3 text-sm text-[#6B7280]">
                {new Date(invoice.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </td>
              <td className="py-3 text-sm text-[#374151] font-medium">
                ${invoice.amount.toFixed(2)} {invoice.currency}
              </td>
              <td className="py-3">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusStyles[invoice.status]}`}>
                  {invoice.status}
                </span>
              </td>
              <td className="py-3">
                <div className="flex items-center justify-end gap-1">
                  {invoice.pdfUrl && (
                    <a
                      href={invoice.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-[#6B7280] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-lg transition-colors"
                      title="Download PDF"
                    >
                      <FiDownload className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;