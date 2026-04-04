import { useState, useMemo } from 'react';
import XPBar from './XPBar';
import TaskEngine from './TaskEngine';
import DesertMob from './DesertMob';
import CaveBat from './CaveBat';
import OceanMob from './OceanMob';
import { curriculum } from '../data/curriculum';
import styles from './MiningExpedition.module.css';

const TOTAL_BLOCKS = 10;
const BONUS_XP_SESSION = 20;
// Show the creeper mob after completing these block indices (0-based)
const MOB_AFTER = new Set([2, 5]);

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function MiningExpedition({
  zone,
  progress,
  xpProgress,
  audio,
  addXP,
  recordTaskResult,
  completeSession,
  onComplete,
}) {
  const phase = zone === 'ocean' ? 4 : zone === 'crystal' ? 3 : zone === 'desert' ? 2 : 1;
  const isDesert = zone === 'desert';
  const isCrystal = zone === 'crystal';
  const isOcean = zone === 'ocean';

  const tasks = useMemo(() => {
    const pool = curriculum.filter((t) => t.phase === phase);
    return shuffleArray(pool).slice(0, TOTAL_BLOCKS);
  }, [phase]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [brokenBlocks, setBrokenBlocks] = useState(Array(TOTAL_BLOCKS).fill(false));
  const [crumblingIndex, setCrumblingIndex] = useState(null);
  const [showMob, setShowMob] = useState(false);
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

    setCrumblingIndex(currentIndex);
    setBrokenBlocks((prev) => {
      const next = [...prev];
      next[currentIndex] = true;
      return next;
    });

    const isLastBlock = currentIndex === TOTAL_BLOCKS - 1;
    const triggerMob = (isDesert || isCrystal || isOcean) && !isLastBlock && MOB_AFTER.has(currentIndex);
    const delay = triggerMob ? 4000 : 500;

    if (triggerMob) {
      setTimeout(() => setShowMob(true), 500);
    }

    setTimeout(() => {
      setCrumblingIndex(null);
      setShowMob(false);
      if (isLastBlock) {
        completeSession();
        addXP(BONUS_XP_SESSION);
        const finalStats = {
          firstAttemptCorrect: sessionStats.firstAttemptCorrect + (wasFirstAttempt ? 1 : 0),
          totalTasks: TOTAL_BLOCKS,
          xpEarned:
            sessionStats.firstAttemptCorrect * 10 +
            (wasFirstAttempt ? 10 : 5) +
            BONUS_XP_SESSION,
        };
        onComplete(finalStats);
      } else {
        setCurrentIndex((i) => i + 1);
      }
    }, delay);
  }

  function handleWrong() {
    audio.playWrong();
    recordTaskResult(tasks[currentIndex].id, false);
  }

  const task = tasks[currentIndex];

  return (
    <div className={[styles.screen, isDesert ? styles.desertScreen : isCrystal ? styles.crystalScreen : isOcean ? styles.oceanScreen : ''].join(' ')}>
      <XPBar progress={progress} xpProgress={xpProgress} />

      <div className={styles.blocksRow} aria-label="Progress">
        {brokenBlocks.map((broken, i) => (
          <div
            key={i}
            className={[
              styles.blockIcon,
              isDesert ? styles.sandBlock : isCrystal ? styles.crystalBlock : isOcean ? styles.coralBlock : '',
              broken
                ? isDesert ? styles.sandBroken : isCrystal ? styles.crystalBroken : isOcean ? styles.coralBroken : styles.broken
                : '',
              crumblingIndex === i
                ? isDesert ? styles.falling : isCrystal ? styles.shattering : isOcean ? styles.bubbling : styles.crumbling
                : '',
            ].join(' ')}
          />
        ))}
      </div>

      <div className={styles.counter}>
        Block {Math.min(currentIndex + 1, TOTAL_BLOCKS)} of {TOTAL_BLOCKS}
      </div>

      <div className={styles.taskArea}>
        <TaskEngine
          key={task.id}
          task={task}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
        />
      </div>

      {showMob && isDesert && <DesertMob />}
      {showMob && isCrystal && <CaveBat />}
      {showMob && isOcean && <OceanMob />}
    </div>
  );
}
