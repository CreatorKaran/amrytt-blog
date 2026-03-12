import { Blog, Comment, Rating, ApiResponse, RatingsResponse } from '@/types/blog';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100/api';

// Helper function to handle API errors
async function handleResponse<T>(response: Response): Promise<T> {
  console.log(`API Response: ${response.status} ${response.statusText} for ${response.url}`);
  
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
      console.error('API Error Details:', errorData);
    } catch (parseError) {
      console.error('Failed to parse error response:', parseError);
      // Try to get text response
      try {
        const errorText = await response.text();
        console.error('Error response text:', errorText);
        if (errorText) {
          errorMessage = errorText;
        }
      } catch (textError) {
        console.error('Failed to get error text:', textError);
      }
    }
    
    throw new Error(errorMessage);
  }
  
  return response.json();
}

// Blog API functions
export async function getAllBlogs(): Promise<Blog[]> {
  const url = `${API_BASE_URL}/blogs`;
  console.log('Fetching blogs from:', url);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const result = await handleResponse<ApiResponse<Blog[]>>(response);
    console.log('Blogs fetched successfully:', result.data?.length || 0, 'blogs');
    return result.data;
  } catch (error) {
    console.error('Error in getAllBlogs:', error);
    throw error;
  }
}

export async function getBlogById(id: string): Promise<Blog> {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await handleResponse<ApiResponse<Blog>>(response);
  return result.data;
}

export async function createBlog(blogData: Omit<Blog, '_id' | 'createdAt' | 'updatedAt'>): Promise<Blog> {
  const response = await fetch(`${API_BASE_URL}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blogData),
  });
  const result = await handleResponse<ApiResponse<Blog>>(response);
  return result.data;
}

export async function updateBlog(id: string, blogData: Partial<Blog>): Promise<Blog> {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blogData),
  });
  const result = await handleResponse<ApiResponse<Blog>>(response);
  return result.data;
}

export async function deleteBlog(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  await handleResponse<ApiResponse<null>>(response);
}

// Comment API functions
export async function getCommentsByBlogId(blogId: string): Promise<Comment[]> {
  const response = await fetch(`${API_BASE_URL}/comments/blog/${blogId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await handleResponse<ApiResponse<Comment[]>>(response);
  return result.data;
}

export async function createComment(blogId: string, commentData: { author: string; comment: string }): Promise<Comment> {
  const response = await fetch(`${API_BASE_URL}/comments/blog/${blogId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentData),
  });
  const result = await handleResponse<ApiResponse<Comment>>(response);
  return result.data;
}

export async function deleteComment(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  await handleResponse<ApiResponse<null>>(response);
}

// Rating API functions
export async function getRatingsByBlogId(blogId: string): Promise<RatingsResponse> {
  const response = await fetch(`${API_BASE_URL}/ratings/blog/${blogId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return handleResponse<RatingsResponse>(response);
}

export async function createRating(blogId: string, ratingData: { author: string; rating: number; review: string }): Promise<Rating> {
  const response = await fetch(`${API_BASE_URL}/ratings/blog/${blogId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ratingData),
  });
  const result = await handleResponse<ApiResponse<Rating>>(response);
  return result.data;
}

export async function deleteRating(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/ratings/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  await handleResponse<ApiResponse<null>>(response);
}

// Helper function to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Get related articles for a blog post
export async function getRelatedArticles(blogId: string, limit: number = 4): Promise<Blog[]> {
  const response = await fetch(`${API_BASE_URL}/blogs/${blogId}/related?limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await handleResponse<ApiResponse<Blog[]>>(response);
  return result.data;
}

// Get explore more articles for a blog post
export async function getExploreMore(blogId: string, limit: number = 4): Promise<Blog[]> {
  const response = await fetch(`${API_BASE_URL}/blogs/${blogId}/explore?limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await handleResponse<ApiResponse<Blog[]>>(response);
  return result.data;
}

// Get top guides for sidebar
export async function getTopGuides(blogId: string, limit: number = 3): Promise<Blog[]> {
  const response = await fetch(`${API_BASE_URL}/blogs/${blogId}/top-guides?limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await handleResponse<ApiResponse<Blog[]>>(response);
  return result.data;
}
