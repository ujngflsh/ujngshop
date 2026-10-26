import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', fullWidth = false, className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    primary: 'bg-maroon text-white hover:bg-maroon-dark shadow-md shadow-maroon/20',
    secondary: 'bg-blush text-maroon hover:bg-rose/40',
    outline: 'border border-maroon/30 text-maroon hover:bg-blush/50',
    ghost: 'text-cokelat hover:bg-blush/60',
  };
  const sizes = { sm: 'px-4 py-1.5 text-sm', md: 'px-6 py-2.5 text-sm', lg: 'px-8 py-3.5 text-base' };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
