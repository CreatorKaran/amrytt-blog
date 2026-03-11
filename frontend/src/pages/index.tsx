import React from 'react';
import Layout from '@/components/Layout';
import { mockBlogs } from '@/lib/mockData';

export default function Home() {
  return (
    <Layout>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center' }}>
          Fitness Blog
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {mockBlogs.map((blog) => (
            <a 
              key={blog.id} 
              href={`/blog/${blog.slug}`}
              style={{ 
                border: '1px solid #e5e5e5', 
                borderRadius: '12px', 
                overflow: 'hidden',
                transition: 'transform 0.2s',
                display: 'block'
              }}
            >
              <img 
                src={blog.image} 
                alt={blog.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div style={{ padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {blog.title}
                </h2>
                <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  {blog.excerpt}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#999' }}>
                  <span>{blog.category}</span>
                  <span>{new Date(blog.date).toLocaleDateString()}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
}
