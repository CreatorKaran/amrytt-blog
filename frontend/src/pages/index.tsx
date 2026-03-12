import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { Blog } from '@/types/blog';
import { getAllBlogs, generateSlug } from '@/lib/api';

interface HomeProps {
  blogs: Blog[];
}

export default function Home({ blogs }: HomeProps) {
  const siteTitle = "Amrytt Fitness Blog - Expert Fitness Tips & Guides";
  const siteDescription = "Discover expert fitness tips, workout routines, nutrition advice, and wellness guides. Join our community of fitness enthusiasts and transform your health journey.";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://amrytt-blog.com";

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content="fitness, workout, nutrition, health, wellness, exercise, gym, training, cardio, strength" />
        <meta name="author" content="Amrytt Fitness" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={`${siteUrl}/images/og-home.jpg`} />
        <meta property="og:site_name" content="Amrytt Fitness Blog" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={siteUrl} />
        <meta property="twitter:title" content={siteTitle} />
        <meta property="twitter:description" content={siteDescription} />
        <meta property="twitter:image" content={`${siteUrl}/images/og-home.jpg`} />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={siteUrl} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Amrytt Fitness Blog",
              "description": siteDescription,
              "url": siteUrl,
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${siteUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Amrytt Fitness",
                "url": siteUrl
              }
            })
          }}
        />
        
        {/* Blog List Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": blogs.map((blog, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "BlogPosting",
                  "headline": blog.title,
                  "description": blog.excerpt,
                  "url": `${siteUrl}/blog/${generateSlug(blog.title)}`,
                  "datePublished": blog.date,
                  "author": {
                    "@type": "Person",
                    "name": blog.author.name
                  },
                  "image": blog.image
                }
              }))
            })
          }}
        />
      </Head>
      
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
