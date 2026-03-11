import { Router } from 'express';
import {
  createRating,
  getRatingsByBlogId,
  deleteRating,
} from '../controllers/ratingController';
import { validate, blogIdWithRatingSchema, blogIdSchema, idSchema } from '../middleware/validation';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Rating:
 *       type: object
 *       required:
 *         - blogId
 *         - author
 *         - rating
 *         - review
 *       properties:
 *         _id:
 *           type: string
 *         blogId:
 *           type: string
 *           description: Reference to blog post
 *         author:
 *           type: string
 *           maxLength: 100
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *         review:
 *           type: string
 *           maxLength: 500
 *         date:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         _id: 507f1f77bcf86cd799439013
 *         blogId: 507f1f77bcf86cd799439011
 *         author: Jane Smith
 *         rating: 5
 *         review: Excellent content and well written!
 *         date: 2024-01-15T10:30:00.000Z
 */

/**
 * @swagger
 * /api/ratings/blog/{blogId}:
 *   post:
 *     summary: Create a rating and review for a blog post
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - author
 *               - rating
 *               - review
 *             properties:
 *               author:
 *                 type: string
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               review:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rating created successfully
 *       404:
 *         description: Blog not found
 */
router.post('/blog/:blogId', validate(blogIdWithRatingSchema), createRating);

/**
 * @swagger
 * /api/ratings/blog/{blogId}:
 *   get:
 *     summary: Get all ratings for a blog post
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of ratings with average
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: number
 *                 averageRating:
 *                   type: number
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Rating'
 */
router.get('/blog/:blogId', validate(blogIdSchema), getRatingsByBlogId);

/**
 * @swagger
 * /api/ratings/{id}:
 *   delete:
 *     summary: Delete a rating
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rating deleted successfully
 *       404:
 *         description: Rating not found
 */
router.delete('/:id', validate(idSchema), deleteRating);

export default router;
