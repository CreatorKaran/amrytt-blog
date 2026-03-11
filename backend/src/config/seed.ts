import Blog from '../models/Blog';
import { seedBlogs } from './seedData';

export const seedDatabase = async (): Promise<void> => {
  try {
    // Check if database is empty
    const blogCount = await Blog.countDocuments();
    
    if (blogCount === 0) {
      console.log('📦 Database is empty. Seeding data...');
      
      // Insert seed data
      await Blog.insertMany(seedBlogs);
      
      console.log(`✅ Successfully seeded ${seedBlogs.length} blog posts`);
    } else {
      console.log(`ℹ️  Database already contains ${blogCount} blog posts. Skipping seed.`);
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};
