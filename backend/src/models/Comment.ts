import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  blogId: mongoose.Types.ObjectId;
  author: string;
  comment: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
      required: [true, 'Blog ID is required'],
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
      maxlength: [100, 'Author name cannot exceed 100 characters'],
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      maxlength: [1000, 'Comment cannot exceed 1000 characters'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

CommentSchema.index({ blogId: 1, createdAt: -1 });

export default mongoose.model<IComment>('Comment', CommentSchema);
