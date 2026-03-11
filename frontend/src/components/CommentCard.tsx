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
    <article className="bg-white border border-gray-200 rounded-xl p-6 transition-shadow hover:shadow-md">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-white flex items-center justify-center font-semibold text-base flex-shrink-0">
          {comment.author.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <h4 className="font-semibold text-[15px] text-gray-900">{comment.author}</h4>
          <StarRating rating={comment.rating} size="small" />
        </div>
        <time className="text-[13px] text-gray-400 ml-auto">{formatDate(comment.createdAt)}</time>
      </div>
      <p className="text-gray-600 leading-relaxed text-[15px]">{comment.comment}</p>
    </article>
  );
}
