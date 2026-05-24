import { useState } from 'react';
import api from '../../services/api';

interface CheckoutButtonProps {
  priceId: string;
  planName: string;
  amount: number;
  currency: string;
  highlighted?: boolean;
}

const CheckoutButton = ({
  priceId,
  planName,
  amount,
  currency,
  highlighted = false,
}: CheckoutButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/billing/checkout', {
        priceId,
        successUrl: `${window.location.origin}/dashboard?upgraded=true`,
      });

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (err) {
      console.error('Checkout failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`
        w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2
        ${highlighted
          ? 'bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-white hover:shadow-lg hover:shadow-blue-500/25'
          : 'bg-white border border-[#D1D5DB] text-[#374151] hover:bg-[#F9FAFB]'
        }
      `}
    >
      {loading ? (
        <>
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Redirecting...
        </>
      ) : (
        `Get ${planName}`
      )}
    </button>
  );
};

export default CheckoutButton;