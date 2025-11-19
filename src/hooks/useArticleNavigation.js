// src/hooks/useArticleNavigation.js (新規作成)
import { articles } from '../data/gameData';

const getSortedArticles = () => {
  return Object.values(articles).sort((a, b) => new Date(a.date) - new Date(b.date));
};

export const useArticleNavigation = (articleId) => {
  const sortedArticles = getSortedArticles();
  const currentIndex = sortedArticles.findIndex(a => a.id === articleId);
  
  const prevArticle = sortedArticles[currentIndex - 1];
  const nextArticle = sortedArticles[currentIndex + 1];

  return { prevArticle, nextArticle };
};