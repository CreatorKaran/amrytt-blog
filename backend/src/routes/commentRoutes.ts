import { Router } from 'express';
import {
  createComment,
  getCommentsByBlogId,
  updateComment,
  deleteComment,
} from '../controllers/commentController';
import { validate, blogIdWithCommentSchema, blogIdSchema, idSchema } from '../middleware/validation';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - blogId
 *         - author
 *         - comment
 *       properties:
 *         _id:
 *           type: string
 *         blogId:
 *           type: string
 *           description: Reference to blog post
 *         author:
 *           type: string
 *           maxLength: 100
 *         comment:
 *           type: string
 *           maxLength: 1000
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           description: Optional rating (1-5 stars)
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
 *         _id: 507f1f77bcf86cd799439012
 *         blogId: 507f1f77bcf86cd799439011
 *         author: John Doe
 *         comment: Great article!
 *         rating: 5
 *         date: 2024-01-15T10:30:00.000Z
 */

/**
 * @swagger
 * /api/comments/blog/{blogId}:
 *   post:
 *     summary: Create a comment for a blog post
 *     tags: [Comments]
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
 *               - comment
 *             properties:
 *               author:
 *                 type: string
 *               comment:
 *                 type: string
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Optional rating (1-5 stars)
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       404:
 *         description: Blog not found
 */
router.post('/blog/:blogId', validate(blogIdWithCommentSchema), createComment);

/**
 * @swagger
 * /api/comments/blog/{blogId}:
 *   get:
 *     summary: Get all comments for a blog post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: number
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 */
router.get('/blog/:blogId', validate(blogIdSchema), getCommentsByBlogId);

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - author
 *               - comment
 *             properties:
 *               author:
 *                 type: string
 *               comment:
 *                 type: string
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Optional rating (1-5 stars)
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       404:
 *         description: Comment not found
 */
router.put('/:id', validate(blogIdWithCommentSchema), updateComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */
router.delete('/:id', validate(idSchema), deleteComment);

export default router;
