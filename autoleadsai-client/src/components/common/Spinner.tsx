interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-3',
  lg: 'w-12 h-12 border-4',
};

const Spinner = ({ size = 'md', className = '' }: SpinnerProps) => {
  return (
    <div
      className={`
        rounded-full border-[#E5E7EB] border-t-[#2563EB] animate-spin
        ${sizes[size]}
        ${className}
      `}
    />
  );
};

export default Spinner;