# Fitness Blog Platform

A full-stack fitness blog platform built with Next.js frontend and Express.js backend, featuring interactive comments, ratings, and comprehensive fitness content management.

## 🏗️ Architecture

This is a monorepo containing two main applications:

- **Frontend**: Next.js 16.1.6 with TypeScript and Tailwind CSS
- **Backend**: Express.js 5.2.1 with MongoDB and TypeScript
- **Database**: MongoDB with Mongoose ODM

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm package manager

### 1. Clone and Install

```bash
git clone <repository-url>
cd fitness-blog-platform

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Setup

**Backend Configuration:**
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and other settings
```

**Frontend Configuration:**
```bash
cd frontend
cp .env.local.example .env.local
# Edit .env.local with your API URL
```

### 3. Start Development Servers

```bash
# Terminal 1: Start Backend (Port 5100)
cd backend
npm run dev

# Terminal 2: Start Frontend (Port 3000)
cd frontend
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5100/api
- **API Documentation**: http://localhost:5100/api-docs

## 📁 Project Structure

```
/
├── frontend/                 # Next.js Application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Next.js pages (file-based routing)
│   │   ├── lib/             # API client and utilities
│   │   ├── types/           # TypeScript definitions
│   │   └── styles/          # Global styles and Tailwind
│   ├── public/              # Static assets
│   └── package.json
│
├── backend/                  # Express.js API Server
│   ├── src/
│   │   ├── controllers/     # Business logic (MVC)
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoints
│   │   ├── middleware/      # Express middleware
│   │   ├── config/          # Database and app configuration
│   │   └── utils/           # Shared utilities
│   └── package.json
│
└── README.md                # This file
```

## 🎯 Features

### Content Management
- **Blog Posts**: Create and manage fitness-related articles
- **Categories**: Organize content by fitness topics (Nutrition, Yoga, Cardio, etc.)
- **Rich Content**: Markdown support with image integration
- **SEO Optimized**: Static generation with meta tags

### User Interaction
- **Comments System**: Real-time commenting on blog posts
- **Rating System**: 5-star ratings with written reviews
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Performance
- **Static Site Generation (SSG)**: Fast-loading pages
- **Incremental Static Regeneration (ISR)**: 60-second revalidation
- **API Optimization**: Efficient MongoDB queries with indexing

## 🛠️ Technology Stack

### Frontend Technologies
- **Framework**: Next.js 16.1.6 (Pages Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Library**: React 19.2.3
- **Date Handling**: Moment.js 2.30.1

### Backend Technologies
- **Runtime**: Node.js
- **Framework**: Express.js 5.2.1
- **Language**: TypeScript 5.9.3
- **Database**: MongoDB with Mongoose 8.23.0
- **Validation**: Joi 17.13.3
- **Documentation**: Swagger (OpenAPI 3.0)

## 📊 Database Schema

### Collections

**Blogs**
- Title, content, author information
- Category, tags, publication date
- Featured images and metadata
- SEO-friendly slugs

**Comments**
- User comments linked to blog posts
- Timestamp and author information
- Nested comment support

**Ratings**
- 1-5 star rating system
- Written reviews and feedback
- Aggregated rating calculations

## 🔧 Development Commands

### Backend Commands
```bash
cd backend

# Development
npm run dev          # Start with auto-reload
npm run build        # Compile TypeScript
npm start           # Run production build

# Database
npm run seed        # Seed with sample data
```

### Frontend Commands
```bash
cd frontend

# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
```

## 🌐 API Endpoints

### Blog Management
- `GET /api/blogs` - List all blogs
- `GET /api/blogs/:slug` - Get blog by slug
- `POST /api/blogs` - Create new blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog

### Comments
- `GET /api/comments/:blogId` - Get comments for blog
- `POST /api/comments` - Add new comment

### Ratings
- `GET /api/ratings/:blogId` - Get ratings for blog
- `POST /api/ratings` - Add new rating

## 🚀 Deployment

### Environment Variables

**Backend (.env)**
```env
PORT=5100
MONGODB_URI=mongodb://localhost:27017/blog-api
NODE_ENV=production
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:5100/api
```

### Production Build
```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm start
```

## 📝 Sample Data

The backend includes auto-seeding functionality with 6 sample fitness blog posts covering:
- Workout routines and strength training
- Nutrition guides and meal planning
- Yoga and mindfulness practices
- Cardio and endurance training

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the API documentation at `/api-docs`
2. Review the individual README files in `backend/` and `frontend/`
3. Open an issue in the repository

---

**Happy coding! 💪🏋️‍♀️**