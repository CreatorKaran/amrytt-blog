import { Request, Response, NextFunction } from 'express';
import Comment from '../models/Comment';
import Blog from '../models/Blog';

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { author, email, comment, rating } = req.body;
    const blogId = req.params.blogId;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      res.status(404).json({
        success: false,
        error: 'Blog not found',
      });
      return;
    }

    const newComment = await Comment.create({
      blogId,
      author,
      email,
      comment,
      rating: rating || null,
    });

    res.status(201).json({
      success: true,
      data: newComment,
    });
  } catch (error) {
    next(error);
  }
};

export const getCommentsByBlogId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) {
      res.status(404).json({
        success: false,
        error: 'Comment not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
export const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { comment, rating } = req.body;
    const commentId = req.params.id;

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        comment,
        rating: rating || null,
      },
      { new: true }
    );

    if (!updatedComment) {
      res.status(404).json({
        success: false,
        error: 'Comment not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: updatedComment,
    });
  } catch (error) {
    next(error);
  }
};

