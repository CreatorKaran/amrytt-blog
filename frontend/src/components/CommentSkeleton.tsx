import React from 'react';

export default function CommentSkeleton() {
  return (
    <div className="comment-skeleton">
      <div className="comment-skeleton__header">
        <div className="comment-skeleton__avatar skeleton-pulse"></div>
        <div className="comment-skeleton__info">
          <div className="comment-skeleton__name skeleton-pulse"></div>
          <div className="comment-skeleton__rating skeleton-pulse"></div>
        </div>
      </div>
      <div className="comment-skeleton__text skeleton-pulse"></div>
      <div className="comment-skeleton__text skeleton-pulse"></div>
    </div>
  );
}
