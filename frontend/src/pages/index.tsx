import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { Blog } from '@/types/blog';
import { getAllBlogs, generateSlug } from '@/lib/api';
import { generateHomeMetadata } from '@/lib/metadata';

interface HomeProps {
  blogs: Blog[];
}

export default function Home({ blogs }: HomeProps) {
  return (
    <>
      {generateHomeMetadata({ blogs })}
      
      <Layout>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
          Fitness Blog
        </h1> */}
        <div className="flex flex-col items-center justify-center py-8 md:py-16 w-full">
        <div className="flex flex-col items-center gap-1 text-center max-w-4xl px-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1 text-[#262d4d] text-sm font-bold tracking-[1px] uppercase mb-4">
            <Link href={'/'}><span className="font-bold">Home</span></Link>
          </div>

          {/* Title */}
          <h1 className="text-[#10152e] text-2xl md:text-4xl lg:text-[48px] font-semibold leading-tight md:leading-[66px] tracking-[1px] text-center">
            {`Amrytt Blogs`}
          </h1>
        </div>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.map((article) => {
            const slug = generateSlug(article.title);
            return (
              <Link href={`/blog/${slug}`} key={article._id} className="flex flex-col gap-3 w-full hover:shadow-2xl">
                <div className="relative w-full">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-[240px] object-cover"
                  />
                </div>
                <h3 title={article.title} className="text-[#10152e] text-xl font-semibold leading-[30px] tracking-[1px] capitalize px-1 line-clamp-2">
                  {article.title}
                </h3>
                <div className="flex flex-col items-center justify-center px-1">
                  <p className="text-[#4e5265] text-base leading-6 tracking-[1px] line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
                <div className="flex items-start gap-1 text-black text-sm font-medium leading-5 tracking-[1px] text-center px-1">
                  <span>By</span>
                  <span>{article.author.name}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </Layout>
    </>
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
