import { Request, Response, NextFunction } from 'express';
import Blog from '../models/Blog';

export const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, body, excerpt, image, author, category, date } = req.body;

    const blog = await Blog.create({
      title,
      body,
      excerpt,
      image,
      author,
      category,
      date: date || new Date(),
    });

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    console.log('blogs...', blogs)
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      res.status(404).json({
        success: false,
        error: 'Blog not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!blog) {
      res.status(404).json({
        success: false,
        error: 'Blog not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      res.status(404).json({
        success: false,
        error: 'Blog not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getRelatedArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const limit = parseInt(req.query.limit as string) || 4;

    // Get the current blog to find its category
    const currentBlog = await Blog.findById(id);
    
    if (!currentBlog) {
      res.status(404).json({
        success: false,
        error: 'Blog not found',
      });
      return;
    }

    // Find related articles from the same category, excluding current blog
    const relatedArticles = await Blog.find({
      _id: { $ne: id },
      category: currentBlog.category,
    })
      .sort({ date: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      count: relatedArticles.length,
      data: relatedArticles,
    });
  } catch (error) {
    next(error);
  }
};

export const getExploreMore = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const limit = parseInt(req.query.limit as string) || 4;

    // Get the current blog to exclude it and its category
    const currentBlog = await Blog.findById(id);
    
    if (!currentBlog) {
      res.status(404).json({
        success: false,
        error: 'Blog not found',
      });
      return;
    }

    // Find articles from different categories, excluding current blog
    const exploreMore = await Blog.find({
      _id: { $ne: id },
      category: { $ne: currentBlog.category },
    })
      .sort({ date: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      count: exploreMore.length,
      data: exploreMore,
    });
  } catch (error) {
    next(error);
  }
};

export const getTopGuides = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const limit = parseInt(req.query.limit as string) || 3;

    // Get top guides (most recent articles excluding current blog)
    // In a real app, this could be based on views, likes, or featured status
    const topGuides = await Blog.find({
      _id: { $ne: id },
    })
      .sort({ date: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      count: topGuides.length,
      data: topGuides,
    });
  } catch (error) {
    next(error);
  }
};
