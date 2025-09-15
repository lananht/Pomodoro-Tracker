// useState: to save and update values (how many seconds left on the timer)
// useEffect: run code when something changes (start/stop timer)
// useRef: 

import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {

  // State variables 
  const [timeLeft, setTimeLeft] = useState(45 * 60); // starts on 45 minutes (the timer)
  const [isRunning, setIsRunning] = useState(false); // starts "not running"
  const intervalRef = useRef(null); 
  const [inputTime, setInputTime] = useState(45); // start on 45 minuts (the option)
  const [mode, setMode] = useState('work');

  // Time formatting function
  const formatTime = (seconds) => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${minutes}:${secs}`;
  };

  // Start/pause handler function
  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  // Reset handler function
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(mode  === 'work' ? inputTime * 60 : 5 * 60);
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 0) {
            clearInterval(intervalRef.current);

            if (mode === 'work') {
              setMode('break');
              setTimeLeft(5 * 60);
              setIsRunning(true);
            } else {
              setMode('work');
              setTimeLeft(inputTime * 60);
              setIsRunning(false);
            }

            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode, inputTime]);


  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(inputTime * 60);
    }
  }, [inputTime, isRunning]);



  return (
    <div className="App">
      <h1>Pomodoro session</h1>
      <div className='middle'>
        <div className='timer'>
          <h2 className='mode'>{mode === 'work' ? 'Work Time' : 'Break Time'}</h2>
          <h2>{formatTime(timeLeft)}</h2>
        </div>

        {/* Image */}
      </div>
      <label>
        Choose duration:
        <select
        value={inputTime}
        onChange={(e) => setInputTime(Number(e.target.value))}
        disabled={isRunning}
        >
          <option value={30}>30 minutes</option>
          <option value={45}>45 minutes</option>
          <option value={60}>60 minutes</option>
        </select>
      </label>

      <div className='buttons'>
        <button onClick={handleStartPause}>
          {/* Bilde */}
          Start
        </button>

        <button onClick={handleReset}>
          Reset
          {/* Bilde */}
        </button>
      </div>
    </div>
  );
}

export default App;
