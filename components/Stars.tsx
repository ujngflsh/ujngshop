import React from 'react';
import { Star } from 'lucide-react';

const Stars: React.FC<{ rating: number; size?: number }> = ({ rating, size = 14 }) => (
  <span className="inline-flex text-amber-500">
    {[0, 1, 2, 3, 4].map(i => (
      <Star key={i} size={size} fill={i < Math.round(rating) ? 'currentColor' : 'none'} className={i < Math.round(rating) ? '' : 'text-rose/50'} />
    ))}
  </span>
);

export default Stars;
