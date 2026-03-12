import { Blog } from '@/types/blog';
import moment from 'moment';
import Link from 'next/link';
import { generateSlug } from '@/lib/api';

interface ExploreMoreProps {
  articles: Blog[];
}

export default function ExploreMore({ articles }: ExploreMoreProps) {
  if (articles?.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-6 lg:gap-10 w-full">
      <h3 className="text-[#10152e] text-xl font-semibold leading-7 tracking-[1px]">
        Explore more
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-10 w-full">
        {articles?.slice(0, 3).map((article, index) => {
          const slug = generateSlug(article.title);
          return(
          <Link href={`/blog/${slug}`} key={article._id} className="hover:shadow-2xl flex flex-col gap-4 lg:gap-6 w-full">
            <div className="flex flex-col gap-4 lg:gap-6 w-full">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-[165px] object-cover"
              />
              <div className="flex flex-col gap-3 lg:gap-4 w-full px-1">
                <div className="flex items-center gap-2">
                  <span className="text-black text-sm font-medium tracking-[1px]">
                    {article.category}
                  </span>
                  <div className="w-0 h-4 border-l-2 border-gray-300"></div>
                  <span className="text-[#757575] text-sm tracking-[1px] whitespace-nowrap">
                    {moment(article.date).format('DD MMM YYYY')}
                  </span>
                </div>
                <p className="text-black text-base leading-6 tracking-[1px] w-full">
                  {article.title}
                </p>
              </div>
            </div>
          </Link>
        )})}
      </div>
    </section>
  );
}