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
  comment: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface Rating {
  _id: string;
  blogId: string;
  author: string;
  rating: number;
  review: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
}

export interface RatingsResponse {
  success: boolean;
  count: number;
  averageRating: number;
  data: Rating[];
}
