// src/hooks/useGameLogic.js
import { useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { articles } from '../data/gameData';

// --- 1. 記事データを管理するロジック ---
export const useArticles = () => {
  const sortedAll = useMemo(() => {
    return Object.values(articles).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, []);

  const publicArticles = useMemo(() => {
    return sortedAll
      .filter(article => !article.isFinal) // 最後の記事を隠す
      .sort((a, b) => new Date(b.date) - new Date(a.date)); //ここで「新しい順（降順）」に並べ替え 
  }, [sortedAll]);

  return { 
    allArticles: sortedAll,      // ナビゲーション用（昇順）
    publicArticles: publicArticles // 表示用（降順）
  };
};

// --- 2. 記事の前後ナビゲーションを管理するロジック ---
export const useArticleNavigation = (articleId) => {
  // ナビゲーション計算には「物語順（昇順）」のリストを使います
  const { allArticles } = useArticles();

  const currentIndex = allArticles.findIndex(a => a.id === articleId);
      
  const prevArticle = allArticles[currentIndex - 1];
  let nextArticle = allArticles[currentIndex + 1];

  // 特定の記事（復讐の終わり）の場合、次の記事へのリンクを消す
  if (articleId === 'sdjkjklklj') {
    nextArticle = null;
  }

  return { prevArticle, nextArticle };
};

// --- 3. ページ遷移時にトップへスクロールするロジック ---
export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

// --- ユーティリティ関数 ---

// 白文字などのコマンドを除去する関数
export const stripCommands = (content) => {
  if (!content) return '';
  return content.replace(/(\[HIDDEN\].*?\[\/HIDDEN\]|\[IMAGE:.+?\]|\[LINK:.+?\])/g, '');
};

// 文字数を制限して「...」をつける関数
export const truncateText = (text, length) => {
  if (!text) return '';
  const cleanedText = text.replace(/\n/g, ' ');
  if (cleanedText.length <= length) {
    return cleanedText;
  }
  return cleanedText.substring(0, length) + '...';
};