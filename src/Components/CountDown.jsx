import React, { useEffect, useState} from 'react';
import "./CountDown.css"

const CountDown = () => {
  const [targetDate, setTargetDate] = useState('');
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState({ Days: 0, Hours: 0, Minutes: 0, Seconds: 0 });
  const [countdownActive, setCountdownActive] = useState(false);
  const [countdownFinished, setCountdownFinished] = useState(false);
 

  useEffect(() => {
    const timer = countdownActive && setInterval(() => {
      const totalTimeLeft = new Date(targetDate) - new Date();
      if (totalTimeLeft <= 0) {
        clearInterval(timer);
        setCountdownActive(false);
        setTimeLeft({ Days: 0, Hours: 0, Minutes: 0, Seconds: 0 });
        // Countdown finished
        setCountdownFinished(true); 
      } else {
        const Days = Math.floor(totalTimeLeft / (1000 * 60 * 60 *24));
        const Hours = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
        const Minutes = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
        const Seconds = Math.floor((totalTimeLeft / 1000) % 60);
        setTimeLeft({ Days, Hours, Minutes, Seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdownActive, targetDate]);

  const handleInputChange = (e) => {
    setTargetDate(e.target.value);
    setError('');
    // Reset countdown 
    setCountdownFinished(false); 
  };

  const startCountdown = () => {
    const inputDate = new Date(targetDate);
    const currentDate = new Date();
    const days = Math.floor((inputDate - currentDate) / (1000 * 60 * 60 * 24));

    if (days > 99) {
      setError(<p style={{color:"#bc42f5"}}>'Selected time is more than 100 days.'</p>);
    } else {
      setCountdownActive(true);
    }
  };

  const cancelCountdown = () => {
    setCountdownActive(false);
     // Reset countdown to zero
    setTimeLeft({ Days: 0, Hours: 0, Minutes: 0, Seconds: 0 });
    // Reset countdown
    setCountdownFinished(false);  
  };


  return (
    <div className='countdown'>
      <div className='input-form'>
        <input 
          type="datetime-local" 
          value={targetDate} 
          onChange={handleInputChange} 
        />
      </div>
      <div className='btn'>
        {countdownActive ? (
          <button onClick={cancelCountdown}>Cancel</button>
        ) : (
          <button onClick={startCountdown}>Start</button>
        )}
        {error && <p>{error}</p>}
      </div> 

      {!error && (
        <div className='content'>
          {countdownFinished ? (
            <p style={{color:"#bc42f5"}}>The countdown is over! What's next on your adventure?</p>
          ) : (
            Object.entries(timeLeft).map((e) => {
              const label = e[0];
              const value = e[1];
              return (
                <div className='timerBox' key={label}>
                  <div className='value'>
                    <span>{value < 10 ? `0${value}` : value}</span>
                  </div>
                  <div className='label'>
                    <span>{label}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}  

export default CountDown;
