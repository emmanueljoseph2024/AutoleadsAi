import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

interface CopyButtonProps {
  text: string;
  className?: string;
}

const CopyButton = ({ text, className = '' }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`
        p-1.5 rounded-lg transition-colors
        ${copied
          ? 'bg-[#DCFCE7] text-[#22C55E]'
          : 'text-[#9CA3AF] hover:text-[#2563EB] hover:bg-[#EFF6FF]'
        }
        ${className}
      `}
      title={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? <FiCheck className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
    </button>
  );
};

export default CopyButton;