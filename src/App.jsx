// src/App.jsx (★★★★★ 最終完成版 ★★★★★)
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import BlogLayout from './components/BlogLayout';
import ArticlePage from './pages/ArticlePage';
import ProfilePage from './pages/ProfilePage';
import EndingPage from './pages/EndingPage';
import ThemePage from './pages/ThemePage';
import HomePage from './pages/HomePage';
import IntroPage from './pages/IntroPage'; // ★★★ 新しい正門を、インポートします ★★★
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* ★★★ 始まりの場所を、IntroPageに変更します ★★★ */}
        <Route path="/" element={<IntroPage />} />

        {/* ★★★ ブログ本体は、/home から始まるようにします ★★★ */}
        <Route path="/home" element={<BlogLayout />}>
          <Route index element={<HomePage />} />
          <Route path="article/:articleId" element={<ArticlePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="theme/:themeName" element={<ThemePage />} />
        </Route>
        
        <Route path="/ending/:endingId" element={<EndingPage />} />
      </Routes>
    </Router>
  );
}
export default App;