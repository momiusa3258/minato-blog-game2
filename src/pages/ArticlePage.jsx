// src/pages/ArticlePage.jsx (★★★★★ 究極のリファクタリング版 ★★★★★)
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PasswordPrompt from '../components/PasswordPrompt';
import ContentRenderer from '../components/ContentRenderer'; // ← 巻物を、インポート
import FinalChoice from '../components/FinalChoice';       // ← 舞台装置を、インポート
import { useArticleNavigation } from '../hooks/useArticleNavigation'; // ← 賢者を、インポート
import { articles } from '../data/gameData';

const ArticlePage = () => {
  const { articleId = '1' } = useParams();
  const article = articles[articleId];
  
  const [unlocked, setUnlocked] = useState({});
  const [showFinalChoice, setShowFinalChoice] = useState(false);
  
  // ▼▼▼ 時の賢者に、全てを、委ねます ▼▼▼
  const { prevArticle, nextArticle } = useArticleNavigation(articleId);

  useEffect(() => {
    setShowFinalChoice(false);
  }, [articleId]);

  const handleCorrectPassword = (id) => setUnlocked({ ...unlocked, [id]: true });
  const handleFinalArticleClick = () => { if (article?.isFinal) setShowFinalChoice(true); };

  if (!article) return <p>記事が見つかりません。<Link to="/">ブログのトップへ</Link></p>;
  const showContent = !article.isProtected || unlocked[articleId];

  return (
    <>
      <div className={`glitch-overlay ${showFinalChoice ? 'active' : ''}`}></div>
      <article className="post">
        <h2 className="article-title">{showContent ? article.title : article.theme}</h2>
        <p className="article-meta"><time>{article.date} 10:00:00</time> | <span className="category">{article.theme}</span></p>
        
        <div className="article-body">
          {showContent ? (
            <div onClick={handleFinalArticleClick}>
              
              {/* ▼▼▼ 魔法の巻物が、全てを、描きます ▼▼▼ */}
              <ContentRenderer content={article.content} />
              
              {article.isFinal && !showFinalChoice && (
                  <div style={{ border: '1px dashed #999', padding: '10px', marginTop: '20px', textAlign: 'center', color: '#777' }}>
                    <p>読み終えたら、画面のどこかをクリックしてください。</p>
                  </div>
              )}
            </div>
          ) : (
            <PasswordPrompt 
              articleId={articleId} 
              hint={article.hint} 
              onCorrectPassword={handleCorrectPassword}
            />
          )}
        </div>

        {/* ▼▼▼ 舞台装置が、クライマックスを、演出します ▼▼▼ */}
        <FinalChoice isVisible={showFinalChoice} />
        
        <div className="article-navigation">
          {prevArticle && <Link to={`/article/${prevArticle.id}`}>&laquo; 前の記事へ: {prevArticle.title}</Link>}
          {nextArticle && <Link to={`/article/${nextArticle.id}`} style={{ marginLeft: 'auto' }}>次の記事へ: {nextArticle.title} &raquo;</Link>}
        </div>
      </article>
    </>
  );
};

export default ArticlePage;