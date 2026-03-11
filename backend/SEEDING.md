# Database Seeding Guide

## Overview

The Blog API includes automatic database seeding functionality that populates the database with sample blog posts on first startup.

## Automatic Seeding

When you start the server for the first time with an empty database:

```bash
npm run dev
```

The system will:
1. Check if the database is empty
2. If empty, automatically insert 6 sample blog posts
3. Display a success message in the console

**Console Output:**
```
✅ MongoDB connected successfully
📦 Database is empty. Seeding data...
✅ Successfully seeded 6 blog posts
🚀 Server running on port 5000
```

## Manual Seeding

To manually seed the database (this will clear existing data):

```bash
npm run seed
```

This script will:
1. Connect to MongoDB
2. Delete all existing blog posts
3. Insert fresh sample data
4. Display the list of seeded blogs
5. Exit

**Console Output:**
```
✅ MongoDB connected
🗑️  Deleted X existing blog posts
✅ Successfully seeded 6 blog posts

📚 Seeded Blogs:
1. The Ultimate Guide to Full-Body Workouts (Fitness)
2. 10 Tips for Better Cardio Stamina (Cardio)
3. Nutrition Basics for Muscle Gain (Nutrition)
4. Yoga for Flexibility and Strength (Yoga)
5. Building Core Strength: A Complete Guide (Fitness)
6. Running for Beginners: Your First 5K (Running)
```

## Sample Data Structure

Each seeded blog post includes:

- **Title**: Engaging, descriptive title
- **Body**: Full article content with markdown formatting
- **Excerpt**: Short summary (150-200 characters)
- **Image**: High-quality Unsplash image URL
- **Author**: Name and avatar
- **Category**: Fitness, Cardio, Nutrition, Yoga, or Running
- **Date**: Publication date

### Example Blog Post:

```json
{
  "title": "The Ultimate Guide to Full-Body Workouts",
  "excerpt": "Discover the most effective full-body workout routines...",
  "body": "Full-body workouts are an excellent way to maximize...",
  "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
  "author": {
    "name": "Alex Cooper",
    "avatar": "https://i.pravatar.cc/150?img=12"
  },
  "category": "Fitness",
  "date": "2024-01-15T00:00:00.000Z"
}
```

## Seeded Blog Categories

The sample data includes posts across multiple categories:

1. **Fitness** (2 posts)
   - Full-Body Workouts
   - Core Strength

2. **Cardio** (1 post)
   - Cardio Stamina Tips

3. **Nutrition** (1 post)
   - Muscle Gain Nutrition

4. **Yoga** (1 post)
   - Flexibility and Strength

5. **Running** (1 post)
   - Beginner's 5K Guide

## Customizing Seed Data

To customize the seed data, edit `src/config/seedData.ts`:

```typescript
export const seedBlogs = [
  {
    title: 'Your Custom Title',
    excerpt: 'Your excerpt...',
    body: 'Your full content...',
    image: 'https://your-image-url.com',
    author: {
      name: 'Author Name',
      avatar: 'https://avatar-url.com'
    },
    category: 'Your Category',
    date: new Date('2024-01-01'),
  },
  // Add more blog posts...
];
```

## Disabling Auto-Seeding

If you want to disable automatic seeding on server start, comment out the seed call in `src/index.ts`:

```typescript
const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();
    // await seedDatabase(); // Comment this line
    app.listen(PORT, () => {
      // ...
    });
  } catch (error) {
    // ...
  }
};
```

## Verifying Seeded Data

After seeding, verify the data through:

1. **API Endpoint:**
   ```bash
   curl http://localhost:5000/api/blogs
   ```

2. **Swagger UI:**
   Visit `http://localhost:5000/api-docs` and test the GET /api/blogs endpoint

3. **MongoDB Compass:**
   Connect to your database and browse the `blogs` collection

## Troubleshooting

### Seed Not Running
- Ensure MongoDB is running
- Check the `MONGODB_URI` in your `.env` file
- Verify the database is actually empty

### Duplicate Key Errors
- The database already has data
- Run `npm run seed` to clear and reseed

### Connection Errors
- Verify MongoDB is running: `mongod`
- Check your connection string in `.env`
- Ensure network connectivity to MongoDB Atlas (if using cloud)

## Image Sources

All sample images are from Unsplash (free to use):
- Fitness images: workout, gym, exercise photos
- Author avatars: pravatar.cc (placeholder avatars)

You can replace these with your own image URLs in the seed data.
