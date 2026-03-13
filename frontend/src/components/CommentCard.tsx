import { Comment } from '@/types/blog';
import moment from 'moment';
import StarRating from './StarRating';
import { useState, useRef, useEffect } from 'react';
import { deleteComment } from '@/lib/api';
import CommentStarRating from './CommentStarRating';

interface CommentCardProps {
  comment: Comment & { rating?: number };
  onCommentUpdate?: (updatedComment: Comment & { rating?: number }) => void;
  onCommentDelete?: (commentId: string) => void;
  onCommentEdit?: (comment: Comment) => void;
}

export default function CommentCard({ comment, onCommentUpdate, onCommentDelete, onCommentEdit }: CommentCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string) => {
    return moment(dateString).format('MMMM DD, YYYY');
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEdit = () => {
    onCommentEdit?.(comment);
    setIsMenuOpen(false);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    setIsDeleting(true);
    try {
      await deleteComment(comment._id);
      onCommentDelete?.(comment._id);
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div key={comment._id} className="w-full" title='Click to Edit' onClick={handleEdit}>
      <div className="flex gap-5 items-start w-full">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.author)}&background=2563eb&color=fff`}
          alt={comment.author}
          className="w-[60px] h-[60px] rounded-full object-cover shrink-0"
        />
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          <div className="flex items-start justify-between w-full">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="text-black text-base leading-5 tracking-[1px]">
                {comment.author}
              </span>
              {comment.rating && (
                <div className="flex items-center gap-3">
                  <CommentStarRating rating={comment.rating} />
                  <span className="text-[#121212] text-[15px] leading-normal tracking-[0.5px]">
                    ({comment.rating}.0)
                  </span>
                </div>
              )}
            </div>
            <span className="text-[#757575] text-sm leading-normal tracking-[1px] whitespace-nowrap">
              {moment(comment.date).format('DD MMM YYYY')}
            </span>
          </div>
          <p className="text-[#10152e] text-base leading-6 tracking-[1px] opacity-80 w-full">
            {comment.comment}
          </p>
        </div>
      </div>
    </div>
  );
}
