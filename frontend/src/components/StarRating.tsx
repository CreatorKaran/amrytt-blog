import React from 'react';

interface StarRatingProps {
  rating: number;
  size?: 'small' | 'medium' | 'large';
}

export default function StarRating({ rating, size = 'medium' }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-2xl'
  };
  
  return (
    <div className={`flex gap-0.5 ${sizeClasses[size]}`}>
      {stars.map((star) => (
        <span
          key={star}
          className={`transition-colors ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
