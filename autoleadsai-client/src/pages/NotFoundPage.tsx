import { Link } from 'react-router-dom';
import { FiHome, FiSearch } from 'react-icons/fi';
import Button from '../components/common/Button';
import AutoleadsAiLogo from '../assets/AutoleadsAiLogo.svg';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F9FAFB]">
      <div className="text-center max-w-md animate-slide-up">
        <div className="w-20 h-20 bg-gradient-to-br from-[#2563EB] to-[#4F46E5] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
          <img src={AutoleadsAiLogo} alt="AutoLeads AI" className="w-10 h-10" />
        </div>

        <h1 className="text-6xl sm:text-8xl font-bold text-[#111827] mb-4">404</h1>
        <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-3">Page Not Found</h2>
        <p className="text-sm sm:text-base text-[#6B7280] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button icon={<FiHome className="w-4 h-4" />} className="w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button
              variant="outline"
              icon={<FiSearch className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;