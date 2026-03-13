import mongoose, { Schema, Document } from 'mongoose';
import { generateSlug } from '../utils/common';

export interface IBlog extends Document {
  title: string;
  slug: string;
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
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: [200, 'Slug cannot exceed 200 characters'],
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

// Pre-save middleware to generate slug from title
BlogSchema.pre('save', function(next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = generateSlug(this.title as string);
  }
  next();
});

export default mongoose.model<IBlog>('Blog', BlogSchema);
