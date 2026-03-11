import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  body: string;
  excerpt: string;
  image: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    body: {
      type: String,
      required: [true, 'Body is required'],
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      maxlength: [500, 'Excerpt cannot exceed 500 characters'],
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    author: {
      name: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true,
      },
      avatar: {
        type: String,
        default: '',
      },
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
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

export default mongoose.model<IBlog>('Blog', BlogSchema);
