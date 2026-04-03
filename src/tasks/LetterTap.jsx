import { useState, useEffect, useRef } from 'react';
import styles from './LetterTap.module.css';

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-GB';
  u.rate = 0.8;
  u.pitch = 1.1;
  window.speechSynthesis.speak(u);
}

export default function LetterTap({ task, onCorrect, onWrong }) {
  const [shakingOption, setShakingOption] = useState(null);
  const [glowOption, setGlowOption] = useState(null);
  const wrongAttemptsRef = useRef(0);

  useEffect(() => {
    wrongAttemptsRef.current = 0;
    setShakingOption(null);
    setGlowOption(null);

    const timer = setTimeout(() => {
      speak(`Find the letter. ${task.letterSound}`);
    }, 500);

    return () => {
      clearTimeout(timer);
      window.speechSynthesis?.cancel();
    };
  }, [task.id, task.letterSound]);

  function handleSpeak() {
    speak(`Find the letter. ${task.letterSound}`);
  }

  function handleOptionTap(option) {
    if (option === task.correctAnswer) {
      onCorrect();
    } else {
      wrongAttemptsRef.current += 1;
      setShakingOption(option);
      setTimeout(() => setShakingOption(null), 500);
      onWrong();
      // After 2 wrong attempts, glow the correct answer
      if (wrongAttemptsRef.current >= 2) {
        setGlowOption(task.correctAnswer);
      }
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.instruction}>Tap the letter that makes this sound:</p>

      <button
        className={styles.speakerBtn}
        onClick={handleSpeak}
        aria-label="Hear the sound again"
      >
        🔊
      </button>

      <div className={styles.options}>
        {task.options.map((option) => (
          <button
            key={option}
            className={[
              styles.letterBlock,
              shakingOption === option ? styles.shake : '',
              glowOption === option ? styles.glow : '',
            ].join(' ')}
            onClick={() => handleOptionTap(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
