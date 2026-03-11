# Blog API - Backend

A comprehensive RESTful API for managing blog posts, comments, and ratings built with Node.js, Express, TypeScript, and MongoDB.

## Features

- **Blog Management**: Create, read, update, and delete blog posts
- **Comments System**: Add and retrieve comments for blog posts
- **Rating & Review System**: Submit star ratings (1-5) and reviews for posts
- **Swagger Documentation**: Interactive API documentation at `/api-docs`
- **Input Validation**: Request validation using express-validator
- **Error Handling**: Centralized error handling middleware
- **TypeScript**: Full type safety throughout the application
- **Modular Architecture**: Clean separation of concerns (models, controllers, routes)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Validation**: express-validator
- **Documentation**: Swagger (OpenAPI 3.0)
- **Dev Tools**: nodemon, ts-node

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts       # MongoDB connection
│   │   └── swagger.ts         # Swagger configuration
│   ├── controllers/
│   │   ├── blogController.ts
│   │   ├── commentController.ts
│   │   └── ratingController.ts
│   ├── middleware/
│   │   ├── errorHandler.ts   # Global error handler
│   │   └── validation.ts     # Request validators
│   ├── models/
│   │   ├── Blog.ts
│   │   ├── Comment.ts
│   │   └── Rating.ts
│   ├── routes/
│   │   ├── blogRoutes.ts
│   │   ├── commentRoutes.ts
│   │   └── ratingRoutes.ts
│   └── index.ts              # Application entry point
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository and navigate to backend**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blog-api
   NODE_ENV=development
   ```

4. **Start MongoDB**
   
   If using local MongoDB:
   ```bash
   mongod
   ```
   
   Or use MongoDB Atlas (cloud) and update `MONGODB_URI` accordingly.

5. **Run the application**
   
   Development mode (with auto-reload):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm run build
   npm start
   ```

6. **Database Seeding**
   
   The database will automatically seed with 6 sample blog posts on first startup if empty.
   
   To manually seed the database:
   ```bash
   npm run seed
   ```
   
   This will clear existing data and insert fresh sample blogs.

## API Endpoints

### Blogs

- `POST /api/blogs` - Create a new blog post
- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/:id` - Get a specific blog post
- `PUT /api/blogs/:id` - Update a blog post
- `DELETE /api/blogs/:id` - Delete a blog post

### Comments

- `POST /api/comments/blog/:blogId` - Add a comment to a blog
- `GET /api/comments/blog/:blogId` - Get all comments for a blog
- `DELETE /api/comments/:id` - Delete a comment

### Ratings

- `POST /api/ratings/blog/:blogId` - Add a rating and review to a blog
- `GET /api/ratings/blog/:blogId` - Get all ratings for a blog (includes average)
- `DELETE /api/ratings/:id` - Delete a rating

### Documentation

- `GET /api-docs` - Interactive Swagger UI documentation
- `GET /health` - Health check endpoint

## API Usage Examples

### Create a Blog Post

```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Blog",
    "body": "This is the content of my blog post",
    "excerpt": "A short summary of the blog",
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
    "author": {
      "name": "John Doe",
      "avatar": "https://i.pravatar.cc/150?img=1"
    },
    "category": "Fitness"
  }'
```

### Add a Comment

```bash
curl -X POST http://localhost:5000/api/comments/blog/{blogId} \
  -H "Content-Type: application/json" \
  -d '{
    "author": "John Doe",
    "comment": "Great article!"
  }'
```

### Add a Rating

```bash
curl -X POST http://localhost:5000/api/ratings/blog/{blogId} \
  -H "Content-Type: application/json" \
  -d '{
    "author": "Jane Smith",
    "rating": 5,
    "review": "Excellent content!"
  }'
```

## Data Models

### Blog
- `title` (string, required, max 200 chars)
- `body` (string, required)
- `excerpt` (string, required, max 500 chars) - Short summary
- `image` (string, required) - Cover image URL
- `author` (object, required)
  - `name` (string, required)
  - `avatar` (string, optional) - Author avatar URL
- `category` (string, required) - Blog category (e.g., Fitness, Nutrition, Yoga)
- `date` (Date, default: now)

### Comment
- `blogId` (ObjectId, required)
- `author` (string, required, max 100 chars)
- `comment` (string, required, max 1000 chars)
- `date` (Date, default: now)

### Rating
- `blogId` (ObjectId, required)
- `author` (string, required, max 100 chars)
- `rating` (number, required, 1-5)
- `review` (string, required, max 500 chars)
- `date` (Date, default: now)

## Validation Rules

- All required fields are validated
- String length limits are enforced
- MongoDB ObjectId format is validated
- Rating values must be between 1 and 5
- Proper error messages for validation failures

## Error Handling

The API uses a centralized error handling middleware that:
- Returns consistent error response format
- Includes stack traces in development mode
- Logs errors to console
- Returns appropriate HTTP status codes

## Special Notes

1. **Modular Design**: Each module (blogs, comments, ratings) is completely independent with its own model, controller, and routes.

2. **Common Utilities**: Validation middleware and error handling are shared across all modules to maintain DRY principles.

3. **Database Indexes**: Comments and ratings have compound indexes on `blogId` and `createdAt` for optimized queries.

4. **Average Rating**: The ratings endpoint automatically calculates and returns the average rating for a blog post.

5. **Timestamps**: All models include automatic `createdAt` and `updatedAt` timestamps.

6. **CORS Enabled**: The API supports cross-origin requests for frontend integration.

7. **Type Safety**: Full TypeScript implementation ensures type safety and better developer experience.

8. **Swagger Documentation**: Complete API documentation is available at `/api-docs` with interactive testing capabilities.

9. **Auto-Seeding**: On first startup, if the database is empty, it will automatically seed with 6 sample blog posts covering various fitness topics (Full-Body Workouts, Cardio Stamina, Nutrition, Yoga, Core Strength, Running).

10. **Manual Seeding**: Use `npm run seed` to manually clear and reseed the database with sample data at any time.

## Development

- Use `npm run dev` for development with auto-reload
- TypeScript files are compiled to `dist/` directory
- Source maps are generated for debugging

## Testing the API

1. Start the server: `npm run dev`
2. Visit `http://localhost:5000/api-docs` for interactive API documentation
3. Use the Swagger UI to test all endpoints
4. Or use tools like Postman, curl, or HTTPie

## License

ISC
