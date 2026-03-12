import { useState, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import moment from 'moment';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { Blog, Comment, Rating } from '@/types/blog';
import {
  getAllBlogs,
  getCommentsByBlogId,
  getRatingsByBlogId,
  generateSlug,
  getBlogBySlug,
  BlogBySlugResponse
} from '@/lib/api';
import { generateBlogMetadata } from '@/lib/metadata';
import Link from 'next/link';
import RelatedArticles from '@/components/RelatedArticles';
import ExploreMore from '@/components/ExploreMore';

interface BlogPostProps {
  blogData: BlogBySlugResponse;
}

// Combine comments and ratings into a single display format
interface CombinedComment extends Comment {
  rating?: number;
}

// Star Rating Component for Comments
function CommentStarRating({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex gap-1 items-center">
      {stars.map((star) => (
        <svg
          key={star}
          className={`w-[18px] h-[18px] ${star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Interactive Star Rating Component for Comment Form
function InteractiveStarRating({ rating, onRatingChange }: { rating: number; onRatingChange: (rating: number) => void }) {
  const getRatingColor = (star: number) => {
    if (star === 1) return '#ff0412';
    if (star === 2) return '#ff6700';
    if (star === 3) return '#ffb416';
    if (star === 4) return '#1c9af4';
    return '#00ba5c';
  };

  const getRatingLabel = (star: number) => {
    if (star === 1) return 'bed';
    if (star === 2) return 'Average';
    if (star === 3) return 'Normal';
    if (star === 4) return 'Nice';
    return 'good';
  };
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <div key={star} className="relative">
          {star === rating ? (
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{ backgroundColor: getRatingColor(star) }}
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white text-sm font-medium tracking-[0.14px] capitalize leading-5">
                {getRatingLabel(star)}
              </span>
            </div>
          ) : (
            <button
              onClick={() => onRatingChange(star)}
              className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-4 h-4"
                style={{ color: getRatingColor(star) }}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default function BlogPost({ blogData }: BlogPostProps) {
  const { blog, relatedArticles, exploreMore, tourGuides, navigation } = blogData;
  const [comments, setComments] = useState<Comment[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    comment: '',
    rating: 5
  });

  useEffect(() => {
    const fetchCommentsAndRatings = async () => {
      try {
        setIsLoadingComments(true);
        setCommentsError(null);

        // Fetch both comments and ratings in parallel
        const [commentsData, ratingsData] = await Promise.all([
          getCommentsByBlogId(blog._id),
          getRatingsByBlogId(blog._id)
        ]);

        setComments(commentsData);
        setRatings(ratingsData.data);
      } catch (error) {
        setCommentsError('Failed to load comments. Please try again later.');
        console.error('Error fetching comments:', error);
      } finally {
        setIsLoadingComments(false);
      }
    };

    fetchCommentsAndRatings();
  }, [blog._id]);
  // Combine comments and ratings for display
  const combinedComments: CombinedComment[] = [
    ...comments,
    ...ratings.map(rating => ({
      _id: rating._id,
      blogId: rating.blogId,
      author: rating.author,
      comment: rating.review,
      date: rating.date,
      createdAt: rating.createdAt,
      updatedAt: rating.updatedAt,
      rating: rating.rating
    }))
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <>
      {generateBlogMetadata({ blog, comments, ratings })}
      
      <div className="bg-[#fafafa] min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col items-center justify-center py-8 md:py-16 w-full">
        <div className="flex flex-col items-center gap-1 text-center max-w-4xl px-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1 text-[#262d4d] text-sm font-bold tracking-[1px] uppercase mb-4">
            <Link href={'/'}><span className="font-bold">Home</span></Link>
            <span className="font-normal">/</span>
            <span className="font-normal">Articles</span>
            <span className="font-normal">/</span>
          </div>

          {/* Title */}
          <h1 className="text-[#10152e] text-2xl md:text-4xl lg:text-[48px] font-semibold leading-tight md:leading-[66px] tracking-[1px] text-center">
            {blog.title}
          </h1>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[560px] w-full overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Main Content Container */}
      <div className="flex justify-center w-full">
        <div className="flex flex-col lg:flex-row gap-5 w-full max-w-[1200px] px-6">
          {/* Article Content */}
          <div className="flex-1 flex flex-col gap-8 pb-16">
            {/* Article Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-[#e5e6ea] gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={blog.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author.name)}&background=2563eb&color=fff`}
                  alt={blog.author.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-[#4e5265] text-base font-semibold tracking-[1px] uppercase">
                  {blog.author.name}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[#4e5265] text-base font-semibold tracking-[1px] uppercase whitespace-nowrap">
                <span>{moment(blog.date).format('DD MMMM')}</span>
                <span>{moment(blog.date).format('YYYY')}</span>
              </div>
            </div>

            {/* Article Excerpt */}
            <p className="text-[#10152e] text-base leading-6 tracking-[1px] w-full">
              {blog.excerpt}
            </p>

            {/* Article Body */}
            <div className="text-[#10152e] text-base leading-6 tracking-[1px] space-y-6">
              <MarkdownRenderer content={blog.body} />
            </div>

            {/* Author Section */}
            <div className="flex flex-col gap-8">
              <div className="border-t border-[#e5e6ea] pt-6 h-[296px] px-6">
                <div className="flex items-start gap-2 mb-3">
                  <span className="text-[#10152e] text-xl leading-[30px] tracking-[1px]">About</span>
                  <span className="text-[#10152e] text-xl leading-[30px] tracking-[1px]">{blog.author.name}</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={blog.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author.name)}&background=2563eb&color=fff`}
                    alt={blog.author.name}
                    className="w-[100px] h-[100px] rounded-full object-cover"
                  />
                  <p className="text-[#4e5265] text-base italic font-semibold leading-6 tracking-[1px] text-center">
                    With over a decade in fitness, {blog.author.name} specializes in strength training. Certified by NASM, he designs challenging yet achievable workout programs. His passion is helping clients build strength and confidence through personalized routines. Outside the gym, {blog.author.name} enjoys running and outdoor adventures.
                  </p>
                </div>
              </div>
              {/* Navigation Buttons */}
              <div className="border-t border-[#e5e6ea] pt-8 min-h-[104px]">
                <div className="flex flex-col md:flex-row justify-between items-start w-full gap-4">
                  <div className="flex flex-col gap-2 items-start flex-1">
                    <button className="cursor-pointer flex items-center gap-3 px-4 py-2 border border-[#05091c] rounded-sm hover:bg-[#05091c] hover:text-white transition-colors group">
                      <svg className="w-4 h-4 rotate-90 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#05091c] text-base font-normal leading-6 tracking-[1px] group-hover:text-white">Previous</span>
                    </button>
                    <span className="text-[#262d4d] text-sm leading-5 tracking-[1px] text-right">5 Tips for Better Cardio Sessions</span>
                  </div>
                  <div className="flex flex-col gap-2 items-end flex-1">
                    <button className="cursor-pointer flex items-center gap-3 px-4 py-2 border border-[#05091c] rounded-sm hover:bg-[#05091c] hover:text-white transition-colors group">
                      <span className="text-[#05091c] text-base font-normal leading-6 tracking-[1px] group-hover:text-white">Next</span>
                      <svg className="w-4 h-4 -rotate-90 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <span className="text-[#262d4d] text-sm leading-5 tracking-[1px] text-right">Meal Prep Basics for Gym Enthusiasts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[341px] px-5 py-6 order-first lg:order-last">
            <div className="flex flex-col gap-10 lg:gap-[100px]">
              {/* Explore More */}
              <ExploreMore articles={exploreMore} />
              {/* Tour Guides */}
              <div className="flex flex-col gap-6 lg:gap-10 w-full">
                <h3 className="text-[#10152e] text-xl font-semibold leading-7 tracking-[1px]">
                  Tour Guides
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6 w-full">
                  {tourGuides?.slice(0, 3).map((guide, index) => (
                    <div key={guide._id} className="flex flex-col gap-4 lg:gap-6 w-full">
                      <div className="flex flex-col gap-3 lg:gap-4 w-full">
                        <div className="flex items-start gap-4 w-full">
                          <img
                            src={guide.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(guide.author.name)}&background=2563eb&color=fff`}
                            alt={guide.author.name}
                            className="w-[60px] h-[60px] rounded-full object-cover shrink-0"
                          />
                          <div className="flex flex-col gap-1 flex-1 min-w-0">
                            <h4 className="text-black text-base leading-7 tracking-[1px]">
                              {guide.author.name}
                            </h4>
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-black shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-black text-sm leading-5 tracking-[1px] opacity-80 truncate">
                                Location, Region
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <CommentStarRating rating={5} />
                          <span className="text-[#121212] text-[15px] leading-normal tracking-[0.5px]">
                            (5.0)
                          </span>
                        </div>
                      </div>
                      {index < 2 && <div className="w-full h-px bg-gray-200 lg:block hidden"></div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="flex flex-col gap-8 py-8 w-full">
        <div className="max-w-[1200px] mx-auto px-6 w-full">
          <div className="flex items-center gap-2">
            <div className="w-1 h-3 bg-black rounded-xl"></div>
            <h2 className="text-black text-xl font-medium leading-normal tracking-[1px] capitalize">
              comments
            </h2>
          </div>

          {/* Display Comments */}
          {!isLoadingComments && !commentsError && combinedComments.length > 0 && (
            <div className="flex flex-col gap-8 mt-8 w-full">
              {combinedComments.slice(0, 2).map((comment, index) => (
                <div key={comment._id} className="w-full">
                  <div className="flex gap-5 items-start w-full">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.author)}&background=2563eb&color=fff`}
                      alt={comment.author}
                      className="w-[60px] h-[60px] rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 flex flex-col gap-3 min-w-0">
                      <div className="flex items-start justify-between w-full">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="text-black text-base leading-5 tracking-[1px]">
                            {comment.author}
                          </span>
                          {comment.rating && (
                            <div className="flex items-center gap-3">
                              <CommentStarRating rating={comment.rating} />
                              <span className="text-[#121212] text-[15px] leading-normal tracking-[0.5px]">
                                ({comment.rating}.0)
                              </span>
                            </div>
                          )}
                        </div>
                        <span className="text-[#757575] text-sm leading-normal tracking-[1px] whitespace-nowrap">
                          {moment(comment.date).format('DD MMM YYYY')}
                        </span>
                      </div>
                      <p className="text-[#10152e] text-base leading-6 tracking-[1px] opacity-80 w-full">
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                  {index < combinedComments.slice(0, 2).length - 1 && (
                    <div className="w-full h-px bg-gray-200 mt-8"></div>
                  )}
                </div>
              ))}
            </div>
          )}
          {isLoadingComments && (
            <div className="flex flex-col gap-6 mt-8">
              <div className="animate-pulse">
                <div className="flex gap-5 items-start">
                  <div className="w-[60px] h-[60px] bg-gray-300 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
              <div className="animate-pulse">
                <div className="flex gap-5 items-start">
                  <div className="w-[60px] h-[60px] bg-gray-300 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {commentsError && (
            <div className="p-8 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center mt-8">
              <p>{commentsError}</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Comment Section */}
      <div className="flex flex-col gap-8 pb-8 w-full">
        <div className="max-w-[1200px] mx-auto px-6 w-full">
          <div className="flex items-center gap-2">
            <div className="w-1 h-3 bg-black rounded-xl"></div>
            <h2 className="text-black text-xl font-medium leading-normal tracking-[1px] capitalize">
              Add a comment
            </h2>
          </div>

          <div className="flex flex-col gap-5 mt-8 w-full">
            <div className="flex flex-col lg:flex-row gap-6 w-full">
              <div className="flex-1 flex flex-col gap-5">
                {/* Name Field */}
                <div className="relative w-full">
                  <label className="text-[#3e3232] text-base font-medium tracking-[1px] capitalize block">
                    name
                  </label>
                  <input
                    type="text"
                    value={newComment.name}
                    onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                    className="w-full h-12 bg-[#f5f5f5] rounded-xl px-4 mt-2 text-black border-0 outline-none"
                  />
                </div>

                {/* Email Field */}
                <div className="relative w-full">
                  <label className="text-[#3e3232] text-base font-medium tracking-[1px] capitalize block">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newComment.email}
                    onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                    className="w-full h-12 bg-[#f5f5f5] rounded-xl px-4 mt-2 text-black border-0 outline-none"
                  />
                </div>
              </div>

              {/* Comment Field */}
              <div className="flex-1 flex flex-col gap-4 h-auto lg:h-[184px]">
                <label className="text-[#3e3232] text-base font-medium tracking-[1px] capitalize">
                  Comment
                </label>
                <textarea
                  value={newComment.comment}
                  onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                  placeholder="Write anything..."
                  className="flex-1 min-h-[120px] lg:min-h-0 bg-[#f5f5f5] rounded-[10px] px-6 py-6 text-black placeholder-gray-400 resize-none border-0 outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch lg:items-center w-full">
              {/* Rating Section */}
              <div className="flex-1 bg-[#f5f5f5] rounded-xl px-4 py-3 lg:py-1 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 lg:gap-0">
                <span className="text-black text-base font-medium tracking-[1px] capitalize">
                  Rate the usefulness of the article
                </span>
                <div className="overflow-x-auto">
                  <InteractiveStarRating
                    rating={newComment.rating}
                    onRatingChange={(rating) => setNewComment({ ...newComment, rating })}
                  />
                </div>
              </div>

              {/* Send Button */}
              <button className="bg-black flex items-center gap-2 px-4 py-3 rounded-xl h-12 w-full lg:w-[109px] justify-center hover:bg-gray-800 transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                <span className="text-white text-sm font-medium tracking-[0.14px] capitalize leading-5">
                  Send
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <RelatedArticles articles={relatedArticles} />
    </div>
    </>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const blogs = await getAllBlogs();
    const paths = blogs.map((blog) => ({
      params: { slug: generateSlug(blog.title) },
    }));

    return {
      paths,
      fallback: 'blocking', // Generate pages on-demand if not pre-rendered
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;

    // Use the new comprehensive API endpoint
    const blogData = await getBlogBySlug(slug);

    return {
      props: {
        blogData,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true,
    };
  }
};