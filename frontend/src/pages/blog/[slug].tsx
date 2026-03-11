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
  loading: () => <div className="p-8 text-center text-gray-600 italic">Loading editor...</div>,
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
        return <h2 key={index} className="text-3xl font-bold mt-8 mb-6 leading-tight text-gray-900">{paragraph.replace('## ', '')}</h2>;
      }
      if (paragraph.startsWith('### ')) {
        return <h3 key={index} className="text-2xl font-semibold mt-6 mb-4 leading-snug text-gray-900">{paragraph.replace('### ', '')}</h3>;
      }
      if (paragraph.startsWith('- ')) {
        const items = paragraph.split('\n').filter(line => line.startsWith('- '));
        return (
          <ul key={index} className="my-6 pl-8 text-gray-600 space-y-2">
            {items.map((item, i) => (
              <li key={i} className="pl-2">{item.replace('- ', '')}</li>
            ))}
          </ul>
        );
      }
      return <p key={index} className="mb-6 text-gray-600">{paragraph}</p>;
    });
  };

  const averageRating = comments.length > 0
    ? comments.reduce((sum, c) => sum + c.rating, 0) / comments.length
    : 0;

  return (
    <Layout>
      <article className="bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <header className="py-12 text-center">
            <p className="text-xs font-semibold tracking-widest text-gray-400 mb-4 uppercase">
              HOME / ARTICLES
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 max-w-4xl mx-auto">
              {blog.title}
            </h1>
          </header>

          <div className="mb-12 rounded-xl overflow-hidden shadow-md">
            <img 
              src={blog.image} 
              alt={blog.title}
              className="w-full h-auto aspect-video object-cover"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 mb-12">
            <div className="min-w-0">
              <div className="flex items-center gap-4 pb-8 border-b border-gray-200 mb-8">
                <img 
                  src={blog.author.avatar} 
                  alt={blog.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-base text-gray-900">{blog.author.name}</span>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <time>{formatDate(blog.date)}</time>
                    <span>•</span>
                    <span className="text-blue-600 font-medium">{blog.category}</span>
                  </div>
                </div>
              </div>

              <div className="text-lg leading-relaxed text-gray-900">
                {renderContent()}
              </div>

              <div className="my-8 py-8 border-t border-b border-gray-200">
                <button 
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold text-sm transition-all hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
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

              <section className="mt-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b-2 border-gray-200 gap-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {comments.length} Comment{comments.length !== 1 ? 's' : ''}
                  </h2>
                  {comments.length > 0 && (
                    <div className="flex items-center gap-2">
                      <StarRating rating={Math.round(averageRating)} size="medium" />
                      <span className="text-lg font-semibold text-gray-900">
                        {averageRating.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>

                {isLoadingComments && (
                  <div className="flex flex-col gap-6">
                    <CommentSkeleton />
                    <CommentSkeleton />
                  </div>
                )}

                {commentsError && (
                  <div className="p-8 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
                    <p>{commentsError}</p>
                  </div>
                )}

                {!isLoadingComments && !commentsError && comments.length === 0 && (
                  <p className="py-12 text-center text-gray-400 italic">
                    No comments yet. Be the first to comment!
                  </p>
                )}

                {!isLoadingComments && !commentsError && comments.length > 0 && (
                  <div className="flex flex-col gap-6">
                    {comments.map((comment) => (
                      <CommentCard key={comment.id} comment={comment} />
                    ))}
                  </div>
                )}
              </section>
            </div>

            <aside className="lg:sticky lg:top-24 h-fit">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
                <h3 className="text-lg font-bold mb-6 text-gray-900">Top Guides</h3>
                {relatedArticles.slice(0, 3).map((article) => (
                  <a 
                    key={article.id}
                    href={`/blog/${article.slug}`}
                    className="flex gap-4 py-4 border-b border-gray-200 last:border-b-0 transition-transform hover:translate-x-1"
                  >
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                        {article.category}
                      </span>
                      <h4 className="text-sm font-semibold leading-snug text-gray-900 line-clamp-2">
                        {article.title}
                      </h4>
                      <time className="text-xs text-gray-400">
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

      <div className="max-w-7xl mx-auto px-6">
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
