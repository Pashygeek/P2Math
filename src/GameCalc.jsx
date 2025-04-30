import React, { useState, useEffect } from 'react';

function GameCalc() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState('+');
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [timer, setTimer] = useState(30);
  const [timerRunning, setTimerRunning] = useState(false);
  const [zoomInOut, setZoomInOut] = useState(false);

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

  useEffect(() => {
    if (timerRunning && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      handleTimeout();
    }
  }, [timer, timerRunning]);

  const handleTimeout = () => {
    if (answer === '') {
      setScore((prevScore) => Math.max(prevScore - 1, 0));
      setFeedback('❌ Time’s Up! You lost 1 point.');
    }
    setTimeout(() => {
      generateQuestion();
      setTimer(30);
      setTimerRunning(true);
    }, 1000);
  };

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
      setTimer(30);
      setTimerRunning(true);
    }, 1000);
  };

  const handleStart = () => {
    setTimerRunning(true);
  };

  useEffect(() => {
    if (timer <= 10) {
      setZoomInOut(true);
    } else {
      setZoomInOut(false);
    }
  }, [timer]);

  return (
    <div className="game-container">
      <h2>🧠 Math Game</h2>
      <p>{score > 0 ? 'Solve the question below and increase your score!' : `Ready for a challenge? Click on the start button and solve the questions that follow to boost your score:`}</p>

      {timerRunning && (
        <div className="question">
          <p>{`${num1} ${operator} ${num2}`}</p>
        </div>
      )}

      <div className={`timer ${timer <= 10 ? 'red-timer' : ''}`}>
        Time Left: {timer}s
      </div>

      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Your answer"
        className={zoomInOut ? 'zoom-in-out' : ''}
      />
    <div className='game-calc-btns'>
    {!timerRunning && <button onClick={handleStart}>Start</button>}
      <button onClick={checkAnswer}>Submit</button>
    </div>
      <p>{feedback}</p>
      <p>Score: {score}</p>
    </div>
  );
}

export default GameCalc;
