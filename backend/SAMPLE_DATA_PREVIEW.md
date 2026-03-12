# Sample Data Preview

## Overview

The database is automatically seeded with 6 comprehensive blog posts covering various fitness topics. Each post includes realistic content, images, author information, and categories.

## Seeded Blog Posts

### 1. The Ultimate Guide to Full-Body Workouts

**Category:** Fitness  
**Author:** Alex Cooper  
**Date:** January 15, 2024

**Excerpt:**
> Discover the most effective full-body workout routines that will help you build strength, increase endurance, and achieve your fitness goals.

**Content Highlights:**
- Why full-body workouts are effective
- Essential exercises (squats, deadlifts, push-ups, pull-ups, planks)
- Beginner and advanced workout routines
- Tips for success and progressive overload
- Nutrition and recovery advice

**Image:** Fitness/workout scene  
**Word Count:** ~1,000 words

---

### 2. 10 Tips for Better Cardio Stamina

**Category:** Cardio  
**Author:** Sarah Mitchell  
**Date:** January 20, 2024

**Excerpt:**
> Boost your cardiovascular endurance with these proven strategies and training techniques used by professional athletes.

**Content Highlights:**
- Understanding cardio stamina
- 10 proven tips for improvement
- Interval training techniques
- Weekly cardio training plan
- Breathing and recovery strategies

**Image:** Cardio/running scene  
**Word Count:** ~900 words

---

### 3. Nutrition Basics for Muscle Gain

**Category:** Nutrition  
**Author:** Mike Johnson  
**Date:** January 25, 2024

**Excerpt:**
> Learn the fundamental principles of nutrition for building muscle mass, including macros, meal timing, and supplement strategies.

**Content Highlights:**
- Caloric surplus explained
- Macronutrient breakdown (protein, carbs, fats)
- Meal timing strategies
- Sample 3000-calorie meal plan
- Supplement recommendations
- Common mistakes to avoid

**Image:** Healthy food/nutrition scene  
**Word Count:** ~1,100 words

---

### 4. Yoga for Flexibility and Strength

**Category:** Yoga  
**Author:** Emma Williams  
**Date:** February 1, 2024

**Excerpt:**
> Explore how yoga can transform your body and mind through improved flexibility, strength, and mental clarity.

**Content Highlights:**
- Physical and mental benefits
- Essential yoga poses for beginners
- Building your practice (8-week progression)
- Different types of yoga
- Breathing techniques (Pranayama)
- Sample 30-minute sequence

**Image:** Yoga practice scene  
**Word Count:** ~1,200 words

---

### 5. Building Core Strength: A Complete Guide

**Category:** Fitness  
**Author:** David Chen  
**Date:** February 5, 2024

**Excerpt:**
> Master the art of core training with exercises and techniques that will give you a strong, stable, and functional midsection.

**Content Highlights:**
- Why core strength matters
- Understanding core muscles
- Essential core exercises
- 12-week progressive training program
- Training principles and form tips
- Nutrition for visible abs

**Image:** Core workout scene  
**Word Count:** ~1,300 words

---

### 6. Running for Beginners: Your First 5K

**Category:** Running  
**Author:** Lisa Anderson  
**Date:** February 10, 2024

**Excerpt:**
> Start your running journey with this comprehensive guide designed to take you from couch to 5K in just 8 weeks.

**Content Highlights:**
- Physical and mental benefits of running
- Essential running gear
- Complete Couch to 5K training plan (9 weeks)
- Running form and technique
- Injury prevention strategies
- Race day tips and preparation

**Image:** Running scene  
**Word Count:** ~1,400 words

---

## Data Structure

Each blog post includes:

```json
{
  "_id": "MongoDB ObjectId",
  "title": "Blog Post Title",
  "body": "Full article content with markdown formatting...",
  "excerpt": "Short 150-200 character summary...",
  "image": "https://images.unsplash.com/photo-...",
  "author": {
    "name": "Author Name",
    "avatar": "https://i.pravatar.cc/150?img=X"
  },
  "category": "Category Name",
  "date": "2024-XX-XXT00:00:00.000Z",
  "createdAt": "2024-XX-XXT10:30:00.000Z",
  "updatedAt": "2024-XX-XXT10:30:00.000Z"
}
```

## Categories Distribution

- **Fitness:** 2 posts (Full-Body Workouts, Core Strength)
- **Cardio:** 1 post (Cardio Stamina)
- **Nutrition:** 1 post (Muscle Gain)
- **Yoga:** 1 post (Flexibility and Strength)
- **Running:** 1 post (Beginner's 5K)

## Authors

1. **Alex Cooper** - Fitness expert
2. **Sarah Mitchell** - Cardio specialist
3. **Mike Johnson** - Nutrition coach
4. **Emma Williams** - Yoga instructor
5. **David Chen** - Core training specialist
6. **Lisa Anderson** - Running coach

## Image Sources

All images are from Unsplash (free, high-quality):
- Fitness/workout scenes
- Cardio/running scenes
- Nutrition/food scenes
- Yoga practice scenes

Author avatars from pravatar.cc (placeholder service)

## Content Quality

### Realistic and Comprehensive
- Each post is 900-1,400 words
- Professional writing style
- Structured with headings and sections
- Actionable advice and tips
- Sample routines and plans

### SEO-Friendly
- Descriptive titles
- Engaging excerpts
- Proper content structure
- Relevant categories

### Frontend-Ready
- Cover images for cards
- Excerpts for previews
- Author info for bylines
- Categories for filtering
- Dates for sorting

## Sample API Response

### GET /api/blogs

```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "title": "The Ultimate Guide to Full-Body Workouts",
      "excerpt": "Discover the most effective full-body workout routines that will help you build strength, increase endurance, and achieve your fitness goals.",
      "body": "Full-body workouts are an excellent way to maximize your time at the gym...",
      "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
      "author": {
        "name": "Alex Cooper",
        "avatar": "https://i.pravatar.cc/150?img=12"
      },
      "category": "Fitness",
      "date": "2024-01-15T00:00:00.000Z",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    // ... 5 more blogs
  ]
}
```

## Use Cases

### Blog Listing Page
- Display all 6 blogs as cards
- Show image, title, excerpt, author, category
- Sort by date (newest first)

### Blog Detail Page
- Full article content
- Author information with avatar
- Category badge
- Publication date
- Comments section
- Rating/review section

### Category Filtering
- Filter by Fitness (2 posts)
- Filter by Cardio (1 post)
- Filter by Nutrition (1 post)
- Filter by Yoga (1 post)
- Filter by Running (1 post)

### Author Pages
- List all posts by specific author
- Show author avatar and name
- Author bio (can be added later)

## Testing the Data

### View All Blogs
```bash
curl http://localhost:5100/api/blogs | jq '.'
```

### View Specific Blog
```bash
# Get first blog ID
BLOG_ID=$(curl -s http://localhost:5100/api/blogs | jq -r '.data[0]._id')

# Get blog details
curl http://localhost:5100/api/blogs/$BLOG_ID | jq '.'
```

### Filter by Category (Frontend Implementation)
```javascript
// Example frontend code
const fitnessBlogs = blogs.filter(blog => blog.category === 'Fitness');
```

## Customization

To customize the seed data, edit `src/config/seedData.ts`:

```typescript
export const seedBlogs = [
  {
    title: 'Your Custom Title',
    excerpt: 'Your excerpt (max 500 chars)',
    body: 'Your full content...',
    image: 'https://your-image-url.com',
    author: {
      name: 'Author Name',
      avatar: 'https://avatar-url.com'
    },
    category: 'Your Category',
    date: new Date('2024-01-01'),
  },
  // Add more...
];
```

## Benefits of This Sample Data

✅ **Realistic Content** - Professional, well-written articles  
✅ **Diverse Topics** - Multiple categories covered  
✅ **Complete Data** - All required fields included  
✅ **Frontend Ready** - Images, excerpts, authors included  
✅ **SEO Friendly** - Proper structure and content  
✅ **Testing Ready** - Perfect for development and demos  
✅ **Professional Quality** - Production-ready content  

## Next Steps

1. Start the server: `npm run dev`
2. Database auto-seeds with this data
3. View in Swagger UI: http://localhost:5100/api-docs
4. Test with frontend application
5. Add comments and ratings to blogs
6. Customize or add more blogs as needed

## Summary

The seeded data provides a complete, realistic blog platform with:
- 6 comprehensive articles
- 5 different categories
- 6 unique authors
- Professional images
- SEO-friendly content
- Frontend-ready structure

Perfect for development, testing, and demos! 🎉
