import React from 'react';

interface Props { title: string; subtitle?: string; className?: string; align?: 'left' | 'center' }

const SectionHeader: React.FC<Props> = ({ title, subtitle, className = '', align = 'left' }) => (
  <div className={`mb-8 ${align === 'center' ? 'text-center' : ''} ${className}`}>
    <h2 className="font-serif text-2xl md:text-3xl font-semibold text-maroon-dark tracking-tight mb-1">{title}</h2>
    {subtitle && <p className={`text-sm text-cokelat/70 ${align === 'center' ? 'mx-auto' : ''} max-w-2xl`}>{subtitle}</p>}
  </div>
);

export default SectionHeader;
