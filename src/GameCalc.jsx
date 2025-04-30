import React, { useState, useEffect } from 'react';

function GameCalc() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState('+');
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const operators = ['+', '-', '*', '/'];

  const generateQuestion = () => {
    setNum1(Math.floor(Math.random() * 20) + 1);
    setNum2(Math.floor(Math.random() * 20) + 1);
    setOperator(operators[Math.floor(Math.random() * operators.length)]);
    setAnswer('');
    setFeedback('');
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const checkAnswer = () => {
    let correct;
    switch (operator) {
      case '+':
        correct = num1 + num2;
        break;
      case '-':
        correct = num1 - num2;
        break;
      case '*':
        correct = num1 * num2;
        break;
      case '/':
        correct = parseFloat((num1 / num2).toFixed(2));
        break;
      default:
        correct = 0;
    }

    if (parseFloat(answer) === correct) {
      setScore(score + 1);
      setFeedback('✅ Correct!');
    } else {
      setFeedback(`❌ Wrong! Correct answer was ${correct}`);
    }

    setTimeout(() => {
      generateQuestion();
    }, 1000);
  };

  return (
    <div className="game-container">
      <h2>🎮 Math Game</h2>
      <p>Solve: {num1} {operator} {num2}</p>
      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Your answer"
      />
      <button onClick={checkAnswer}>Submit</button>
      <p>{feedback}</p>
      <p>Score: {score}</p>
    </div>
  );
}

export default GameCalc;
