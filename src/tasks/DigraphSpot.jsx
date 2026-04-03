import { useState, useEffect, useRef, useMemo } from 'react';
import styles from './DigraphSpot.module.css';

function speak(word) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(`Find the two letters. ${word}`);
  u.lang = 'en-GB';
  u.rate = 0.8;
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

function splitWord(word, highlight) {
  const idx = word.indexOf(highlight);
  return [word.slice(0, idx), highlight, word.slice(idx + highlight.length)];
}

export default function DigraphSpot({ task, onCorrect, onWrong }) {
  const [shakingOption, setShakingOption] = useState(null);
  const [glowOption, setGlowOption] = useState(null);
  const wrongAttemptsRef = useRef(0);
  const options = useMemo(() => shuffled(task.options), [task.options]);
  const [before, hi, after] = useMemo(
    () => splitWord(task.word, task.highlight),
    [task.word, task.highlight]
  );

  useEffect(() => {
    wrongAttemptsRef.current = 0;
    setShakingOption(null);
    setGlowOption(null);
    const timer = setTimeout(() => speak(task.word), 500);
    return () => {
      clearTimeout(timer);
      window.speechSynthesis?.cancel();
    };
  }, [task.id, task.word]);

  function handleSpeak() {
    speak(task.word);
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
      <p className={styles.instruction}>Tap the two letters you see highlighted:</p>

      <div className={styles.wordBox}>
        <span className={styles.emoji}>{task.emoji}</span>
        <div className={styles.wordDisplay}>
          <span className={styles.wordPart}>{before}</span>
          <span className={styles.highlighted}>{hi}</span>
          <span className={styles.wordPart}>{after}</span>
        </div>
        <button
          className={styles.speakerBtn}
          onClick={handleSpeak}
          aria-label="Hear the word again"
        >
          🔊
        </button>
      </div>

      <div className={styles.options}>
        {options.map((option) => (
          <button
            key={option}
            className={[
              styles.digraphBlock,
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
