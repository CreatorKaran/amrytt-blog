import { GetStaticProps } from 'next';
import moment from 'moment';
import Layout from '@/components/Layout';
import { Blog } from '@/types/blog';
import { getAllBlogs, generateSlug } from '@/lib/api';

interface HomeProps {
  blogs: Blog[];
}

export default function Home({ blogs }: HomeProps) {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
          Fitness Blog
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => {
            const slug = generateSlug(blog.title);
            return (
              <a 
                key={blog._id} 
                href={`/blog/${slug}`}
                className="border border-gray-200 rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg block"
              >
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 text-gray-900">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span className="font-semibold text-blue-600">{blog.category}</span>
                    <span>{moment(blog.date).format('MMM DD, YYYY')}</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const blogs = await getAllBlogs();
    
    return {
      props: {
        blogs,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return {
      props: {
        blogs: [],
      },
      revalidate: 10,
    };
  }
};
