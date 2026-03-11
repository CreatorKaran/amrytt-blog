import { Router } from 'express';
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController';
import { blogValidation, idValidation } from '../middleware/validation';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - body
 *         - excerpt
 *         - image
 *         - author
 *         - category
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated blog ID
 *         title:
 *           type: string
 *           maxLength: 200
 *           description: Blog title
 *         body:
 *           type: string
 *           description: Blog content
 *         excerpt:
 *           type: string
 *           maxLength: 500
 *           description: Short summary of the blog
 *         image:
 *           type: string
 *           description: Blog cover image URL
 *         author:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Author name
 *             avatar:
 *               type: string
 *               description: Author avatar URL
 *         category:
 *           type: string
 *           description: Blog category
 *         date:
 *           type: string
 *           format: date-time
 *           description: Blog publication date
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         _id: 507f1f77bcf86cd799439011
 *         title: The Ultimate Guide to Full-Body Workouts
 *         body: Full-body workouts are an excellent way to maximize your time...
 *         excerpt: Discover the most effective full-body workout routines...
 *         image: https://images.unsplash.com/photo-1534438327276-14e5300c3a48
 *         author:
 *           name: Alex Cooper
 *           avatar: https://i.pravatar.cc/150?img=12
 *         category: Fitness
 *         date: 2024-01-15T10:30:00.000Z
 */

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *               - excerpt
 *               - image
 *               - author
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *               excerpt:
 *                 type: string
 *               image:
 *                 type: string
 *               author:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   avatar:
 *                     type: string
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       400:
 *         description: Validation error
 */
router.post('/', blogValidation, createBlog);

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get all blog posts
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: List of all blogs
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
 *                     $ref: '#/components/schemas/Blog'
 */
router.get('/', getAllBlogs);

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Get a blog post by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog details
 *       404:
 *         description: Blog not found
 */
router.get('/:id', idValidation, getBlogById);

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update a blog post
 *     tags: [Blogs]
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
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *               excerpt:
 *                 type: string
 *               image:
 *                 type: string
 *               author:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   avatar:
 *                     type: string
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog not found
 */
router.put('/:id', idValidation, blogValidation, updateBlog);

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog post
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 */
router.delete('/:id', idValidation, deleteBlog);

export default router;
