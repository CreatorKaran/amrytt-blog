import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Blog from '../models/Blog';
import { seedBlogs } from '../config/seedData';

dotenv.config();

const runSeed = async (): Promise<void> => {
  try {
    // Connect to database
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-api';
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected');

    // Clear existing data (optional - comment out if you want to keep existing data)
    const deleteCount = await Blog.deleteMany({});
    console.log(`🗑️  Deleted ${deleteCount.deletedCount} existing blog posts`);

    // Insert seed data
    const blogs = await Blog.insertMany(seedBlogs);
    console.log(`✅ Successfully seeded ${blogs.length} blog posts`);

    // Display seeded blogs
    console.log('\n📚 Seeded Blogs:');
    blogs.forEach((blog, index) => {
      console.log(`${index + 1}. ${blog.title} (${blog.category})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

runSeed();
