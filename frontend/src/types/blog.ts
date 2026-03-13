export interface Author {
  name: string;
  avatar?: string;
}

export interface Blog {
  id?: string;
  _id: string;
  title: string;
  excerpt: string;
  body: string;
  image: string;
  author: Author;
  category: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  blogId: string;
  author: string;
  email: string;
  comment: string;
  rating?: number;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
}
