import React, { useRef, useState } from 'react';
import ResultModal from './ResultModal';

const TimerChallenges = ({title, targetTime}) => {
  const timer = useRef();
  const dialog = useRef();
  // const [timerStarted, setTimerStarted] = useState(false);
  // const [timerExpired, setTimerExpired] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;
  // function handleStart(){
  //   timer.current = setTimeout(()=>{
  //     setTimerExpired(true);
  //     dialog.current.open();
  //   }, targetTime * 1000);
  //   setTimerStarted(true)
  // }

  if(timeRemaining <=0){
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleStart(){
    timer.current = setInterval(()=>{
      setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
    }, 10)
  }

  function handleReset(){
    setTimeRemaining(targetTime * 1000);
  }

  function handleStop(){
    // clearTimeout(timer.current);
    dialog.current.open();
    clearInterval(timer.current);
  }

  return <>
    {/* {timerExpired && <ResultModal ref={dialog} result={"lost"} targetTime={targetTime}/>} */}
    <ResultModal
      ref={dialog}
      result={"lost"}
      targetTime={targetTime}
      remainingTime={timeRemaining}
      onReset={handleReset}
    />
    <section className="challenge">
      <h2>{title}</h2>
      {timerIsActive && (<p>You lost!</p>)}
      <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s": ""}
      </p>
      <p>
          {/* <button onClick={timerStarted ? handleStop : handleStart}> */}
          <button onClick={timerIsActive ? handleStop : handleStart}>
              {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
      </p>
      <p className={timerIsActive ? "active" : undefined}>
        {timerIsActive ? "Time is running..." : "Timer inactive"}
      </p>
    </section>
  </>
}

export default TimerChallenges;