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
    <div className="markdown-editor">
      <div className="markdown-editor__header">
        <h3 className="markdown-editor__title">Edit Content</h3>
      </div>
      <textarea
        className="markdown-editor__textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your content in Markdown..."
      />
      <div className="markdown-editor__actions">
        <button 
          className="markdown-editor__button markdown-editor__button--cancel"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          className="markdown-editor__button markdown-editor__button--save"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
