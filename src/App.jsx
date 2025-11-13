// src/App.jsx (★★★★★ 最終完成版 ★★★★★)
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import BlogLayout from './components/BlogLayout';
import ArticlePage from './pages/ArticlePage';
import ProfilePage from './pages/ProfilePage';
import EndingPage from './pages/EndingPage';
import ThemePage from './pages/ThemePage';
import HomePage from './pages/HomePage';
import ScrollToTop from './components/ScrollToTop'; // ★★★ 新しい魔法使いを、インポートします ★★★

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* ★★★ ここで、魔法使いを召喚します ★★★ */}
      <Routes>
        <Route path="/" element={<BlogLayout />}>
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