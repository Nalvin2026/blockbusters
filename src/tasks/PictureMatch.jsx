import { useState, useEffect, useRef } from 'react';
import styles from './PictureMatch.module.css';

function speak(label) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(`What word matches the picture? ${label}`);
  u.lang = 'en-GB';
  u.rate = 0.8;
  u.pitch = 1.1;
  window.speechSynthesis.speak(u);
}

export default function PictureMatch({ task, onCorrect, onWrong }) {
  const [shakingOption, setShakingOption] = useState(null);
  const [glowOption, setGlowOption] = useState(null);
  const wrongAttemptsRef = useRef(0);

  useEffect(() => {
    wrongAttemptsRef.current = 0;
    setShakingOption(null);
    setGlowOption(null);

    const timer = setTimeout(() => {
      speak(task.label);
    }, 500);

    return () => {
      clearTimeout(timer);
      window.speechSynthesis?.cancel();
    };
  }, [task.id, task.label]);

  function handleSpeak() {
    speak(task.label);
  }

  function handleOptionTap(option) {
    if (option === task.correctAnswer) {
      onCorrect();
    } else {
      wrongAttemptsRef.current += 1;
      setShakingOption(option);
      setTimeout(() => setShakingOption(null), 500);
      onWrong();
      if (wrongAttemptsRef.current >= 2) {
        setGlowOption(task.correctAnswer);
      }
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.instruction}>Tap the word that matches the picture:</p>

      <div className={styles.emojiBox}>
        <span className={styles.emoji}>{task.emoji}</span>
        <button
          className={styles.speakerBtn}
          onClick={handleSpeak}
          aria-label="Hear the word"
        >
          🔊
        </button>
      </div>

      <div className={styles.options}>
        {task.options.map((option) => (
          <button
            key={option}
            className={[
              styles.wordBlock,
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
