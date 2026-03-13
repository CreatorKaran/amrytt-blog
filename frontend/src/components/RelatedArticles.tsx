import { Blog } from '@/types/blog';
import moment from 'moment';
import Link from 'next/link';
import { generateSlug } from '@/lib/api';

interface RelatedArticlesProps {
  articles: Blog[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <section className="bg-[#f5f5f6] py-8 md:py-16 w-full">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col items-center mb-8 md:mb-16">
          <div className="max-w-[984px] text-center">
            <h2 className="text-[#262d4d] text-2xl md:text-4xl lg:text-[48px] font-semibold leading-tight md:leading-[66px] tracking-[1px]">
              Related articles
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center max-w-[984px] mx-auto">
          {articles?.slice(0, 4).map((article) => {
            const slug = generateSlug(article?.title);
            return (
              <Link href={`/blog/${slug}`} key={article?._id} className="flex flex-col gap-3 w-full hover:shadow-2xl">
                <div className="relative w-full">
                  <img
                    src={article?.image}
                    alt={article?.title}
                    className="w-full h-[240px] object-cover"
                  />
                </div>
                <h3 title={article?.title} className="text-[#10152e] text-xl font-semibold leading-[30px] tracking-[1px] capitalize px-1 line-clamp-2">
                  {article?.title}
                </h3>
                <div className="flex flex-col items-center justify-center px-1">
                  <p className="text-[#4e5265] text-base leading-6 tracking-[1px] line-clamp-3">
                    {article?.excerpt}
                  </p>
                </div>
                <div className="flex items-start gap-1 text-black text-sm font-medium leading-5 tracking-[1px] text-center px-1">
                  <span>By</span>
                  <span>{article?.author.name}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
}