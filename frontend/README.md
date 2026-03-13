# Fitness Blog Platform - Frontend

A modern, responsive fitness blog platform built with Next.js, featuring static site generation, client-side interactivity, and seamless backend integration.

## Features

- **Static Site Generation (SSG)**: Pre-rendered pages for optimal performance
- **Incremental Static Regeneration (ISR)**: Fresh content without full rebuilds
- **Client-Side Comments**: Real-time comment loading and display
- **Integrated Rating System**: Star ratings within comments
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Component-Based Architecture**: Reusable, maintainable components

## Tech Stack

- **Framework**: Next.js 16.1.6 (Pages Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Library**: React 19.2.3
- **Date Handling**: Moment.js 2.30.1
- **Markdown**: react-markdown with syntax highlighting

## Project Structure

```
frontend/src/
├── components/
│   ├── Layout.tsx              # Page wrapper with navigation
│   ├── Navigation.tsx          # Site navigation component
│   ├── CommentCard.tsx         # Individual comment/rating display
│   ├── CommentSkeleton.tsx     # Loading state component
│   ├── StarRating.tsx          # Rating visualization
│   ├── InteractiveStarRating.tsx # Interactive rating input
│   ├── CommentStarRating.tsx   # Comment-specific rating display
│   ├── RelatedArticles.tsx     # Content recommendations
│   ├── ExploreMore.tsx         # Additional content suggestions
│   ├── MarkdownEditor.tsx      # Dynamic editor (lazy loaded)
│   └── MarkdownRenderer.tsx    # Markdown content renderer
├── pages/
│   ├── _app.tsx                # App wrapper and global styles
│   ├── _document.tsx           # HTML document structure
│   ├── index.tsx               # Home page with blog list (SSG)
│   └── blog/
│       └── [slug].tsx          # Dynamic blog post pages (SSG + ISR)
├── lib/
│   ├── api.ts                  # Backend API integration
│   └── metadata.tsx           # SEO metadata utilities
├── types/
│   └── blog.ts                 # TypeScript interfaces
└── styles/
    └── globals.css             # Tailwind imports + custom styles
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend API running on port 5100
- MongoDB database (for backend)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5100/api
   ```

3. **Start the backend** (required)
   ```bash
   cd ../backend
   npm run dev
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server
npm run lint        # Run ESLint
```

## Key Features

### Static Site Generation
- Blog posts are pre-rendered at build time
- Fast loading with excellent SEO
- ISR updates content every 60 seconds

### Client-Side Interactivity
- Comments loaded dynamically
- Star ratings integrated with comments
- Loading skeletons for better UX

### Responsive Design
- Mobile-first approach
- Tailwind CSS utility classes
- Consistent spacing and typography

### Component Architecture
- Reusable UI components
- TypeScript interfaces
- Clean separation of concerns

## API Integration

The frontend integrates with the Express.js backend API:

- **Blogs**: Fetched during build time for SSG
- **Comments**: Loaded client-side with ratings
- **Error Handling**: Graceful fallbacks for API failures

### Key API Functions

```typescript
// Blog operations
getAllBlogs()           // Get all blog posts
getBlogById(id)         // Get single blog post

// Comment operations  
getCommentsByBlogId(id) // Get comments for a blog
createComment(data)     // Add new comment with optional rating
updateComment(id, data) // Update existing comment
deleteComment(id)       // Delete comment
```

## Routing

- **Home**: `/` - Blog listing page
- **Blog Post**: `/blog/[slug]` - Individual blog post pages
- **Dynamic Slugs**: Generated from blog titles

## Styling

### Tailwind CSS
- Utility-first CSS framework
- Custom color palette for fitness theme
- Responsive breakpoints
- Hover and focus states

### Color Scheme
- Primary: Blue (`blue-600`)
- Text: Gray shades (`gray-900`, `gray-600`)
- Accent: Yellow (`yellow-400`) for stars
- Backgrounds: White and light gray

## Performance Optimizations

1. **Static Generation**: Pre-rendered HTML
2. **Code Splitting**: Dynamic imports for heavy components
3. **Image Optimization**: Proper aspect ratios
4. **ISR**: Fresh content without full rebuilds
5. **Loading States**: Skeleton screens prevent layout shift

## Development Workflow

1. **Start Backend**: Ensure API is running on port 5100
2. **Start Frontend**: `npm run dev`
3. **Make Changes**: Files auto-reload on save
4. **Test**: Visit pages and check functionality
5. **Build**: `npm run build` for production

## Deployment

### Environment Variables
Set in your hosting platform:
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

### Build Process
```bash
npm run build
npm start
```

## Troubleshooting

### "Failed to fetch blogs"
- Check backend is running: `http://localhost:5100/health`
- Verify `.env.local` has correct API URL
- Check browser console for errors

### Stale Data
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build`
- Wait for ISR revalidation (60 seconds)

### Build Errors
- Check TypeScript errors: `npm run lint`
- Verify all imports are correct
- Ensure backend API is accessible

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the existing code style
2. Use TypeScript for all new code
3. Add proper error handling
4. Test on multiple screen sizes
5. Update documentation as needed

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
- [React](https://react.dev/learn)
