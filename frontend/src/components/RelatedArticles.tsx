import React from 'react';
import { Blog } from '@/types/blog';

interface RelatedArticlesProps {
  articles: Blog[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <section className="py-12 border-t border-gray-200">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Related articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <a 
            key={article.id} 
            href={`/blog/${article.slug}`}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-250 hover:-translate-y-1 hover:shadow-lg hover:border-blue-600 flex flex-col"
          >
            <div className="w-full aspect-[16/10] overflow-hidden bg-gray-100">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-250 hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col gap-2 flex-1">
              <h3 className="text-lg font-semibold leading-snug text-gray-900 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">
                {article.excerpt}
              </p>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  {article.category}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(article.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
