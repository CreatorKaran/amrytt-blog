import { Blog, Comment } from '@/types/blog';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function getAllBlogs(): Promise<Blog[]> {
  const res = await fetch(`${API_BASE_URL}/blogs`);
  if (!res.ok) throw new Error('Failed to fetch blogs');
  return res.json();
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const blogs = await getAllBlogs();
  return blogs.find(blog => blog.slug === slug) || null;
}

export async function getComments(blogId: string): Promise<Comment[]> {
  const res = await fetch(`${API_BASE_URL}/comments/blog/${blogId}`);
  if (!res.ok) throw new Error('Failed to fetch comments');
  return res.json();
}
