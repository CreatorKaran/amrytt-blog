import React, { useState } from 'react';
import InteractiveStarRating from './InteractiveStarRating';

interface CommentEditorProps {
  initialAuthor: string;
  initialComment: string;
  initialRating?: number;
  onSave: (data: { author: string; comment: string; rating?: number }) => void;
  onCancel: () => void;
}

export default function CommentEditor({ 
  initialAuthor, 
  initialComment, 
  initialRating, 
  onSave, 
  onCancel 
}: CommentEditorProps) {
  const [author, setAuthor] = useState(initialAuthor);
  const [comment, setComment] = useState(initialComment);
  const [rating, setRating] = useState(initialRating || 0);

  const handleSave = () => {
    if (!author.trim() || !comment.trim()) return;
    onSave({ 
      author: author.trim(), 
      comment: comment.trim(), 
      rating: rating > 0 ? rating : undefined 
    });
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            placeholder="Your name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating (optional)
          </label>
          <InteractiveStarRating
            rating={rating}
            onRatingChange={setRating}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comment
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full min-h-[120px] px-3 py-2 border border-gray-200 rounded-lg resize-y focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            placeholder="Share your thoughts..."
          />
        </div>
      </div>
      
      <div className="flex gap-3 mt-6 justify-end">
        <button 
          className="px-6 py-2 rounded-lg font-medium text-sm bg-white border border-gray-200 text-gray-600 transition-all hover:bg-gray-50 hover:border-gray-600"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          className="px-6 py-2 rounded-lg font-medium text-sm bg-blue-600 text-white transition-all hover:bg-blue-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSave}
          disabled={!author.trim() || !comment.trim()}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}