import React, { useState, useEffect } from 'react';
import './predictor.css';

const Predictor = () => {
  const values = ['1', '2', '3', '4'];
  const colors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'];

  const [prediction, setPrediction] = useState(['', '', '']);
  const [slots, setSlots] = useState([
    { value: '1', color: colors[0] },
    { value: '2', color: colors[1] },
    { value: '3', color: colors[2] },
  ]);
  const [spinning, setSpinning] = useState(false);
  const [win, setWin] = useState(false);
  const [showWinText, setShowWinText] = useState(false);
  const [scrollingSlots, setScrollingSlots] = useState([]);
  const [animationKey, setAnimationKey] = useState(0);
  const [winScore, setWinScore] = useState(0); 

  const getRandomSlot = () => ({
    value: values[Math.floor(Math.random() * values.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
  });

  const handlePrediction = (index, value) => {
    const newPrediction = [...prediction];
    newPrediction[index] = value;
    setPrediction(newPrediction);
  };

  const spinSlot = () => {
    if (prediction.includes('')) return alert('Please choose all 3 predictions.');

    setSpinning(true);
    setWin(false);
    setAnimationKey((prev) => prev + 1);

    const newScrolling = [0, 1, 2].map(() => [
      ...values,
      getRandomSlot().value,
    ]);
    setScrollingSlots(newScrolling);

    setTimeout(() => {
      const finalSlots = [getRandomSlot(), getRandomSlot(), getRandomSlot()];
      setSlots(finalSlots);
      setScrollingSlots([]);
      setSpinning(false);

      const matchCount = finalSlots.filter((slot, idx) => slot.value === prediction[idx]).length;
      const isWin = matchCount >= 2;
      setWin(isWin);

      if (isWin) {
        setShowWinText(true);
        setWinScore((prev) => prev + 1); // Increment the win score
        setTimeout(() => setShowWinText(false), 2000);
      }
    }, 1500);
  };

  return (
    <>
      {showWinText && <div className="win-overlay">🎉 You Won! 🎉</div>}
      <div className="game-container2">
        <h2>PREDICTOR - A little fun game!</h2>

        {/* Display Win Score Below Title */}
        <p>Win Score: {winScore}</p>

        <p>Choose your prediction (3 numbers):</p>
        <div className="prediction-set">
          {[0, 1, 2].map((slotIndex) => (
            <div key={slotIndex} className="prediction-buttons">
              {values.map((val, idx) => (
                <button
                  key={idx}
                  className={`prediction-btn ${prediction[slotIndex] === val ? 'active' : ''}`}
                  onClick={() => handlePrediction(slotIndex, val)}
                >
                  {val}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="slots-container">
          {slots.map((slot, idx) => (
            <div
              key={idx}
              className="slot-cylinder"
              style={{ backgroundColor: slot.color }}
            >
              <div className="slot-inner">
                {spinning && scrollingSlots.length > 0 ? (
                  <div key={animationKey} className="slot-strip scrolling">
                    {scrollingSlots[idx].map((val, i) => (
                      <div key={i} className="slot-item">{val}</div>
                    ))}
                  </div>
                ) : (
                  <div className="slot-static">
                    <div className="slot-item">{slot.value}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button className="spin-btn" onClick={spinSlot} disabled={spinning}>
          {spinning ? 'Spinning...' : 'Spin'}
        </button>
      </div>
    </>
  );
};

export default Predictor;
