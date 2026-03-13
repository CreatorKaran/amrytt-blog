import { useState, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import moment from 'moment';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { Comment } from '@/types/blog';
import {
  getAllBlogs,
  getCommentsByBlogId,
  generateSlug,
  getBlogBySlug,
  BlogBySlugResponse,
  createComment,
  updateComment
} from '@/lib/api';
import { generateBlogMetadata } from '@/lib/metadata';
import Link from 'next/link';
import RelatedArticles from '@/components/RelatedArticles';
import ExploreMore from '@/components/ExploreMore';
import Navigation from '@/components/Navigation';
import CommentSkeleton from '@/components/CommentSkeleton';
import CommentCard from '@/components/CommentCard';
import InteractiveStarRating from '@/components/InteractiveStarRating';
import MessageIcon from '@/components/icons/Message';
import CommentStarRating from '@/components/CommentStarRating';

interface BlogPostProps {
  blogData: BlogBySlugResponse;
}

// Combine comments and ratings into a single display format
interface CombinedComment extends Comment { }

export default function BlogPost({ blogData }: BlogPostProps) {
  const { blog, relatedArticles, exploreMore, tourGuides, navigation } = blogData;
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    comment: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [currentExploreIndex, setCurrentExploreIndex] = useState(0);

  useEffect(() => {
    const fetchCommentsAndRatings = async () => {
      try {
        setIsLoadingComments(true);
        setCommentsError(null);

        // Fetch comments (now includes ratings)
        const commentsData = await getCommentsByBlogId(blog?._id);
        setComments(commentsData);
      } catch (error) {
        setCommentsError('Failed to load comments. Please try again later.');
        console.error('Error fetching comments:', error);
      } finally {
        setIsLoadingComments(false);
      }
    };

    fetchCommentsAndRatings();
  }, [blog?._id]);

  // Function to refresh comments after submission
  const refreshComments = async () => {
    try {
      const commentsData = await getCommentsByBlogId(blog?._id);
      setComments(commentsData);
    } catch (error) {
      console.error('Error refreshing comments:', error);
    }
  };

  // Handle comment update
  const handleCommentUpdate = (updatedComment: Comment & { rating?: number }) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment?._id === updatedComment?._id ? updatedComment : comment
      )
    );
    setEditingComment(null);
  };

  // Handle comment deletion
  const handleCommentDelete = (commentId: string) => {
    setComments(prevComments =>
      prevComments.filter(comment => comment?._id !== commentId)
    );
  };

  // Handle edit comment
  const handleEditComment = (comment: Comment) => {
    setEditingComment(comment);
    setNewComment({
      name: comment?.author,
      email: comment.email,
      comment: comment.comment,
      rating: comment.rating || 5
    });
  };

  // Handle form submission
  const handleSubmitComment = async () => {
    if (!newComment?.name?.trim() || !newComment?.comment?.trim()) {
      setSubmitError('Please fill in your name and comment.');
      return;
    }

    if (!newComment?.email?.trim()) {
      setSubmitError('Please fill in your email.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      if (editingComment) {
        // Update existing comment
        await updateComment(editingComment?._id, {
          comment: newComment.comment.trim(),
          rating: newComment.rating
        });

        // Update local state
        setComments(prevComments =>
          prevComments.map(comment =>
            comment?._id === editingComment?._id
              ? { ...comment, comment: newComment.comment.trim(), rating: newComment.rating }
              : comment
          )
        );

        setEditingComment(null);
      } else {
        // Create new comment
        await createComment(blog?._id, {
          author: newComment.name.trim(),
          email: newComment.email.trim(),
          comment: newComment.comment.trim(),
          rating: newComment.rating
        });

        // Refresh comments
        await refreshComments();
      }

      // Reset form
      setNewComment({
        name: '',
        email: '',
        comment: '',
        rating: 5
      });

      // Show success message briefly
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting comment:', error);
      setSubmitError(`Failed to ${editingComment ? 'update' : 'submit'} comment. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingComment(null);
    setNewComment({
      name: '',
      email: '',
      comment: '',
      rating: 5
    });
  };

  // Handle Previous button click
  const handlePrevious = () => {
    setCurrentExploreIndex(prevIndex => {
      if (prevIndex <= 0) {
        return exploreMore.length - 1; // Reset to last index if going negative
      }
      return prevIndex - 1;
    });
  };

  // Handle Next button click
  const handleNext = () => {
    setCurrentExploreIndex(prevIndex => {
      if (prevIndex >= exploreMore.length - 1) {
        return 0; // Reset to 0 if going beyond array length
      }
      return prevIndex + 1;
    });
  };
  // Combine comments and ratings for display
  const combinedComments: CombinedComment[] = comments
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <>
      {generateBlogMetadata({ blog, comments })}

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
              {blog?.title}
            </h1>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-[300px] md:h-[400px] lg:h-[560px] w-full overflow-hidden">
          <img
            src={blog?.image}
            alt={blog?.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className='px-3.5 md:px-7'>
          {/* Main Content Container */}
          <div className="flex justify-center md:flex-col lg:flex-row w-full">
            <div className="flex flex-col md:flex-row gap-5 w-full max-w-[1200px]">
              {/* Article Content */}
              <div className="flex flex-col gap-8 pb-16 md:max-w-[414px] lg:max-w-8/12 xl:max-0-10/12">
                {/* Article Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-[#e5e6ea] gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={blog?.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(blog?.author.name)}&background=2563eb&color=fff`}
                      alt={blog?.author.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-[#4e5265] text-base font-semibold tracking-[1px] uppercase">
                      {blog?.author.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[#4e5265] text-base font-semibold tracking-[1px] uppercase whitespace-nowrap">
                    <span>{moment(blog?.date).format('DD MMMM')}</span>
                    <span>{moment(blog?.date).format('YYYY')}</span>
                  </div>
                </div>

                {/* Article Excerpt */}
                <p className="text-[#10152e] text-base leading-6 tracking-[1px] w-full">
                  {blog?.excerpt}
                </p>

                {/* Article Body */}
                <div className="text-[#10152e] text-base leading-6 tracking-[1px] space-y-6">
                  <MarkdownRenderer content={blog?.body} />
                </div>

                {/* Author Section */}
                <div className="hidden lg:flex flex-col gap-8">
                  <div className="border-t border-[#e5e6ea] pt-6 h-[296px] px-6">
                    <div className="flex justify-center items-center gap-2 mb-3">
                      <span className="text-[#10152e] text-xl leading-[30px] tracking-[1px]">About</span>
                      <span className="text-[#10152e] text-xl leading-[30px] tracking-[1px]">{blog?.author.name}</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <img
                        src={blog?.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(blog?.author.name)}&background=2563eb&color=fff`}
                        alt={blog?.author.name}
                        className="w-[100px] h-[100px] rounded-full object-cover"
                      />
                      <p className="text-[#4e5265] text-base italic font-semibold leading-6 tracking-[1px] text-justify">
                        With over a decade in fitness, {blog?.author.name} specializes in strength training. Certified by NASM, he designs challenging yet achievable workout programs. His passion is helping clients build strength and confidence through personalized routines. Outside the gym, {blog?.author.name} enjoys running and outdoor adventures.
                      </p>
                    </div>
                  </div>
                  {/* Navigation Buttons */}
                  <Navigation navigation={navigation} />
                </div>
              </div>

              {/* Mobile Sidebar Slider */}
              <div className="w-full md:hidden py-6">
                <div className="flex flex-col gap-6">
                  {/* Explore More Mobile Slider */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[#10152e] text-xl font-semibold leading-7 tracking-[1px]">
                      Explore more
                    </h3>
                    <div className="overflow-x-hidden">
                      <div className="flex gap-4 pb-2 w-full">
                        {exploreMore?.length > 0 && (() => {
                          const article = exploreMore[currentExploreIndex];
                          const slug = generateSlug(article?.title);
                          return (
                            <Link href={`/blog/${slug}`} key={article?._id} className="hover:shadow-2xl flex flex-col gap-4 lg:gap-6 w-full">
                              <div className="flex flex-col gap-4 lg:gap-6 w-full">
                                <img
                                  src={article?.image}
                                  alt={article?.title}
                                  className="w-full h-[165px] object-cover"
                                />
                                <div className="flex flex-col gap-3 lg:gap-4 w-full px-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-black text-sm font-medium tracking-[1px]">
                                      {article?.category}
                                    </span>
                                    <div className="w-0 h-4 border-l-2 border-gray-300"></div>
                                    <span className="text-[#757575] text-sm tracking-[1px] whitespace-nowrap">
                                      {moment(article?.date).format('DD MMM YYYY')}
                                    </span>
                                  </div>
                                  <p className="text-black text-base leading-6 tracking-[1px] w-full">
                                    {article?.title}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          );
                        })()}
                      </div>
                      <div className="border-t border-[#e5e6ea] pt-8 min-h-[104px]">
                        <div className="flex flex-row justify-between items-start w-full gap-4">

                          <div className="flex flex-col gap-2 items-start flex-1">
                            <div
                              onClick={handlePrevious}
                              className="cursor-pointer flex items-center gap-3 px-4 py-2 border border-[#05091c] rounded-sm hover:bg-[#05091c] hover:text-white transition-colors group"
                            >
                              <svg className="w-4 h-4 rotate-90 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                              <span className="text-[#05091c] text-base font-normal leading-6 tracking-[1px] group-hover:text-white">Previous</span>
                            </div>
                          </div>



                          <div className="flex flex-col gap-2 items-end flex-1">
                            <div
                              onClick={handleNext}
                              className="cursor-pointer flex items-center gap-3 px-4 py-2 border border-[#05091c] rounded-sm hover:bg-[#05091c] hover:text-white transition-colors group"
                            >
                              <span className="text-[#05091c] text-base font-normal leading-6 tracking-[1px] group-hover:text-white">Next</span>
                              <svg className="w-4 h-4 -rotate-90 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tour Guides Mobile Slider */}
                  <div className="flex flex-col gap-6 lg:gap-10 w-full">
                    <h3 className="text-[#10152e] text-xl font-semibold leading-7 tracking-[1px]">
                      Tour Guides
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 lg:gap-6 w-full">
                      {tourGuides?.slice(0, 3).map((guide, index) => (
                        <div key={guide?._id} className="flex flex-col gap-4 lg:gap-6 w-full">
                          <div className="flex flex-col gap-3 lg:gap-4 w-full">
                            <div className="flex items-start gap-4 w-full">
                              <img
                                src={guide?.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(guide?.author.name)}&background=2563eb&color=fff`}
                                alt={guide?.author.name}
                                className="w-[60px] h-[60px] rounded-full object-cover shrink-0"
                              />
                              <div className="flex flex-col gap-1 flex-1 min-w-0">
                                <h4 className="text-black text-base leading-7 tracking-[1px]">
                                  {guide?.author.name}
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
                          {index < 2 && <div className="w-full h-px bg-gray-200 block"></div>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Sidebar */}
              <div className="w-full hidden md:block md:w-[263px] lg:w-[341px] order-first md:order-last">
                <div className="sticky top-6 md:px-4 px-5 py-6">
                  <div className="flex flex-col gap-10 lg:gap-[100px]">
                    {/* Explore More */}
                    <ExploreMore articles={exploreMore} />
                    {/* Tour Guides */}
                    <div className="flex flex-col gap-6 lg:gap-10 w-full">
                      <h3 className="text-[#10152e] text-xl font-semibold leading-7 tracking-[1px]">
                        Tour Guides
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 lg:gap-6 w-full">
                        {tourGuides?.slice(0, 3).map((guide, index) => (
                          <div key={guide?._id} className="flex flex-col gap-4 lg:gap-6 w-full">
                            <div className="flex flex-col gap-3 lg:gap-4 w-full">
                              <div className="flex items-start gap-4 w-full">
                                <img
                                  src={guide?.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(guide?.author.name)}&background=2563eb&color=fff`}
                                  alt={guide?.author.name}
                                  className="w-[60px] h-[60px] rounded-full object-cover shrink-0"
                                />
                                <div className="flex flex-col gap-1 flex-1 min-w-0">
                                  <h4 className="text-black text-base leading-7 tracking-[1px]">
                                    {guide?.author.name}
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
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Author Section */}
            <div className="hidden md:flex lg:hidden flex-col gap-8">
              <div className="border-t border-[#e5e6ea] pt-6 h-[296px] px-6">
                <div className="flex items-start justify-center gap-2 mb-3">
                  <span className="text-[#10152e] text-xl leading-[30px] tracking-[1px]">About</span>
                  <span className="text-[#10152e] text-xl leading-[30px] tracking-[1px]">{blog?.author.name}</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={blog?.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(blog?.author.name)}&background=2563eb&color=fff`}
                    alt={blog?.author.name}
                    className="w-[100px] h-[100px] rounded-full object-cover"
                  />
                  <p className="text-[#4e5265] text-base italic font-semibold leading-6 tracking-[1px] text-justify">
                    With over a decade in fitness, {blog?.author.name} specializes in strength training. Certified by NASM, he designs challenging yet achievable workout programs. His passion is helping clients build strength and confidence through personalized routines. Outside the gym, {blog?.author.name} enjoys running and outdoor adventures.
                  </p>
                </div>
              </div>
              {/* Navigation Buttons */}
              <Navigation navigation={navigation} />
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
                <div className="flex flex-col gap-6 mt-8 w-full">
                  {combinedComments.map((comment) => (
                    <CommentCard
                      key={comment?._id}
                      comment={comment}
                      onCommentUpdate={handleCommentUpdate}
                      onCommentDelete={handleCommentDelete}
                      onCommentEdit={handleEditComment}
                    />
                  ))}
                </div>
              )}

              {/* Empty State - No Comments */}
              {!isLoadingComments && !commentsError && combinedComments.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 mt-8 w-full">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-[#10152e] text-lg font-medium leading-6 tracking-[1px]">
                        You're the first to add comments
                      </h3>
                      <p className="text-[#4e5265] text-base leading-6 tracking-[1px] opacity-80">
                        Share your thoughts about this article and help others learn from your experience.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {isLoadingComments && (
                <CommentSkeleton />
              )}

              {commentsError && (
                <div className="p-8 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center mt-8">
                  <p>{commentsError}</p>
                </div>
              )}
            </div>
          </div>

          {/* Add/Edit Comment Section */}
          <div className="flex flex-col gap-8 pb-8 w-full">
            <div className="max-w-[1200px] mx-auto px-6 w-full">
              <div className="flex items-center gap-2">
                <div className="w-1 h-3 bg-black rounded-xl"></div>
                <h2 className="text-black text-xl font-medium leading-normal tracking-[1px] capitalize">
                  {editingComment ? 'Edit Comment' : 'Add a comment'}
                </h2>
              </div>

              {editingComment && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    You are editing your comment. Name and email fields are disabled during editing.
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-5 mt-8 w-full">
                <div className="flex flex-col md:flex-row gap-6 w-full">
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
                        disabled={!!editingComment}
                        className={`w-full h-12 rounded-xl px-4 mt-2 text-black border-0 outline-none transition-all ${editingComment
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-[#f5f5f5] hover:bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500'
                          }`}
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
                        disabled={!!editingComment}
                        className={`w-full h-12 rounded-xl px-4 mt-2 text-black border-0 outline-none transition-all ${editingComment
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-[#f5f5f5] hover:bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500'
                          }`}
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
                      className="flex-1 min-h-[120px] lg:min-h-0 bg-[#f5f5f5] rounded-[10px] px-6 py-6 text-black placeholder-gray-400 resize-none border-0 outline-none transition-all hover:bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 lg:gap-6 items-stretch lg:items-center w-full">
                  {/* Rating Section */}
                  <div className="flex-1 bg-[#f5f5f5] rounded-xl px-4 py-3 md:py-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0 transition-all hover:bg-gray-100">
                    <span className="text-black text-xs lg:text-base font-medium tracking-[1px] capitalize">
                      Rate the usefulness of the article
                    </span>
                    <div className="overflow-x-auto">
                      <InteractiveStarRating
                        rating={newComment.rating}
                        onRatingChange={(rating) => setNewComment({ ...newComment, rating })}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {editingComment && (
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-500 flex items-center gap-2 px-4 py-3 rounded-xl h-12 justify-center hover:bg-gray-600 transition-colors"
                      >
                        <span className="text-white text-sm font-medium tracking-[0.14px] capitalize leading-5">
                          Cancel
                        </span>
                      </button>
                    )}

                    {/* Send/Update Button */}
                    <button
                      onClick={handleSubmitComment}
                      disabled={isSubmitting}
                      className="bg-black flex items-center gap-2 px-4 py-3 rounded-xl h-12 w-full lg:w-[109px] justify-center hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <MessageIcon className="w-4 h-4 text-white" />
                          <span className="text-white text-sm font-medium tracking-[0.14px] capitalize leading-5">
                            {editingComment ? 'Update' : 'Send'}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {submitError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {submitError}
                  </div>
                )}

                {/* Success Message */}
                {submitSuccess && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                    Comment {editingComment ? 'updated' : 'submitted'} successfully! Thank you for your feedback.
                  </div>
                )}
              </div>
            </div>
          </div>

          <RelatedArticles articles={relatedArticles} />
        </div>
      </div>
    </>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const blogs = await getAllBlogs();
    const paths = blogs.map((blog) => ({
      params: { slug: generateSlug(blog?.title) },
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