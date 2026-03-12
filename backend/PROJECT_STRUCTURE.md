# Project Structure

```
backend/
├── src/
│   ├── config/              # Configuration files
│   │   ├── database.ts      # MongoDB connection setup
│   │   ├── seed.ts          # Auto-seeding logic
│   │   ├── seedData.ts      # Sample blog data (6 posts)
│   │   └── swagger.ts       # Swagger/OpenAPI configuration
│   │
│   ├── controllers/         # Business logic
│   │   ├── blogController.ts      # Blog CRUD operations
│   │   ├── commentController.ts   # Comment operations
│   │   └── ratingController.ts    # Rating operations
│   │
│   ├── middleware/          # Express middleware
│   │   ├── errorHandler.ts        # Global error handling
│   │   └── validation.ts          # Request validation rules
│   │
│   ├── models/              # MongoDB schemas
│   │   ├── Blog.ts          # Blog model with author, image, category
│   │   ├── Comment.ts       # Comment model
│   │   └── Rating.ts        # Rating model
│   │
│   ├── routes/              # API endpoints
│   │   ├── blogRoutes.ts    # Blog endpoints + Swagger docs
│   │   ├── commentRoutes.ts # Comment endpoints + Swagger docs
│   │   └── ratingRoutes.ts  # Rating endpoints + Swagger docs
│   │
│   ├── scripts/             # Utility scripts
│   │   └── manualSeed.ts    # Manual database seeding
│   │
│   └── index.ts             # Application entry point
│
├── dist/                    # Compiled JavaScript (generated)
├── node_modules/            # Dependencies (generated)
│
├── .env                     # Environment variables (create from .env.example)
├── .env.example             # Environment template
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
│
└── Documentation/
    ├── README.md           # Main documentation
    ├── QUICKSTART.md       # 5-minute setup guide
    ├── SEEDING.md          # Database seeding guide
    ├── SETUP.md            # Detailed setup instructions
    └── PROJECT_STRUCTURE.md # This file
```

## Module Organization

### 📦 Blogs Module
- **Model**: `models/Blog.ts`
- **Controller**: `controllers/blogController.ts`
- **Routes**: `routes/blogRoutes.ts`
- **Features**: CRUD operations, auto-seeding, image support, author info

### 💬 Comments Module
- **Model**: `models/Comment.ts`
- **Controller**: `controllers/commentController.ts`
- **Routes**: `routes/commentRoutes.ts`
- **Features**: Add/fetch/delete comments per blog

### ⭐ Ratings Module
- **Model**: `models/Rating.ts`
- **Controller**: `controllers/ratingController.ts`
- **Routes**: `routes/ratingRoutes.ts`
- **Features**: Star ratings (1-5), reviews, average calculation

## Shared Components

### 🔧 Configuration (`config/`)
- Database connection
- Swagger documentation setup
- Seeding logic and data

### 🛡️ Middleware (`middleware/`)
- Input validation (express-validator)
- Error handling
- Request sanitization

## Data Flow

```
Request → Routes → Validation → Controller → Model → Database
                                    ↓
Response ← Routes ← Controller ← Model ← Database
```

## Key Files Explained

### `src/index.ts`
- Express app setup
- Middleware configuration
- Route mounting
- Database connection
- Auto-seeding trigger
- Server startup

### `src/config/seedData.ts`
- 6 comprehensive blog posts
- Covers: Fitness, Cardio, Nutrition, Yoga, Running
- Includes: title, body, excerpt, image, author, category
- Ready-to-use sample data

### `src/config/seed.ts`
- Checks if database is empty
- Seeds data automatically on first run
- Prevents duplicate seeding

### `src/scripts/manualSeed.ts`
- Standalone seeding script
- Clears existing data
- Inserts fresh sample data
- Run with: `npm run seed`

## API Endpoints Summary

### Blogs
```
POST   /api/blogs           Create blog
GET    /api/blogs           Get all blogs
GET    /api/blogs/:id       Get single blog
PUT    /api/blogs/:id       Update blog
DELETE /api/blogs/:id       Delete blog
```

### Comments
```
POST   /api/comments/blog/:blogId    Add comment
GET    /api/comments/blog/:blogId    Get comments
DELETE /api/comments/:id             Delete comment
```

### Ratings
```
POST   /api/ratings/blog/:blogId     Add rating
GET    /api/ratings/blog/:blogId     Get ratings + average
DELETE /api/ratings/:id              Delete rating
```

### Documentation
```
GET    /api-docs            Swagger UI
GET    /health              Health check
```

## Database Schema

### Collections
- `blogs` - Blog posts
- `comments` - Blog comments
- `ratings` - Blog ratings/reviews

### Indexes
- `comments`: Compound index on (blogId, createdAt)
- `ratings`: Compound index on (blogId, createdAt)

## Environment Variables

```env
PORT=5100                                    # Server port
MONGODB_URI=mongodb://localhost:27017/blog-api  # Database connection
NODE_ENV=development                         # Environment
```

## NPM Scripts

```json
{
  "dev": "nodemon src/index.ts",      // Development with auto-reload
  "build": "tsc",                     // Compile TypeScript
  "start": "node dist/index.js",      // Run production build
  "seed": "ts-node src/scripts/manualSeed.ts"  // Manual seeding
}
```

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **ODM**: Mongoose
- **Validation**: express-validator
- **Documentation**: Swagger (OpenAPI 3.0)
- **Dev Tools**: nodemon, ts-node

## Design Patterns

### MVC Architecture
- **Models**: Data structure and database interaction
- **Controllers**: Business logic
- **Routes**: API endpoints and request handling

### Middleware Pattern
- Validation middleware
- Error handling middleware
- CORS middleware

### Repository Pattern
- Mongoose models act as repositories
- Abstraction over database operations

## Best Practices Implemented

✅ Modular code organization
✅ Separation of concerns
✅ Input validation
✅ Error handling
✅ Type safety (TypeScript)
✅ API documentation (Swagger)
✅ Environment configuration
✅ Database indexing
✅ RESTful API design
✅ CORS support
✅ Auto-seeding for development

## Development Workflow

1. **Setup**: Install dependencies, configure environment
2. **Development**: Use `npm run dev` for auto-reload
3. **Testing**: Use Swagger UI at `/api-docs`
4. **Seeding**: Auto-seeds on first run, or use `npm run seed`
5. **Building**: Run `npm run build` for production
6. **Deployment**: Use `npm start` to run compiled code

## File Naming Conventions

- **Models**: PascalCase (Blog.ts, Comment.ts)
- **Controllers**: camelCase + Controller (blogController.ts)
- **Routes**: camelCase + Routes (blogRoutes.ts)
- **Config**: camelCase (database.ts, swagger.ts)
- **Scripts**: camelCase (manualSeed.ts)

## Import/Export Pattern

```typescript
// Named exports for utilities
export const functionName = () => {};

// Default exports for main entities
export default ModelName;
```

## Error Handling Strategy

1. Try-catch in async controllers
2. Pass errors to next() middleware
3. Global error handler catches all
4. Consistent error response format
5. Stack traces in development only
