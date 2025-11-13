// src/pages/HomePage.jsx (★★★★★ 最終完成版 ★★★★★)
import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/gameData';

const HomePage = () => {
  const allArticles = Object.values(articles);
  const sortedArticles = allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <h2 className="article-title">全ての記事</h2>
      
      <ul className="theme-article-list" style={{ listStyle: 'none', paddingLeft: 0 }}>
        {sortedArticles.map(article => (
          <li key={article.id} style={{ marginBottom: '20px', borderBottom: '1px dotted #ccc', paddingBottom: '20px' }}>
            
            {/* ★★★ ここからが、最後の修正です ★★★ */}
            <p className="article-meta" style={{ margin: '0 0 8px 0' }}>
              <time>{article.date}</time> | 
              <span className="category">{article.theme}</span>
            </p>

            <Link to={`/article/${article.id}`} style={{ fontSize: '20px', textDecoration: 'none', color: '#0066cc', fontWeight: 'bold' }}>
              {article.title} 
              {article.isProtected && <span style={{ marginLeft: '10px', color: '#999' }}>[鍵]</span>}
            </Link>
            {/* ★★★ ここまでが、最後の修正です ★★★ */}
            
            {article.isProtected ? (
              <p style={{ margin: '8px 0 0', color: '#666', fontStyle: 'italic' }}>
                この記事はパスワードで保護されています...
              </p>
            ) : (
              <p style={{ margin: '8px 0 0', color: '#666' }}>
                {article.content.substring(0, 100)}...
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;