// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import BlogLayout from './components/BlogLayout';
import ArticlePage from './pages/ArticlePage';
import ProfilePage from './pages/ProfilePage';
import EndingPage from './pages/EndingPage';
import ThemePage from './pages/ThemePage';
import HomePage from './pages/HomePage';
import IntroPage from './pages/IntroPage';
import GameClearPage from './pages/GameClearPage';

// フックを読み込みます（コンポーネントのScrollToTopは削除したので消す）
import { useScrollToTop } from './hooks/useGameLogic';

function App() {
  // ここで「魔法」を唱えます（ページ遷移時に上に戻る）
  useScrollToTop();

  // 記憶（鍵の解除状態）
  const [unlocked, setUnlocked] = useState({});
  // 隠しルート解放フラグ
  const [isTruthRevealed, setIsTruthRevealed] = useState(false);

  // 鍵解除時の処理
  const handleCorrectPassword = (id) => {
    setUnlocked(prev => ({ ...prev, [id]: true }));
  };

  // チャットで謎を解いた時に実行される関数
  const handleUnlockTruth = () => {
    if (!isTruthRevealed) {
      setIsTruthRevealed(true);
      alert("【新着通知】\n\n記事が新しく更新されました。\nタイトル：【最新】真実");
    }
  };

  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      
      <Route path="/home" element={<BlogLayout isTruthRevealed={isTruthRevealed} />}>
        
        <Route index element={<HomePage isTruthRevealed={isTruthRevealed} />} />
        
        <Route 
          path="article/:articleId" 
          element={
            <ArticlePage 
              unlocked={unlocked} 
              onCorrectPassword={handleCorrectPassword} 
            />
          } 
        />
        
        <Route 
          path="profile" 
          element={<ProfilePage onUnlockTruth={handleUnlockTruth} />} 
        />
        
        <Route path="theme/:themeName" element={<ThemePage isTruthRevealed={isTruthRevealed} />} />
      </Route>

      <Route path="/ending/:endingId" element={<EndingPage />} />
      <Route path="/gameclear" element={<GameClearPage />} />
    </Routes>
  );
}

export default App;