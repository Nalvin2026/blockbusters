import { useState, useMemo } from 'react';
import XPBar from './XPBar';
import TaskEngine from './TaskEngine';
import { curriculum } from '../data/curriculum';
import styles from './MiningExpedition.module.css';

const TOTAL_BLOCKS = 10;
const BONUS_XP_SESSION = 20;

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function MiningExpedition({
  progress,
  xpProgress,
  audio,
  addXP,
  recordTaskResult,
  completeSession,
  onComplete,
}) {
  // Randomly pick 10 tasks once on mount (useMemo with empty deps)
  const tasks = useMemo(() => shuffleArray(curriculum).slice(0, TOTAL_BLOCKS), []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [brokenBlocks, setBrokenBlocks] = useState(Array(TOTAL_BLOCKS).fill(false));
  const [crumblingIndex, setCrumblingIndex] = useState(null);
  const [sessionStats, setSessionStats] = useState({ firstAttemptCorrect: 0 });

  function handleCorrect(wasFirstAttempt) {
    audio.playCorrect();
    const xpGain = wasFirstAttempt ? 10 : 5;
    addXP(xpGain);
    audio.playXPPing();
    recordTaskResult(tasks[currentIndex].id, true);

    setSessionStats((prev) => ({
      firstAttemptCorrect: prev.firstAttemptCorrect + (wasFirstAttempt ? 1 : 0),
    }));

    // Crumble animation
    setCrumblingIndex(currentIndex);
    setBrokenBlocks((prev) => {
      const next = [...prev];
      next[currentIndex] = true;
      return next;
    });

    setTimeout(() => {
      setCrumblingIndex(null);
      if (currentIndex === TOTAL_BLOCKS - 1) {
        // Session complete
        completeSession();
        addXP(BONUS_XP_SESSION);
        const finalStats = {
          firstAttemptCorrect: sessionStats.firstAttemptCorrect + (wasFirstAttempt ? 1 : 0),
          totalTasks: TOTAL_BLOCKS,
          xpEarned: sessionStats.firstAttemptCorrect * 10 + (wasFirstAttempt ? 10 : 5) + BONUS_XP_SESSION,
        };
        onComplete(finalStats);
      } else {
        setCurrentIndex((i) => i + 1);
      }
    }, 500);
  }

  function handleWrong() {
    audio.playWrong();
    recordTaskResult(tasks[currentIndex].id, false);
  }

  const task = tasks[currentIndex];

  return (
    <div className={styles.screen}>
      <XPBar progress={progress} xpProgress={xpProgress} />

      {/* Block progress bar */}
      <div className={styles.blocksRow} aria-label="Progress">
        {brokenBlocks.map((broken, i) => (
          <div
            key={i}
            className={[
              styles.blockIcon,
              broken ? styles.broken : '',
              crumblingIndex === i ? styles.crumbling : '',
            ].join(' ')}
          />
        ))}
      </div>

      <div className={styles.counter}>
        Block {Math.min(currentIndex + 1, TOTAL_BLOCKS)} of {TOTAL_BLOCKS}
      </div>

      {/* Task area */}
      <div className={styles.taskArea}>
        <TaskEngine
          key={task.id}
          task={task}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
        />
      </div>
    </div>
  );
}
