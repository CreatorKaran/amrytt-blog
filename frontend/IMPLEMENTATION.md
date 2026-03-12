# Next.js Blog Implementation

## Overview

A production-ready blog post page built with Next.js, featuring static generation, client-side rendering for comments, and Tailwind CSS styling. Fully integrated with Express.js backend API and MongoDB database.

## Features Implemented

### ✅ Core Requirements

1. **Static Site Generation (SSG)**
   - `getStaticProps()` for data fetching at build time from API
   - `getStaticPaths()` for dynamic route generation
   - Each blog post accessible via `/blog/[slug]`
   - ISR (Incremental Static Regeneration) with 60-second revalidation

2. **Client-Side Comments & Ratings**
   - Comments and ratings fetched client-side using `useEffect`
   - Combined display of comments and ratings as "Reviews"
   - Loading skeletons during fetch
   - Error handling with user-friendly messages
   - Real-time data from MongoDB via API

3. **Dynamic Component Loading**
   - Markdown editor loaded with `next/dynamic()`
   - Only loads when "Edit" button is clicked
   - Reduces initial bundle size

4. **Tailwind CSS Styling**
   - Utility-first CSS approach
   - Responsive design with Tailwind breakpoints
   - Custom animations and transitions
   - Consistent spacing and typography
   - Hover and focus states
   - Performance-optimized

### ✅ Backend Integration

- **RESTful API**: Full integration with Express.js backend
- **MongoDB**: All data persisted in MongoDB database
- **Auto-seeding**: Sample fitness blog data automatically loaded
- **Error Handling**: Graceful fallbacks for API failures
- **Type Safety**: TypeScript interfaces matching backend models

### ✅ Bonus Features

- **Loading Skeletons**: Animated skeleton screens for comments
- **Error Handling**: Graceful error states with retry options
- **Layout Component**: Consistent page structure across routes
- **Star Rating System**: Visual rating component with multiple sizes
- **Related Articles**: Contextual content recommendations
- **Sidebar**: Sticky sidebar with top guides
- **Accessibility**: Semantic HTML, focus states, proper contrast
- **Average Ratings**: Calculated and displayed from all ratings

## Project Structure

```
frontend/src/
├── components/
│   ├── Layout.tsx              # Consistent page wrapper
│   ├── CommentCard.tsx         # Individual comment/rating display
│   ├── CommentSkeleton.tsx     # Loading state
│   ├── StarRating.tsx          # Rating visualization
│   ├── RelatedArticles.tsx     # Content recommendations
│   └── MarkdownEditor.tsx      # Dynamic editor (lazy loaded)
├── pages/
│   ├── _app.tsx                # App wrapper
│   ├── _document.tsx           # HTML document
│   ├── index.tsx               # Home page with blog list (SSG)
│   └── blog/
│       └── [slug].tsx          # Dynamic blog post page (SSG + ISR)
├── lib/
│   ├── api.ts                  # API integration layer
│   └── mockData.ts             # Legacy mock data (not used)
├── types/
│   └── blog.ts                 # TypeScript interfaces
└── styles/
    └── globals.css             # Tailwind imports + custom animations
```

## Setup & Installation

### Prerequisites

- Node.js 18+ installed
- MongoDB running locally or connection string
- Backend API running on port 5100

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5100/api
```

### 3. Start Backend (Required)

```bash
cd ../backend
npm run dev
```

Backend must be running at `http://localhost:5100`

### 4. Start Frontend

```bash
npm run dev
```

Visit `http://localhost:3000`

## API Integration

### Endpoints Used

- `GET /api/blogs` - Fetch all blog posts
- `GET /api/blogs/:id` - Fetch single blog post
- `GET /api/comments/blog/:blogId` - Fetch comments
- `GET /api/ratings/blog/:blogId` - Fetch ratings with average

See [API_INTEGRATION.md](./API_INTEGRATION.md) for complete documentation.

## Data Flow

### Build Time (SSG)
1. Next.js calls `getAllBlogs()` from API
2. Generates static HTML for each blog post
3. Creates optimized pages for fast loading

### Runtime (Client-Side)
1. User visits blog post page
2. Static HTML loads instantly
3. Client fetches comments & ratings from API
4. Displays combined reviews with ratings

### Revalidation (ISR)
- Pages revalidate every 60 seconds
- New content appears without full rebuild
- Fallback: 'blocking' for new pages

## Key Features

### Slug Generation

Backend doesn't store slugs, so we generate them:

```typescript
generateSlug("The Ultimate Guide") 
// → "the-ultimate-guide"
```

### Combined Reviews

Comments and ratings are merged into single "Reviews" section:
- Comments (text only)
- Ratings (text + star rating)
- Sorted by date (newest first)
- Average rating displayed in header

### Error Handling

```typescript
try {
  const blogs = await getAllBlogs();
} catch (error) {
  // Fallback to empty array
  // Show error message to user
}
```

## Tailwind CSS Implementation

### Utility-First Approach

```tsx
<article className="bg-white border border-gray-200 rounded-xl p-6 
                    transition-shadow hover:shadow-md">
```

### Responsive Design

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

### Color Palette

- Primary: `blue-600` (#2563eb)
- Text: `gray-900`, `gray-600`, `gray-400`
- Borders: `gray-200`
- Backgrounds: `white`, `gray-50`
- Accent: `yellow-400` (stars)

## Performance Optimizations

1. **Static Generation**: Pre-rendered HTML for instant loading
2. **Code Splitting**: Dynamic imports for editor component
3. **ISR**: Fresh content without full rebuilds
4. **Image Optimization**: Proper aspect ratios and object-fit
5. **Tailwind Purging**: Unused CSS removed in production
6. **Loading States**: Skeleton screens prevent layout shift

## Running the Application

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Testing the Integration

1. **Start Backend**: `cd backend && npm run dev`
2. **Verify API**: Visit `http://localhost:5100/api-docs`
3. **Start Frontend**: `cd frontend && npm run dev`
4. **Test Pages**:
   - Home: `http://localhost:3000`
   - Blog: `http://localhost:3000/blog/the-ultimate-guide-to-full-body-workouts`

## Troubleshooting

### "Failed to fetch blogs"

- Check backend is running: `http://localhost:5100/health`
- Verify MongoDB is connected
- Check `.env.local` has correct API URL

### "Blog not found" (404)

- Verify blog exists in database
- Check slug generation matches
- Rebuild: `rm -rf .next && npm run build`

### Stale Data

- Clear cache: `rm -rf .next`
- Rebuild: `npm run build`
- Wait for revalidation (60 seconds)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Comment submission form
- [ ] Rating submission form
- [ ] User authentication
- [ ] Search functionality
- [ ] Category filtering
- [ ] Social sharing
- [ ] Dark mode toggle
- [ ] Pagination for comments/ratings
- [ ] Real-time updates with WebSockets
- [ ] Image upload for blog posts
- [ ] Rich text editor for content
- [ ] SEO optimization with meta tags
