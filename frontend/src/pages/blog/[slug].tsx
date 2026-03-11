import React, { useState, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import CommentCard from '@/components/CommentCard';
import CommentSkeleton from '@/components/CommentSkeleton';
import RelatedArticles from '@/components/RelatedArticles';
import StarRating from '@/components/StarRating';
import { Blog, Comment } from '@/types/blog';
import { mockBlogs, mockComments } from '@/lib/mockData';

const MarkdownEditor = dynamic(() => import('@/components/MarkdownEditor'), {
  ssr: false,
  loading: () => <div className="editor-loading">Loading editor...</div>,
});

interface BlogPostProps {
  blog: Blog;
  relatedArticles: Blog[];
}

export default function BlogPost({ blog, relatedArticles }: BlogPostProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(blog.body);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoadingComments(true);
        setCommentsError(null);
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const blogComments = mockComments.filter(c => c.blogId === blog.id);
        setComments(blogComments);
      } catch (error) {
        setCommentsError('Failed to load comments. Please try again later.');
        console.error('Error fetching comments:', error);
      } finally {
        setIsLoadingComments(false);
      }
    };

    fetchComments();
  }, [blog.id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric',
      month: 'long', 
      year: 'numeric' 
    });
  };

  const handleSaveEdit = (content: string) => {
    setEditedContent(content);
    setIsEditing(false);
  };

  const renderContent = () => {
    return editedContent.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('## ')) {
        return <h2 key={index} className="blog-content__heading">{paragraph.replace('## ', '')}</h2>;
      }
      if (paragraph.startsWith('### ')) {
        return <h3 key={index} className="blog-content__subheading">{paragraph.replace('### ', '')}</h3>;
      }
      if (paragraph.startsWith('- ')) {
        const items = paragraph.split('\n').filter(line => line.startsWith('- '));
        return (
          <ul key={index} className="blog-content__list">
            {items.map((item, i) => (
              <li key={i}>{item.replace('- ', '')}</li>
            ))}
          </ul>
        );
      }
      return <p key={index} className="blog-content__paragraph">{paragraph}</p>;
    });
  };

  const averageRating = comments.length > 0
    ? comments.reduce((sum, c) => sum + c.rating, 0) / comments.length
    : 0;

  return (
    <Layout>
      <article className="blog-post">
        <div className="blog-post__container">
          <header className="blog-post__header">
            <p className="blog-post__breadcrumb">HOME / ARTICLES</p>
            <h1 className="blog-post__title">{blog.title}</h1>
          </header>

          <div className="blog-post__hero">
            <img 
              src={blog.image} 
              alt={blog.title}
              className="blog-post__hero-image"
            />
          </div>

          <div className="blog-post__layout">
            <div className="blog-post__main">
              <div className="blog-post__meta">
                <img 
                  src={blog.author.avatar} 
                  alt={blog.author.name}
                  className="blog-post__author-avatar"
                />
                <div className="blog-post__author-info">
                  <span className="blog-post__author-name">{blog.author.name}</span>
                  <div className="blog-post__meta-details">
                    <time className="blog-post__date">{formatDate(blog.date)}</time>
                    <span className="blog-post__category">{blog.category}</span>
                  </div>
                </div>
              </div>

              <div className="blog-content">
                {renderContent()}
              </div>

              <div className="blog-post__actions">
                <button 
                  className="blog-post__edit-button"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel Edit' : 'Edit'}
                </button>
              </div>

              {isEditing && (
                <MarkdownEditor
                  initialContent={editedContent}
                  onSave={handleSaveEdit}
                  onCancel={() => setIsEditing(false)}
                />
              )}

              <section className="blog-post__comments">
                <div className="comments-header">
                  <h2 className="comments-header__title">
                    {comments.length} Comment{comments.length !== 1 ? 's' : ''}
                  </h2>
                  {comments.length > 0 && (
                    <div className="comments-header__rating">
                      <StarRating rating={Math.round(averageRating)} size="medium" />
                      <span className="comments-header__rating-text">
                        {averageRating.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>

                {isLoadingComments && (
                  <div className="comments-loading">
                    <CommentSkeleton />
                    <CommentSkeleton />
                  </div>
                )}

                {commentsError && (
                  <div className="comments-error">
                    <p>{commentsError}</p>
                  </div>
                )}

                {!isLoadingComments && !commentsError && comments.length === 0 && (
                  <p className="comments-empty">No comments yet. Be the first to comment!</p>
                )}

                {!isLoadingComments && !commentsError && comments.length > 0 && (
                  <div className="comments-list">
                    {comments.map((comment) => (
                      <CommentCard key={comment.id} comment={comment} />
                    ))}
                  </div>
                )}
              </section>
            </div>

            <aside className="blog-post__sidebar">
              <div className="sidebar-card">
                <h3 className="sidebar-card__title">Top Guides</h3>
                {relatedArticles.slice(0, 3).map((article) => (
                  <a 
                    key={article.id}
                    href={`/blog/${article.slug}`}
                    className="sidebar-article"
                  >
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="sidebar-article__image"
                    />
                    <div className="sidebar-article__content">
                      <span className="sidebar-article__category">{article.category}</span>
                      <h4 className="sidebar-article__title">{article.title}</h4>
                      <time className="sidebar-article__date">
                        {new Date(article.date).toLocaleDateString('en-US', { 
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric' 
                        })}
                      </time>
                    </div>
                  </a>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </article>

      <div className="blog-post__container">
        <RelatedArticles articles={relatedArticles.slice(0, 4)} />
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = mockBlogs.map((blog) => ({
    params: { slug: blog.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const blog = mockBlogs.find((b) => b.slug === slug);

  if (!blog) {
    return {
      notFound: true,
    };
  }

  const relatedArticles = mockBlogs
    .filter((b) => b.id !== blog.id && b.category === blog.category)
    .slice(0, 4);

  return {
    props: {
      blog,
      relatedArticles,
    },
  };
};
