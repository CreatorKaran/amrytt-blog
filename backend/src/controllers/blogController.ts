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

// Helper function to generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const getBlogBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;

    // Get all blogs to find the one matching the slug
    const allBlogs = await Blog.find().sort({ date: -1 });
    
    // Find the blog that matches the slug
    const blog = allBlogs.find(b => generateSlug(b.title) === slug);

    if (!blog) {
      res.status(404).json({
        success: false,
        error: 'Blog not found',
      });
      return;
    }

    // Get current blog index for navigation
    const currentIndex = allBlogs.findIndex(b => b._id.toString() === blog._id.toString());
    
    // Get previous and next blog slugs with circular navigation
    let previousBlog: typeof allBlogs[0];
    let nextBlog: typeof allBlogs[0];
    
    if (allBlogs.length === 1) {
      // If there's only one blog, both previous and next point to the same blog
      previousBlog = allBlogs[0]!;
      nextBlog = allBlogs[0]!;
    } else {
      // Get previous and next blog slugs with circular navigation
      previousBlog = currentIndex < allBlogs.length - 1 
        ? allBlogs[currentIndex + 1]! 
        : allBlogs[0]!; // Loop to first blog if at the end
      
      nextBlog = currentIndex > 0 
        ? allBlogs[currentIndex - 1]! 
        : allBlogs[allBlogs.length - 1]!; // Loop to last blog if at the beginning
    }

    // Get related articles from the same category (excluding current blog)
    const relatedArticles = await Blog.find({
      _id: { $ne: blog._id },
      category: blog.category,
    })
      .sort({ date: -1 })
      .limit(4);

    // Get explore more articles from different categories (excluding current blog)
    const exploreMore = await Blog.find({
      _id: { $ne: blog._id },
      category: { $ne: blog.category },
    })
      .sort({ date: -1 })
      .limit(4);

    // Get unique authors for tour guides (excluding current blog author)
    const uniqueAuthors = await Blog.aggregate([
      {
        $match: {
          _id: { $ne: blog._id },
          'author.name': { $ne: blog.author.name }
        }
      },
      {
        $group: {
          _id: '$author.name',
          blog: { $first: '$$ROOT' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1, 'blog.date': -1 }
      },
      {
        $limit: 3
      },
      {
        $replaceRoot: { newRoot: '$blog' }
      }
    ]);

    const tourGuides = uniqueAuthors.length > 0 ? uniqueAuthors : await Blog.find({
      _id: { $ne: blog._id },
    })
      .sort({ date: -1 })
      .limit(3);

    res.status(200).json({
      success: true,
      data: {
        blog,
        relatedArticles,
        exploreMore,
        tourGuides,
        navigation: {
          previous: {
            slug: generateSlug(previousBlog.title),
            title: previousBlog.title
          },
          next: {
            slug: generateSlug(nextBlog.title),
            title: nextBlog.title
          }
        }
      },
    });
  } catch (error) {
    next(error);
  }
};
