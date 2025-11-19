// src/components/ContentRenderer.jsx (新規作成)
import React from 'react';

const ContentRenderer = ({ content }) => {
  const parts = content.split(/(\[HIDDEN\].*?\[\/HIDDEN\]|\[IMAGE:.+?\])/g);

  return parts.map((part, index) => {
    if (part.startsWith('[IMAGE:')) {
      const imageUrl = part.substring(7, part.length - 1);
      return <img key={index} src={imageUrl} alt="記事の画像" style={{ maxWidth: '300px', border: '1px solid #ccc', marginTop: '15px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />;
    }
    
    if (part.startsWith('[HIDDEN]')) {
      const hiddenText = part.substring(8, part.length - 9);
      return <span key={index} className="hidden-text">{hiddenText}</span>;
    }

    if (part.trim() === '') return null;
    return <p key={index} style={{ whiteSpace: 'pre-wrap' }}>{part}</p>;
  });
};

export default ContentRenderer;