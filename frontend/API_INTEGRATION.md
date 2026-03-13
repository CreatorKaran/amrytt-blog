# Backend API Integration Guide

## Overview

The frontend is now fully integrated with the Express.js backend API. All blog data, comments, and ratings are fetched from the MongoDB database through RESTful API endpoints.

## API Endpoints Used

### Blogs
- `GET /api/blogs` - Fetch all blog posts
- `GET /api/blogs/:id` - Fetch a single blog post by ID
- `POST /api/blogs` - Create a new blog post (available but not used in current UI)
- `PUT /api/blogs/:id` - Update a blog post (available but not used in current UI)
- `DELETE /api/blogs/:id` - Delete a blog post (available but not used in current UI)

### Comments (with integrated ratings)
- `GET /api/comments/blog/:blogId` - Fetch all comments for a blog
- `POST /api/comments/blog/:blogId` - Create a comment (with optional rating)
- `PUT /api/comments/:id` - Update a comment (available but not used in current UI)
- `DELETE /api/comments/:id` - Delete a comment (available but not used in current UI)

## Configuration

### Environment Variables

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5100/api
```

For production, update this to your production API URL.

### Backend Requirements

The backend must be running for the frontend to work:

```bash
# In the backend directory
npm run dev
```

The backend runs on `http://localhost:5100` by default.

## Data Flow

### Static Site Generation (SSG)

1. **Build Time**: Next.js fetches all blogs from the API during `next build`
2. **Pages Generated**: Static HTML pages are created for each blog post
3. **Revalidation**: Pages are revalidated every 60 seconds (ISR - Incremental Static Regeneration)

### Client-Side Data Fetching

1. **Comments with Ratings**: Fetched client-side when the blog post page loads
2. **Real-time Updates**: Comments and ratings are always fresh
3. **Loading States**: Skeleton screens shown while fetching

## Key Changes from Mock Data

### Type Updates

```typescript
// API data structure
interface Blog {
  _id: string;  // MongoDB ObjectId
  title: string;
  excerpt: string;
  body: string;
  image: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  _id: string;
  blogId: string;
  author: string;
  email: string;
  comment: string;
  rating?: number;  // Optional 1-5 star rating
  date: string;
  createdAt: string;
  updatedAt: string;
}
```

### Slug Generation

Since the backend doesn't store slugs, we generate them from titles:

```typescript
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
```

### Comments with Integrated Ratings

The blog post page displays comments that can optionally include star ratings:

- Comments without ratings (text only)
- Comments with ratings (text + 1-5 stars)
- Sorted by creation date (newest first)
- All displayed in a unified interface

## API Client (`lib/api.ts`)

All API calls go through centralized functions:

```typescript
import { getAllBlogs, getBlogById, getCommentsByBlogId } from '@/lib/api';

// Usage in components
const blogs = await getAllBlogs();
const blog = await getBlogById(id);
const comments = await getCommentsByBlogId(blogId);
```

### Error Handling

All API functions include error handling:

```typescript
try {
  const blogs = await getAllBlogs();
} catch (error) {
  console.error('Failed to fetch blogs:', error);
  // Handle error appropriately
}
```

## Pages Integration

### Home Page (`pages/index.tsx`)

```typescript
export const getStaticProps: GetStaticProps = async () => {
  const blogs = await getAllBlogs();
  return {
    props: { blogs },
    revalidate: 60, // ISR - revalidate every 60 seconds
  };
};
```

### Blog Post Page (`pages/blog/[slug].tsx`)

```typescript
export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = await getAllBlogs();
  const paths = blogs.map((blog) => ({
    params: { slug: generateSlug(blog.title) },
  }));
  return {
    paths,
    fallback: 'blocking', // Generate new pages on-demand
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const blogs = await getAllBlogs();
  const blog = blogs.find((b) => generateSlug(b.title) === slug);
  
  if (!blog) {
    return { notFound: true };
  }
  
  return {
    props: { blog },
    revalidate: 60,
  };
};
```

## Testing the Integration

### 1. Start the Backend

```bash
cd backend
npm run dev
```

Verify it's running at `http://localhost:5100`

### 2. Seed the Database

The backend auto-seeds on startup, or manually:

```bash
cd backend
npm run seed
```

### 3. Start the Frontend

```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000`

### 4. Verify API Calls

Open browser DevTools > Network tab to see API requests:
- `/api/blogs` - Homepage and blog post pages
- `/api/comments/blog/:id` - Blog post page for comments

## Production Deployment

### Environment Variables

Set in your hosting platform (Vercel, Netlify, etc.):

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

### Build Process

```bash
npm run build
npm start
```

### CORS Configuration

Ensure your backend allows requests from your frontend domain:

```typescript
// backend/src/index.ts
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-domain.com']
}));
```

## Troubleshooting

### "Failed to fetch blogs"

1. Check backend is running: `http://localhost:5100/health`
2. Verify MongoDB is running
3. Check `.env.local` has correct API URL
4. Check browser console for CORS errors

### "Blog not found" (404)

1. Verify blog exists in database
2. Check slug generation matches
3. Try rebuilding: `npm run build`

### Stale Data

1. Clear Next.js cache: `rm -rf .next`
2. Rebuild: `npm run build`
3. Check revalidation is working (60 seconds)

## API Response Examples

### Get All Blogs

```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "The Ultimate Guide to Full-Body Workouts",
      "body": "...",
      "excerpt": "...",
      "image": "https://...",
      "author": {
        "name": "Alex Cooper",
        "avatar": "https://..."
      },
      "category": "Fitness",
      "date": "2024-01-15T00:00:00.000Z",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### Get Comments (with integrated ratings)

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "blogId": "507f1f77bcf86cd799439011",
      "author": "John Doe",
      "email": "john@example.com",
      "comment": "Great article! Really helped me understand proper form.",
      "rating": 5,
      "date": "2024-01-16T00:00:00.000Z",
      "createdAt": "2024-01-16T10:30:00.000Z",
      "updatedAt": "2024-01-16T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "blogId": "507f1f77bcf86cd799439011",
      "author": "Jane Smith",
      "email": "jane@example.com",
      "comment": "Very helpful information! Thanks for sharing.",
      "date": "2024-01-17T00:00:00.000Z",
      "createdAt": "2024-01-17T10:30:00.000Z",
      "updatedAt": "2024-01-17T10:30:00.000Z"
    }
  ]
}
```

## Next Steps

- [ ] Add comment submission form with rating option
- [ ] Add comment editing functionality
- [ ] Add comment deletion functionality
- [ ] Implement optimistic UI updates
- [ ] Add loading states for mutations
- [ ] Implement error boundaries
- [ ] Add retry logic for failed requests
- [ ] Implement caching strategy
- [ ] Add pagination for comments
- [ ] Calculate and display average ratings from comments
