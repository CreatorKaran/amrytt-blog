import mongoose, { Schema, Document } from 'mongoose';

export interface IRating extends Document {
  blogId: mongoose.Types.ObjectId;
  author: string;
  rating: number;
  review: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const RatingSchema: Schema = new Schema(
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
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    review: {
      type: String,
      required: [true, 'Review is required'],
      maxlength: [500, 'Review cannot exceed 500 characters'],
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

RatingSchema.index({ blogId: 1, createdAt: -1 });

export default mongoose.model<IRating>('Rating', RatingSchema);
