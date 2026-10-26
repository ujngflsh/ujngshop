import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'accent' | 'sale';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', className = '' }) => {
  const variants = { neutral: 'bg-blush text-cokelat', accent: 'bg-maroon text-white', sale: 'bg-rose text-white' };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${variants[variant]} ${className}`}>{children}</span>;
};

export default Badge;
