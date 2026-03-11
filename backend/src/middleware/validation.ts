import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: errors.array(),
    });
    return;
  }
  next();
};

export const blogValidation = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters'),
  body('body').trim().notEmpty().withMessage('Body is required'),
  body('date').optional().isISO8601().withMessage('Invalid date format'),
  handleValidationErrors,
];

export const commentValidation = [
  body('author').trim().notEmpty().withMessage('Author is required').isLength({ max: 100 }).withMessage('Author name cannot exceed 100 characters'),
  body('comment').trim().notEmpty().withMessage('Comment is required').isLength({ max: 1000 }).withMessage('Comment cannot exceed 1000 characters'),
  handleValidationErrors,
];

export const ratingValidation = [
  body('author').trim().notEmpty().withMessage('Author is required').isLength({ max: 100 }).withMessage('Author name cannot exceed 100 characters'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('review').trim().notEmpty().withMessage('Review is required').isLength({ max: 500 }).withMessage('Review cannot exceed 500 characters'),
  handleValidationErrors,
];

export const idValidation = [
  param('id').isMongoId().withMessage('Invalid ID format'),
  handleValidationErrors,
];
