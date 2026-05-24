import { FiX, FiZap } from 'react-icons/fi';

interface WelcomeBannerProps {
  userName?: string;
  hotLeadsCount: number;
  onDismiss: () => void;
  isVisible: boolean;
}

const WelcomeBanner = ({ userName, hotLeadsCount, onDismiss, isVisible }: WelcomeBannerProps) => {
  if (!isVisible) return null;

  return (
    <div className="bg-linear-to-r from-[#EFF6FF] to-[#EEF2FF] border border-[#2563EB]/10 rounded-2xl p-4 sm:p-6 relative animate-slide-up">
      <button
        onClick={onDismiss}
        className="absolute top-3 right-3 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
        aria-label="Dismiss welcome banner"
      >
        <FiX className="w-4 h-4" />
      </button>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-[#2563EB] to-[#4F46E5] rounded-2xl flex items-center justify-center shrink-0">
          <FiZap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#111827]">
            Welcome back{userName ? `, ${userName}` : ''}! 👋
          </h2>
          <p className="text-sm text-[#6B7280] mt-1">
            You have{' '}
            <span className="font-semibold text-[#2563EB]">{hotLeadsCount} hot leads</span>{' '}
            ready to convert. Run a scan to discover more opportunities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
