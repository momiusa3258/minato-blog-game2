// src/pages/GameClearPage.jsx (新規作成)
import React from 'react';
import { Link } from 'react-router-dom';
import './IntroPage.css'; // ← 序章の、美しいデザインを、再利用します

const GameClearPage = () => {
  // ★★★ ここに、あなたの、Microsoft Formsの、URLを、貼り付けてください ★★★
  const surveyUrl = "https://forms.office.com/r/GV3W610kqU";

  return (
    <div className="intro-container">
      <div className="intro-box">
        <h1>全ての記録を見つけ出してくれて、ありがとう。</h1>
        <p style={{ textAlign: 'center' }}>
          これにて「湊の個人ブログ」の物語は、終わりです。<br /><br />

          もしよろしければ、<br />
          あなたの、この物語体験についての「声」をお聞かせください。<br />
          新しい物語の、参考にさせていただきます。
        </p>
        
        {/* ★★★ aタグを、新しいタブで開くように、進化させます ★★★ */}
        <a href={surveyUrl} target="_blank" rel="noopener noreferrer" className="button">
          アンケートに答える
        </a>

        <div style={{ marginTop: '30px', fontSize: '14px' }}>
          <Link to="/" style={{ color: '#888' }}>もう一度、最初からプレイする</Link>
        </div>
      </div>
    </div>
  );
};

export default GameClearPage;