import React, { useState } from 'react';

interface MarkdownEditorProps {
  initialContent: string;
  onSave: (content: string) => void;
  onCancel: () => void;
}

export default function MarkdownEditor({ initialContent, onSave, onCancel }: MarkdownEditorProps) {
  const [content, setContent] = useState(initialContent);

  const handleSave = () => {
    onSave(content);
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-8">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Edit Content</h3>
      </div>
      <textarea
        className="w-full min-h-[300px] p-4 border border-gray-200 rounded-lg font-mono text-sm leading-relaxed resize-y bg-white transition-all focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your content in Markdown..."
      />
      <div className="flex gap-4 mt-6 justify-end">
        <button 
          className="px-8 py-3 rounded-lg font-semibold text-sm bg-white border border-gray-200 text-gray-600 transition-all hover:bg-gray-50 hover:border-gray-600"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          className="px-8 py-3 rounded-lg font-semibold text-sm bg-blue-600 text-white transition-all hover:bg-blue-700 hover:shadow-md"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
