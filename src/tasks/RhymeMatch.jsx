import { useState, useEffect, useRef, useMemo } from 'react';
import styles from './RhymeMatch.module.css';

function speak(word) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(`Which word rhymes with ${word}?`);
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

export default function RhymeMatch({ task, onCorrect, onWrong }) {
  const [shakingOption, setShakingOption] = useState(null);
  const [glowOption, setGlowOption] = useState(null);
  const wrongAttemptsRef = useRef(0);
  const options = useMemo(() => shuffled(task.options), [task.options]);

  useEffect(() => {
    wrongAttemptsRef.current = 0;
    setShakingOption(null);
    setGlowOption(null);
    const timer = setTimeout(() => speak(task.prompt.word), 500);
    return () => {
      clearTimeout(timer);
      window.speechSynthesis?.cancel();
    };
  }, [task.id, task.prompt.word]);

  function handleOptionTap(word) {
    if (word === task.correctAnswer) {
      onCorrect();
    } else {
      wrongAttemptsRef.current += 1;
      setShakingOption(word);
      setTimeout(() => setShakingOption(null), 500);
      onWrong();
      if (wrongAttemptsRef.current >= 2) {
        setGlowOption(task.correctAnswer);
      }
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.instruction}>Tap the word that rhymes!</p>

      <div className={styles.promptBox}>
        <span className={styles.promptEmoji}>{task.prompt.emoji}</span>
        <span className={styles.promptWord}>{task.prompt.word}</span>
        <button
          className={styles.speakerBtn}
          onClick={() => speak(task.prompt.word)}
          aria-label="Hear the word again"
        >
          🔊
        </button>
      </div>

      <div className={styles.options}>
        {options.map(({ word, emoji }) => (
          <button
            key={word}
            className={[
              styles.wordBlock,
              shakingOption === word ? styles.shake : '',
              glowOption === word ? styles.glow : '',
            ].join(' ')}
            onClick={() => handleOptionTap(word)}
          >
            <span className={styles.optionEmoji}>{emoji}</span>
            <span className={styles.optionWord}>{word}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
