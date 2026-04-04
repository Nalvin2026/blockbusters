import { useState, useEffect, useRef, useMemo } from 'react';
import styles from './MissingVowel.module.css';

const VOWELS = ['a', 'e', 'i', 'o', 'u'];

function speak(word) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(`What's the missing vowel? ${word}`);
  u.lang = 'en-GB';
  u.rate = 0.8;
  u.pitch = 1.1;
  window.speechSynthesis.speak(u);
}

export default function MissingVowel({ task, onCorrect, onWrong }) {
  const [shakingOption, setShakingOption] = useState(null);
  const [glowOption, setGlowOption] = useState(null);
  const wrongAttemptsRef = useRef(0);

  // Split word around the missing vowel for display: cat → ['c', 't']
  const [before, after] = useMemo(() => {
    const idx = task.word.indexOf(task.correctAnswer);
    return [task.word.slice(0, idx), task.word.slice(idx + 1)];
  }, [task.word, task.correctAnswer]);

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

  function handleOptionTap(vowel) {
    if (vowel === task.correctAnswer) {
      onCorrect();
    } else {
      wrongAttemptsRef.current += 1;
      setShakingOption(vowel);
      setTimeout(() => setShakingOption(null), 500);
      onWrong();
      if (wrongAttemptsRef.current >= 2) {
        setGlowOption(task.correctAnswer);
      }
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.instruction}>What's the missing vowel?</p>

      <div className={styles.wordBox}>
        <span className={styles.emoji}>{task.emoji}</span>
        <div className={styles.wordDisplay}>
          <span className={styles.wordPart}>{before}</span>
          <span className={styles.blank}>_</span>
          <span className={styles.wordPart}>{after}</span>
        </div>
        <button
          className={styles.speakerBtn}
          onClick={() => speak(task.word)}
          aria-label="Hear the word again"
        >
          🔊
        </button>
      </div>

      <div className={styles.vowels}>
        {VOWELS.map((v) => (
          <button
            key={v}
            className={[
              styles.vowelBlock,
              shakingOption === v ? styles.shake : '',
              glowOption === v ? styles.glow : '',
            ].join(' ')}
            onClick={() => handleOptionTap(v)}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
