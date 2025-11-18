// src/pages/ArticlePage.jsx (★★★★★ 究極の最終分岐バージョン ★★★★★)
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PasswordPrompt from '../components/PasswordPrompt';
import { articles } from '../data/gameData';

const getSortedArticles = () => {
  return Object.values(articles).sort((a, b) => new Date(a.date) - new Date(b.date));
};

const ArticlePage = () => {
  const { articleId = '1' } = useParams();
  const article = articles[articleId];
  const navigate = useNavigate();

  const [unlocked, setUnlocked] = useState({});
  const [showFinalChoice, setShowFinalChoice] = useState(false);

  // ★★★ ここからが、最後の、そして、最も重要な、修正です ★★★
  const [showReportPrompt, setShowReportPrompt] = useState(false); // 通報プロンプトの表示状態
  const [locationInput, setLocationInput] = useState(''); // 居場所の入力値
  const [reportError, setReportError] = useState(''); // 通報エラーメッセージ

  useEffect(() => {
    setShowFinalChoice(false);
    setShowReportPrompt(false);
    setLocationInput('');
    setReportError('');
  }, [articleId]);

  const handleCorrectPassword = (id) => setUnlocked({ ...unlocked, [id]: true });
  
  // 最終分岐の選択肢を処理する
  const handleChoice = (choice) => {
    if (choice === 'report') {
      setShowReportPrompt(true); // 「通報する」が押されたら、入力欄を表示
    } else {
      navigate('/ending/2'); // 「見過ごす」が押されたら、エンディング2へ
    }
  };

  // 居場所の通報を処理する
  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (locationInput.toLowerCase() === '水族館') {
      navigate('/ending/1'); // 正解なら、エンディング1へ
    } else {
      navigate('/ending/3'); // 不正解なら、エンディング3へ
    }
  };
  // ★★★ ここまでが、最後の、そして、最も重要な、修正です ★★★

  const handleFinalArticleClick = () => { if (article?.isFinal) setShowFinalChoice(true); };

  const sortedArticles = getSortedArticles();
  const currentIndex = sortedArticles.findIndex(a => a.id === articleId);
  const prevArticle = sortedArticles[currentIndex - 1];
  const nextArticle = sortedArticles[currentIndex + 1];

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
              <p style={{ whiteSpace: 'pre-wrap' }}>{article.content}</p>
              {article.image && <img src={article.image} alt="記事の画像" style={{ maxWidth: '300px', border: '1px solid #ccc', marginTop: '15px' }}/>}
              
              {article.isFinal && (
                !showFinalChoice ? (
                  <div style={{ border: '1px dashed #999', padding: '10px', marginTop: '20px', textAlign: 'center', color: '#777' }}><p>読み終えたら、画面のどこかをクリックしてください。</p></div>
                ) : (
                  <div className={'final-choice active'}>
                    {/* ★★★ 究極の最終分岐の、表示ロジック ★★★ */}
                    {!showReportPrompt ? (
                      <div>
                        <h3>あなたはどうしますか？</h3>
                        <button onClick={() => handleChoice('report')}>警察に通報する</button>
                        <button onClick={() => handleChoice('overlook')}>……見過ごす</button>
                      </div>
                    ) : (
                      <div>
                        <h3>湊の居場所を、伝えてください。</h3>
                        <form onSubmit={handleReportSubmit}>
                          <input
                            type="text"
                            value={locationInput}
                            onChange={(e) => setLocationInput(e.target.value)}
                            autoFocus
                            placeholder="場所を入力"
                            style={{ padding: '8px' }}
                          />
                          <button type="submit" style={{ marginLeft: '10px', padding: '8px' }}>通報する</button>
                        </form>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          ) : (
            <PasswordPrompt articleId={articleId} hint={article.hint} onCorrectPassword={handleCorrectPassword} />
          )}
        </div>
        <div className="article-navigation">
          {prevArticle && <Link to={`/article/${prevArticle.id}`}>&laquo; 前の記事へ: {prevArticle.title}</Link>}
          {nextArticle && <Link to={`/article/${nextArticle.id}`} style={{ marginLeft: 'auto' }}>次の記事へ: {nextArticle.title} &raquo;</Link>}
        </div>
      </article>
    </>
  );
};

export default ArticlePage;