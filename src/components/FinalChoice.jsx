// src/components/FinalChoice.jsx (新規作成)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FinalChoice = ({ isVisible }) => {
  const navigate = useNavigate();
  const [showReportPrompt, setShowReportPrompt] = useState(false);
  const [locationInput, setLocationInput] = useState('');

  const handleChoice = (choice) => {
    if (choice === 'report') {
      setShowReportPrompt(true);
    } else {
      navigate('/ending/2');
    }
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (locationInput.toLowerCase() === '水族館'||'すいぞくかん'||'suizokukan'||'suizokukann') {
      navigate('/ending/1');
    } else {
      navigate('/ending/3');
    }
  };

  if (!isVisible) return null;

  return (
    <div className={'final-choice active'}>
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
            <input type="text" value={locationInput} onChange={(e) => setLocationInput(e.target.value)} autoFocus placeholder="場所を入力" style={{ padding: '8px' }} />
            <button type="submit" style={{ marginLeft: '10px', padding: '8px' }}>通報する</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FinalChoice;