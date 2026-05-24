import { FcGoogle } from 'react-icons/fc';

interface OAuthButtonsProps {
  loading?: boolean;
  onGoogleClick?: () => void;
}

const OAuthButtons = ({ loading = false, onGoogleClick }: OAuthButtonsProps) => {
  return (
    <button
      type="button"
      onClick={onGoogleClick}
      disabled={loading}
      className="w-full py-2.5 sm:py-3 bg-white border border-[#D1D5DB] rounded-xl text-sm sm:text-base font-medium text-[#374151] hover:bg-[#F9FAFB] transition-colors flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <svg className="animate-spin w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Connecting...
        </>
      ) : (
        <>
          <FcGoogle className="w-4 h-4 sm:w-5 sm:h-5" />
          Continue with Google
        </>
      )}
    </button>
  );
};

export default OAuthButtons;