import React, { useState } from 'react';
import Calculator from './Calculator';
import GameCalc from './GameCalc';
import Predictor from './Predictor';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('calculator');
  const currentYear = new Date().getFullYear();

  return (
    <div className="app">
      <div className="tab-buttons">
        <button
          className={activeTab === 'calculator' ? 'active' : ''}
          onClick={() => setActiveTab('calculator')}
        >
          Calculator
        </button>
        <button
          className={activeTab === 'gamecalc' ? 'active' : ''}
          onClick={() => setActiveTab('gamecalc')}
        >
          Game Calc
        </button>
        <button
          className={activeTab === 'predictor' ? 'active' : ''}
          onClick={() => setActiveTab('predictor')}
        >
          Predictor
        </button>
      </div>

      {activeTab === 'calculator' && <Calculator />}
      {activeTab === 'gamecalc' && <GameCalc />}
      {activeTab === 'predictor' && <Predictor />}

      <footer style={{ marginTop: '40px', textAlign: 'center', opacity: 0.8, fontSize: '0.85rem' }}>
        &copy; {currentYear} Patience Wanjiru. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
