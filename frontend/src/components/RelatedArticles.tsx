import { Blog } from '@/types/blog';
import moment from 'moment';
import Link from 'next/link';
import { generateSlug } from '@/lib/api';

interface RelatedArticlesProps {
  articles: Blog[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    // <section className="py-12 border-t border-gray-200">
    //   <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Related articles</h2>
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    //     {articles.map((article) => {
    //       const slug = generateSlug(article.title);
    //       return (
    //         <Link
    //           key={article._id}
    //           href={`/blog/${slug}`}
    //           className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-250 hover:-translate-y-1 hover:shadow-lg hover:border-blue-600 flex flex-col"
    //         >
    //           <div className="w-full aspect-[16/10] overflow-hidden bg-gray-100">
    //             <img
    //               src={article.image}
    //               alt={article.title}
    //               className="w-full h-full object-cover transition-transform duration-250 hover:scale-105"
    //             />
    //           </div>
    //           <div className="p-6 flex flex-col gap-2 flex-1">
    //             <h3 className="text-lg font-semibold leading-snug text-gray-900 line-clamp-2">
    //               {article.title}
    //             </h3>
    //             <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">
    //               {article.excerpt}
    //             </p>
    //             <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
    //               <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
    //                 {article.category}
    //               </span>
    //               <span className="text-xs text-gray-400">
    //                 {moment(article.date).format('MMM DD, YYYY')}
    //               </span>
    //             </div>
    //           </div>
    //         </Link>
    //       );
    //     })}
    //   </div>
    // </section>

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
    </section>
  );
}