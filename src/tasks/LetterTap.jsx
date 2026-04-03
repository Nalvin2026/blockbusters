import { useState, useEffect, useRef } from 'react';
import styles from './LetterTap.module.css';

// Speak just the phonetic sound, twice with a pause — clear and slow for young learners.
// We use two separate utterances queued back-to-back so the TTS engine
// naturally pauses between them rather than running them together.
function speak(phoneticSound) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  function makeUtterance(text) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-GB';
    u.rate = 0.7;
    u.pitch = 1.1;
    return u;
  }

  window.speechSynthesis.speak(makeUtterance(phoneticSound));
  window.speechSynthesis.speak(makeUtterance(phoneticSound));
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
