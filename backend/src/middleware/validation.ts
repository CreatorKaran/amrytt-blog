import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

// Middleware to validate request using Joi schema
export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(
      { body: req.body, params: req.params, query: req.query },
      { abortEarly: false, stripUnknown: true }
    );

    if (error) {
      const errors = error.details.map((detail: Joi.ValidationErrorItem) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
      return;
    }

    next();
  };
};

// Blog validation schema
export const blogSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().trim().max(200).required().messages({
      'string.empty': 'Title is required',
      'string.max': 'Title cannot exceed 200 characters',
      'any.required': 'Title is required',
    }),
    body: Joi.string().trim().required().messages({
      'string.empty': 'Body is required',
      'any.required': 'Body is required',
    }),
    excerpt: Joi.string().trim().max(500).required().messages({
      'string.empty': 'Excerpt is required',
      'string.max': 'Excerpt cannot exceed 500 characters',
      'any.required': 'Excerpt is required',
    }),
    image: Joi.string().trim().required().messages({
      'string.empty': 'Image URL is required',
      'any.required': 'Image URL is required',
    }),
    author: Joi.object({
      name: Joi.string().trim().required().messages({
        'string.empty': 'Author name is required',
        'any.required': 'Author name is required',
      }),
      avatar: Joi.string().trim().optional().allow(''),
    }).required(),
    category: Joi.string().trim().required().messages({
      'string.empty': 'Category is required',
      'any.required': 'Category is required',
    }),
    date: Joi.date().iso().optional().messages({
      'date.format': 'Invalid date format',
    }),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});

// Comment validation schema (now includes optional rating)
export const commentSchema = Joi.object({
  body: Joi.object({
    author: Joi.string().trim().max(100).required().messages({
      'string.empty': 'Author is required',
      'string.max': 'Author name cannot exceed 100 characters',
      'any.required': 'Author is required',
    }),
    comment: Joi.string().trim().max(1000).required().messages({
      'string.empty': 'Comment is required',
      'string.max': 'Comment cannot exceed 1000 characters',
      'any.required': 'Comment is required',
    }),
    rating: Joi.number().integer().min(1).max(5).optional().messages({
      'number.base': 'Rating must be a number',
      'number.min': 'Rating must be between 1 and 5',
      'number.max': 'Rating must be between 1 and 5',
    }),
  }).required(),
  params: Joi.object().optional(),
  query: Joi.object().optional(),
});

// ID validation schema (for MongoDB ObjectId)
export const idSchema = Joi.object({
  body: Joi.object().optional(),
  params: Joi.object({
    id: Joi.string().hex().length(24).required().messages({
      'string.hex': 'Invalid ID format',
      'string.length': 'Invalid ID format',
      'any.required': 'ID is required',
    }),
  }).required(),
  query: Joi.object().optional(),
});

// Blog ID validation schema (for routes with blogId param)
export const blogIdSchema = Joi.object({
  body: Joi.object().optional(),
  params: Joi.object({
    blogId: Joi.string().hex().length(24).required().messages({
      'string.hex': 'Invalid blog ID format',
      'string.length': 'Invalid blog ID format',
      'any.required': 'Blog ID is required',
    }),
  }).required(),
  query: Joi.object().optional(),
});

// Combined validation for routes with both blogId param and comment body (now includes optional rating)
export const blogIdWithCommentSchema = Joi.object({
  body: Joi.object({
    author: Joi.string().trim().max(100).required().messages({
      'string.empty': 'Author is required',
      'string.max': 'Author name cannot exceed 100 characters',
      'any.required': 'Author is required',
    }),
    comment: Joi.string().trim().max(1000).required().messages({
      'string.empty': 'Comment is required',
      'string.max': 'Comment cannot exceed 1000 characters',
      'any.required': 'Comment is required',
    }),
    rating: Joi.number().integer().min(1).max(5).optional().messages({
      'number.base': 'Rating must be a number',
      'number.min': 'Rating must be between 1 and 5',
      'number.max': 'Rating must be between 1 and 5',
    }),
  }).required(),
  params: Joi.object({
    blogId: Joi.string().hex().length(24).required().messages({
      'string.hex': 'Invalid blog ID format',
      'string.length': 'Invalid blog ID format',
      'any.required': 'Blog ID is required',
    }),
  }).required(),
  query: Joi.object().optional(),
});
