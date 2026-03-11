import React from 'react';
import { Comment } from '@/types/blog';
import StarRating from './StarRating';

interface CommentCardProps {
  comment: Comment;
}

export default function CommentCard({ comment }: CommentCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <article className="comment-card">
      <div className="comment-card__header">
        <div className="comment-card__avatar">
          {comment.author.charAt(0).toUpperCase()}
        </div>
        <div className="comment-card__info">
          <h4 className="comment-card__author">{comment.author}</h4>
          <StarRating rating={comment.rating} size="small" />
        </div>
        <time className="comment-card__date">{formatDate(comment.createdAt)}</time>
      </div>
      <p className="comment-card__text">{comment.comment}</p>
    </article>
  );
}
