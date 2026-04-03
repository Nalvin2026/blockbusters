import { useState, useEffect, useRef, useMemo } from 'react';
import styles from './LetterTap.module.css';

function speak(phoneticSound) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(phoneticSound);
  u.lang = 'en-GB';
  u.rate = 0.7;
  u.pitch = 1.1;
  window.speechSynthesis.speak(u);
}

function shuffled(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function LetterTap({ task, onCorrect, onWrong }) {
  const [shakingOption, setShakingOption] = useState(null);
  const [glowOption, setGlowOption] = useState(null);
  const wrongAttemptsRef = useRef(0);
  // Shuffle once per task (key prop ensures remount on new task)
  const options = useMemo(() => shuffled(task.options), [task.options]);

  useEffect(() => {
    wrongAttemptsRef.current = 0;
    setShakingOption(null);
    setGlowOption(null);

    const timer = setTimeout(() => {
      speak(task.letterSound);
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
        {options.map((option) => (
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
