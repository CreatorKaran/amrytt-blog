import React from 'react';
import { Blog } from '@/types/blog';

interface RelatedArticlesProps {
  articles: Blog[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <section className="related-articles">
      <h2 className="related-articles__title">Related articles</h2>
      <div className="related-articles__grid">
        {articles.map((article) => (
          <a 
            key={article.id} 
            href={`/blog/${article.slug}`}
            className="related-article-card"
          >
            <div className="related-article-card__image-wrapper">
              <img 
                src={article.image} 
                alt={article.title}
                className="related-article-card__image"
              />
            </div>
            <div className="related-article-card__content">
              <h3 className="related-article-card__title">{article.title}</h3>
              <p className="related-article-card__excerpt">{article.excerpt}</p>
              <div className="related-article-card__meta">
                <span className="related-article-card__category">{article.category}</span>
                <span className="related-article-card__date">
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
