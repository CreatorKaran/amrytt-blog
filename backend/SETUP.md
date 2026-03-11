# Quick Setup Guide

## Installation Steps

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your MongoDB connection string if needed.

3. **Start MongoDB**
   - Local: `mongod`
   - Or use MongoDB Atlas cloud instance

4. **Run the application**
   ```bash
   npm run dev
   ```

5. **Access the API**
   - API: http://localhost:5000
   - Swagger Docs: http://localhost:5000/api-docs
   - Health Check: http://localhost:5000/health

## Quick Test

Create a blog post:
```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Blog","body":"This is a test"}'
```

View all blogs:
```bash
curl http://localhost:5000/api/blogs
```

## Project Structure

- `src/models/` - Database schemas (Blog, Comment, Rating)
- `src/controllers/` - Business logic for each module
- `src/routes/` - API endpoints with Swagger docs
- `src/middleware/` - Validation and error handling
- `src/config/` - Database and Swagger configuration

Each module (Blog, Comment, Rating) is completely independent and self-contained.
