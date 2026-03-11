import { Request, Response, NextFunction } from 'express';
import Rating from '../models/Rating';
import Blog from '../models/Blog';

export const createRating = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { author, rating, review } = req.body;
    const blogId = req.params.blogId;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      res.status(404).json({
        success: false,
        error: 'Blog not found',
      });
      return;
    }

    const newRating = await Rating.create({
      blogId,
      author,
      rating,
      review,
    });

    res.status(201).json({
      success: true,
      data: newRating,
    });
  } catch (error) {
    next(error);
  }
};

export const getRatingsByBlogId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const ratings = await Rating.find({ blogId: req.params.blogId }).sort({ createdAt: -1 });

    const averageRating = ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
      : 0;

    res.status(200).json({
      success: true,
      count: ratings.length,
      averageRating: Math.round(averageRating * 10) / 10,
      data: ratings,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRating = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const rating = await Rating.findByIdAndDelete(req.params.id);

    if (!rating) {
      res.status(404).json({
        success: false,
        error: 'Rating not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Rating deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
