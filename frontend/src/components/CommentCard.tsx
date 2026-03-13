import { Comment } from '@/types/blog';
import moment from 'moment';
import StarRating from './StarRating';
import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { updateComment, deleteComment } from '@/lib/api';

// Dynamically import CommentEditor
const CommentEditor = dynamic(() => import('./CommentEditor'), {
  ssr: false,
});

interface CommentCardProps {
  comment: Comment & { rating?: number };
  onCommentUpdate?: (updatedComment: Comment & { rating?: number }) => void;
  onCommentDelete?: (commentId: string) => void;
}

export default function CommentCard({ comment, onCommentUpdate, onCommentDelete }: CommentCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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
    setIsEditing(true);
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

  const handleSaveEdit = async (data: { author: string; comment: string; rating?: number }) => {
    try {
      const updatedComment = await updateComment(comment._id, data);
      onCommentUpdate?.({ ...updatedComment, rating: data.rating });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Failed to update comment. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <CommentEditor
        initialAuthor={comment.author}
        initialComment={comment.comment}
        initialRating={comment.rating}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
    );
  }

  return (
    <div key={comment._id} className="w-full hover:border hover:border-gray-200 p-2 transition-shadow hover:shadow-md group relative">
      <div className="flex gap-5 items-start w-full" onClick={handleEdit}>
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
      {/* {index < combinedComments.slice(0, 2).length - 1 && (
        <div className="w-full h-px bg-gray-200 mt-8"></div>
    )} */}
    </div>
  );

}
