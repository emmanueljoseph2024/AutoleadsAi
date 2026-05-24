// src/components/messages/ToneSelector.tsx

interface ToneOption {
  value: string;
  label: string;
  emoji: string;
  description: string;
}

interface ToneSelectorProps {
  selected: string;
  onChange: (tone: string) => void;
  className?: string;
}

const tones: ToneOption[] = [
  { value: 'professional', label: 'Professional', emoji: '💼', description: 'Formal and business-appropriate' },
  { value: 'friendly', label: 'Friendly', emoji: '😊', description: 'Warm and approachable' },
  { value: 'casual', label: 'Casual', emoji: '👋', description: 'Relaxed and conversational' },
  { value: 'formal', label: 'Formal', emoji: '📝', description: 'Structured and respectful' },
  { value: 'direct', label: 'Direct', emoji: '🎯', description: 'Straight to the point' },
];

const ToneSelector = ({ selected, onChange, className = '' }: ToneSelectorProps) => {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 ${className}`}>
      {tones.map((tone) => (
        <button
          key={tone.value}
          onClick={() => onChange(tone.value)}
          className={`
            flex flex-col items-center gap-1 p-3 rounded-xl text-center transition-all
            ${selected === tone.value
              ? 'bg-[#EFF6FF] border border-[#2563EB]/30 ring-2 ring-[#2563EB]/20 scale-105'
              : 'bg-white border border-[#E5E7EB] hover:border-[#D1D5DB]'
            }
          `}
        >
          <span className="text-lg">{tone.emoji}</span>
          <span className={`text-xs font-semibold ${selected === tone.value ? 'text-[#2563EB]' : 'text-[#374151]'}`}>
            {tone.label}
          </span>
          <span className="text-[10px] text-[#9CA3AF] leading-tight hidden sm:block">
            {tone.description}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ToneSelector;