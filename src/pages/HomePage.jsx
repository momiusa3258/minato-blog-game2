// src/pages/HomePage.jsx (改装後)
import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/gameData';

const HomePage = () => {
  // ★★★ 全ての記事を、対象にします ★★★
  const allArticles = Object.values(articles);

  // 記事IDの降順（新しい順）に並び替える
  const sortedArticles = allArticles.sort((a, b) => b.id - a.id);

  return (
    <div>
      <h2 className="article-title">全ての記事</h2>
      
      <ul className="theme-article-list" style={{ listStyle: 'none', paddingLeft: 0 }}>
        {sortedArticles.map(article => (
          <li key={article.id} style={{ marginBottom: '20px', borderBottom: '1px dotted #ccc', paddingBottom: '20px' }}>
            <Link to={`/article/${article.id}`} style={{ fontSize: '20px', textDecoration: 'none', color: '#0066cc', fontWeight: 'bold' }}>
              {article.title} 
              {/* ★★★ 保護された記事には、鍵マークを表示します ★★★ */}
              {article.isProtected && <span style={{ marginLeft: '10px', color: '#999' }}>[鍵]</span>}
            </Link>
            <p style={{ margin: '8px 0 0', color: '#555', fontSize: '13px' }}>
              テーマ: {article.theme}
            </p>
            
            {/* ★★★ 保護された記事は、中身を隠します ★★★ */}
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