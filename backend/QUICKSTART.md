# Quick Start Guide

Get the Blog API running in 5 minutes!

## Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)

## Setup Steps

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` if needed (default works for local MongoDB):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog-api
NODE_ENV=development
```

### 3. Start MongoDB
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (update MONGODB_URI in .env)
```

### 4. Start the Server
```bash
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
📦 Database is empty. Seeding data...
✅ Successfully seeded 6 blog posts
🚀 Server running on port 5000
📚 API Documentation: http://localhost:5000/api-docs
```

## Test the API

### Option 1: Swagger UI (Recommended)
Open your browser: http://localhost:5000/api-docs

### Option 2: cURL
```bash
# Get all blogs
curl http://localhost:5000/api/blogs

# Get specific blog
curl http://localhost:5000/api/blogs/{blogId}

# Create a blog
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Blog",
    "body": "Content here",
    "excerpt": "Short summary",
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
    "author": {"name": "John Doe"},
    "category": "Fitness"
  }'
```

## Available Endpoints

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get single blog
- `POST /api/blogs` - Create blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog

### Comments
- `POST /api/comments/blog/:blogId` - Add comment
- `GET /api/comments/blog/:blogId` - Get comments
- `DELETE /api/comments/:id` - Delete comment

### Ratings
- `POST /api/ratings/blog/:blogId` - Add rating
- `GET /api/ratings/blog/:blogId` - Get ratings (with average)
- `DELETE /api/ratings/:id` - Delete rating

## Sample Data

The database is automatically seeded with 6 blog posts:
1. The Ultimate Guide to Full-Body Workouts
2. 10 Tips for Better Cardio Stamina
3. Nutrition Basics for Muscle Gain
4. Yoga for Flexibility and Strength
5. Building Core Strength: A Complete Guide
6. Running for Beginners: Your First 5K

## Reseed Database

To clear and reseed:
```bash
npm run seed
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in `.env`

### Port Already in Use
- Change PORT in `.env` to another port (e.g., 5001)

### Module Not Found
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then `npm install`

## Next Steps

1. Explore the API using Swagger UI
2. Test creating comments and ratings
3. Review the code structure in `src/`
4. Check out README.md for detailed documentation

## Development Commands

```bash
npm run dev      # Start with auto-reload
npm run build    # Compile TypeScript
npm start        # Run production build
npm run seed     # Reseed database
```

Happy coding! 🚀
