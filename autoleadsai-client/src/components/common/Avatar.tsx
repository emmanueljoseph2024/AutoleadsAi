interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-8 h-8 text-xs',
  lg: 'w-10 h-10 text-sm',
  xl: 'w-14 h-14 text-lg',
};

const colors = [
  'from-[#2563EB] to-[#4F46E5]',
  'from-[#06B6D4] to-[#2563EB]',
  'from-[#22C55E] to-[#06B6D4]',
  'from-[#F59E0B] to-[#EF4444]',
  'from-[#8B5CF6] to-[#4F46E5]',
  'from-[#EF4444] to-[#F59E0B]',
];

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const Avatar = ({ src, name = '', size = 'md', className = '' }: AvatarProps) => {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizes[size]} rounded-xl object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`
        ${sizes[size]} rounded-xl flex items-center justify-center text-white font-bold
        bg-gradient-to-br ${getColor(name)}
        ${className}
      `}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;