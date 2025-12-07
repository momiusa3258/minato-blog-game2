// src/pages/HomePage.jsx 
import React from 'react';
import '../css/ArticlePage.css'; 
import { Link } from 'react-router-dom';
import { useArticles, stripCommands, truncateText } from '../hooks/useGameLogic';

const HomePage = ({ isTruthRevealed }) => {
  const { allArticles } = useArticles();

  const visibleArticles = allArticles.filter(article => {
    if (article.isFinal && !article.isTrueEnd) return false;
    if (article.isHidden && !isTruthRevealed) return false;
    return true;
  });

  return (
    <div>
      <h2 className="article-title">全ての記事</h2>
      
       <ul className="theme-article-list">
        {visibleArticles.map(article => (
          <li key={article.id} style={{ backgroundColor: article.theme === '緊急更新' ? '#fff0f0' : 'transparent' }}>
            <p className="article-meta">
              <time>{article.date}</time> | 
              <span className="category">{article.theme}</span>
            </p>
            <Link to={`/home/article/${article.id}`}>
              {article.title} 
              {article.isProtected && <span>[鍵]</span>}
            </Link>
            {article.isProtected ? (
              <p>この記事はパスワードで保護されています...</p>
            ) : (
              <p>{truncateText(stripCommands(article.content), 100)}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default HomePage;