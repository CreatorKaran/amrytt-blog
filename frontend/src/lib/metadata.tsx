import Head from 'next/head';
import { Blog } from '@/types/blog';

export interface MetadataConfig {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  url: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  twitterCreator?: string;
  structuredData?: any[];
}

export interface BlogMetadataProps {
  blog: Blog;
  comments?: any[];
  ratings?: any[];
}

export interface HomeMetadataProps {
  blogs: Blog[];
}

const DEFAULT_CONFIG = {
  siteName: 'Amrytt Fitness Blog',
  siteUrl: (typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL) || 'https://amrytt-blog.com',
  defaultImage: '/images/og-default.jpg',
  twitterHandle: '@amrytt_fitness',
  organizationName: 'Amrytt Fitness',
  logoUrl: '/images/logo.png'
};

// Helper function to generate slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function generateMetadata(config: MetadataConfig) {
  const {
    title,
    description,
    keywords,
    author,
    url,
    image = DEFAULT_CONFIG.defaultImage,
    type = 'website',
    publishedTime,
    modifiedTime,
    section,
    twitterCreator,
    structuredData = []
  } = config;

  const fullImageUrl = image.startsWith('http') ? image : `${DEFAULT_CONFIG.siteUrl}${image}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content={DEFAULT_CONFIG.siteName} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      {section && <meta property="article:section" content={section} />}
      
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImageUrl} />
      <meta property="twitter:site" content={DEFAULT_CONFIG.twitterHandle} />
      {twitterCreator && <meta property="twitter:creator" content={twitterCreator} />}
      
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={url} />
      
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data)
          }}
        />
      ))}
    </Head>
  );
}

export function generateHomeMetadata({ blogs }: HomeMetadataProps) {
  const title = "Amrytt Fitness Blog - Expert Fitness Tips & Guides";
  const description = "Discover expert fitness tips, workout routines, nutrition advice, and wellness guides. Join our community of fitness enthusiasts and transform your health journey.";
  const url = DEFAULT_CONFIG.siteUrl;

  const structuredData: any[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": DEFAULT_CONFIG.siteName,
      "description": description,
      "url": url,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${url}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": DEFAULT_CONFIG.organizationName,
        "url": url
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": blogs.map((blog, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "BlogPosting",
          "headline": blog.title,
          "description": blog.excerpt,
          "url": `${url}/blog/${generateSlug(blog.title)}`,
          "datePublished": blog.date,
          "author": {
            "@type": "Person",
            "name": blog.author.name
          },
          "image": blog.image
        }
      }))
    }
  ];

  return generateMetadata({
    title,
    description,
    keywords: "fitness, workout, nutrition, health, wellness, exercise, gym, training, cardio, strength",
    author: DEFAULT_CONFIG.organizationName,
    url,
    image: `${url}/images/og-home.jpg`,
    type: 'website',
    structuredData
  });
}

export function generateBlogMetadata({ blog, comments = [], ratings = [] }: BlogMetadataProps) {
  const url = `${DEFAULT_CONFIG.siteUrl}/blog/${generateSlug(blog.title)}`;
  const title = `${blog.title} | ${DEFAULT_CONFIG.siteName}`;
  const description = blog.excerpt || `Read ${blog.title} - Expert fitness advice and tips from ${blog.author.name}`;
  
  const averageRating = ratings.length > 0 
    ? ratings.reduce((sum: number, rating: any) => sum + rating.rating, 0) / ratings.length 
    : 0;

  const combinedComments = [
    ...comments,
    ...ratings.map((rating: any) => ({
      _id: rating._id,
      author: rating.author,
      comment: rating.review,
      date: rating.date,
      createdAt: rating.createdAt
    }))
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const structuredData: any[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": blog.title,
      "description": description,
      "image": blog.image,
      "url": url,
      "datePublished": blog.date,
      "dateModified": blog.updatedAt || blog.date,
      "author": {
        "@type": "Person",
        "name": blog.author.name,
        "image": blog.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author.name)}&background=2563eb&color=fff`
      },
      "publisher": {
        "@type": "Organization",
        "name": DEFAULT_CONFIG.organizationName,
        "url": DEFAULT_CONFIG.siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${DEFAULT_CONFIG.siteUrl}${DEFAULT_CONFIG.logoUrl}`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      },
      "articleSection": blog.category,
      "wordCount": blog.body ? blog.body.split(' ').length : 0,
      ...(averageRating > 0 && {
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": averageRating.toFixed(1),
          "reviewCount": ratings.length,
          "bestRating": "5",
          "worstRating": "1"
        }
      })
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": DEFAULT_CONFIG.siteUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Articles",
          "item": `${DEFAULT_CONFIG.siteUrl}/articles`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": blog.title,
          "item": url
        }
      ]
    }
  ];

  if (combinedComments.length > 0) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": combinedComments.slice(0, 5).map((comment: any) => ({
        "@type": "Question",
        "name": `Comment by ${comment.author}`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": comment.comment,
          "author": {
            "@type": "Person",
            "name": comment.author
          },
          "dateCreated": comment.date
        }
      }))
    };
    structuredData.push(faqSchema);
  }

  return generateMetadata({
    title,
    description,
    keywords: `${blog.category}, fitness, workout, ${blog.author.name}, health, wellness`,
    author: blog.author.name,
    url,
    image: blog.image,
    type: 'article',
    publishedTime: blog.date,
    modifiedTime: blog.updatedAt || blog.date,
    section: blog.category,
    twitterCreator: `@${blog.author.name.replace(/\s+/g, '').toLowerCase()}`,
    structuredData
  });
}