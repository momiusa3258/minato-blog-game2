// src/App.jsx (修正後)
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import BlogLayout from './components/BlogLayout';
import ArticlePage from './pages/ArticlePage';
import ProfilePage from './pages/ProfilePage';
import EndingPage from './pages/EndingPage';
import ThemePage from './pages/ThemePage';
import HomePage from './pages/HomePage'; // ★★★ 新しい玄関を、インポートします ★★★

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogLayout />}>
          {/* ★★★ 始まりの場所を、HomePageに変更します ★★★ */}
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