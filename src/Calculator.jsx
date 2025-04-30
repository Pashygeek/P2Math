import React, { useState } from 'react';
import './index.css';

const buttons = [
    'AC', 'DEL', 'π', 'e',
    'sin', 'cos', 'tan', '√',
    'log', 'ln', '^', '%',
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', 'Ans', '+',
    'EXP', '=',
  ];

function Calculator() {
    const [expression, setExpression] = useState('');
    const [lastAnswer, setLastAnswer] = useState('');

    const handleClick = (value) => {
      if (value === 'AC') {
        setExpression('');
      } else if (value === 'DEL') {
        setExpression(expression.slice(0, -1));
      } else if (value === '=') {
        try {
          const exp = expression
            .replace(/π/g, Math.PI)
            .replace(/e/g, Math.E)
            .replace(/√/g, 'Math.sqrt')
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/log/g, 'Math.log10')
            .replace(/ln/g, 'Math.log')
            .replace(/\^/g, '**')
            .replace(/Ans/g, lastAnswer)
            .replace(/EXP/g, 'e');

          const result = eval(exp);
          setExpression(result.toString());
          setLastAnswer(result.toString());
        } catch {
          setExpression('Error');
        }
      } else {
        setExpression(expression + value);
      }
    };

  return (
    <div className="calculator">
      <div className="display">{expression || '0'}</div>
      <div className="buttons">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            className={`btn ${btn === '=' ? 'equals' : ''}`}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;
