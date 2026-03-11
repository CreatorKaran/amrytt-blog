import React from 'react';

interface StarRatingProps {
  rating: number;
  size?: 'small' | 'medium' | 'large';
}

export default function StarRating({ rating, size = 'medium' }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  
  return (
    <div className={`star-rating star-rating--${size}`}>
      {stars.map((star) => (
        <span
          key={star}
          className={`star-rating__star ${star <= rating ? 'star-rating__star--filled' : ''}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
