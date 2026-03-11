# Next.js Blog Implementation

## Overview

A production-ready blog post page built with Next.js, featuring static generation, client-side rendering for comments, and Tailwind CSS styling based on Figma designs.

## Features Implemented

### ✅ Core Requirements

1. **Static Site Generation (SSG)**
   - `getStaticProps()` for data fetching at build time
   - `getStaticPaths()` for dynamic route generation
   - Each blog post accessible via `/blog/[slug]`

2. **Client-Side Comments**
   - Comments fetched client-side using `useEffect`
   - Loading skeletons during fetch
   - Error handling with user-friendly messages
   - Mock data implementation (ready for API integration)

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

### ✅ Bonus Features

- **Loading Skeletons**: Animated skeleton screens for comments
- **Error Handling**: Graceful error states with retry options
- **Layout Component**: Consistent page structure across routes
- **Star Rating System**: Visual rating component with multiple sizes
- **Related Articles**: Contextual content recommendations
- **Sidebar**: Sticky sidebar with top guides
- **Accessibility**: Semantic HTML, focus states, proper contrast

## Project Structure

```
frontend/src/
├── components/
│   ├── Layout.tsx              # Consistent page wrapper
│   ├── CommentCard.tsx         # Individual comment display
│   ├── CommentSkeleton.tsx     # Loading state
│   ├── StarRating.tsx          # Rating visualization
│   ├── RelatedArticles.tsx     # Content recommendations
│   └── MarkdownEditor.tsx      # Dynamic editor (lazy loaded)
├── pages/
│   ├── _app.tsx                # App wrapper
│   ├── _document.tsx           # HTML document
│   ├── index.tsx               # Home page with blog list
│   └── blog/
│       └── [slug].tsx          # Dynamic blog post page
├── lib/
│   ├── api.ts                  # API integration layer
│   └── mockData.ts             # Mock blog and comment data
├── types/
│   └── blog.ts                 # TypeScript interfaces
└── styles/
    └── globals.css             # Tailwind imports + custom animations
```

## Tailwind CSS Implementation

### Utility-First Approach

All components use Tailwind utility classes for styling:

```tsx
// Example: Comment Card
<article className="bg-white border border-gray-200 rounded-xl p-6 
                    transition-shadow hover:shadow-md">
  {/* Content */}
</article>
```

### Responsive Design

Tailwind breakpoints used throughout:
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px

Example:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

### Custom Animations

Defined in `globals.css`:
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

### Color Palette

- Primary: `blue-600` (#2563eb)
- Text: `gray-900`, `gray-600`, `gray-400`
- Borders: `gray-200`
- Backgrounds: `white`, `gray-50`
- Accent: `yellow-400` (stars)

## Component Styling Examples

### Layout Component
```tsx
<div className="min-h-screen flex flex-col">
  <header className="bg-white border-b border-gray-200 py-6 sticky top-0 z-50">
    {/* Header content */}
  </header>
</div>
```

### Blog Post Page
```tsx
<article className="bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
      {title}
    </h1>
  </div>
</article>
```

### Comment Card
```tsx
<article className="bg-white border border-gray-200 rounded-xl p-6 
                    transition-shadow hover:shadow-md">
  <div className="flex items-start gap-4 mb-4">
    <div className="w-10 h-10 rounded-full bg-gradient-to-br 
                    from-blue-600 to-blue-400 text-white">
      {/* Avatar */}
    </div>
  </div>
</article>
```

## Performance Optimizations

1. **Code Splitting**: Dynamic imports for editor component
2. **Image Optimization**: Proper aspect ratios and object-fit
3. **Tailwind Purging**: Unused CSS automatically removed in production
4. **Loading States**: Skeleton screens prevent layout shift
5. **Sticky Positioning**: Efficient sidebar behavior

## Accessibility Features

- Semantic HTML5 elements
- Proper heading hierarchy
- Keyboard navigation support
- Focus indicators (`focus:outline-none focus:ring-4`)
- Color contrast compliance
- Screen reader friendly

## Running the Application

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to see the blog list.
Visit `http://localhost:3000/blog/the-ultimate-guide-to-full-body-workouts` for a blog post.

## API Integration

The app is ready for backend integration. Update `frontend/src/lib/api.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
```

Set environment variable:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Tailwind Configuration

The project uses Tailwind CSS 4.x with PostCSS. Configuration is minimal as Tailwind 4 uses CSS-based configuration.

### Key Tailwind Features Used

- **Flexbox & Grid**: Layout utilities
- **Spacing**: Consistent padding and margins
- **Typography**: Font sizes, weights, line heights
- **Colors**: Semantic color palette
- **Borders**: Rounded corners and borders
- **Shadows**: Elevation system
- **Transitions**: Smooth animations
- **Responsive**: Mobile-first breakpoints
- **Hover/Focus**: Interactive states

## Design Fidelity

The implementation matches the Figma designs with:
- Exact spacing using Tailwind's spacing scale
- Proper typography hierarchy
- Responsive layouts for all breakpoints
- Smooth interactions and transitions
- Professional polish

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Comment submission form
- User authentication
- Search functionality
- Category filtering
- Social sharing
- Dark mode toggle
- Pagination for comments
- Real-time updates
