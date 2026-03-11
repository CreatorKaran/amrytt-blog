export interface Author {
  name: string;
  avatar: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  image: string;
  author: Author;
  category: string;
  date: string;
}

export interface Comment {
  id: string;
  blogId: string;
  author: string;
  comment: string;
  rating: number;
  createdAt: string;
}

export interface Rating {
  id: string;
  blogId: string;
  author: string;
  rating: number;
  review: string;
  createdAt: string;
}
