import { useState, useEffect } from 'react';
import XPBar from './XPBar';
import styles from './SessionSummaryScreen.module.css';

function starsFromStats(stats) {
  if (stats.firstAttemptCorrect >= 8) return 3;
  if (stats.firstAttemptCorrect >= 5) return 2;
  return 1;
}

// Each coin: starting offset from chest centre, animation delay
const COINS = [
  { dx: -90, dy: -55, delay: 0 },
  { dx:  90, dy: -55, delay: 100 },
  { dx: -110, dy:  5, delay: 200 },
  { dx:  110, dy:  5, delay: 300 },
  { dx: -85, dy:  55, delay: 400 },
  { dx:  85, dy:  55, delay: 500 },
];

function XPChestAnimation({ xpEarned, audio }) {
  // 'open'  → coins flying in
  // 'closing' → lid coming down
  // 'done'  → XP number revealed
  const [phase, setPhase] = useState('open');

  useEffect(() => {
    audio.playCoins();
    const t1 = setTimeout(() => setPhase('closing'), 900);
    const t2 = setTimeout(() => setPhase('done'), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [audio]);

  return (
    <div className={`${styles.statBox} ${styles.xpBox}`}>
      {phase === 'done' ? (
        // Done: render like a normal stat box — no chestScene wrapper
        <span className={styles.xpAmount}>+{xpEarned}</span>
      ) : (
        // Animating: chest + flying coins inside fixed-height scene
        <div className={styles.chestScene}>
          <div className={[styles.miniChest, phase === 'open' ? styles.miniChestOpen : ''].join(' ')}>
            <div className={styles.miniLid} />
            <div className={styles.miniBody}>
              <span className={styles.miniLock}>🔒</span>
            </div>
          </div>

          {COINS.map((coin, i) => (
            <span
              key={i}
              className={styles.coin}
              style={{
                '--dx': `${coin.dx}px`,
                '--dy': `${coin.dy}px`,
                animationDelay: `${coin.delay}ms`,
              }}
            >
              🪙
            </span>
          ))}
        </div>
      )}
      <span className={styles.statLabel}>XP Earned</span>
    </div>
  );
}

export default function SessionSummaryScreen({
  sessionStats,
  progress,
  xpProgress,
  audio,
  onPlayAgain,
  onHome,
}) {
  const stars = starsFromStats(sessionStats);

  return (
    <div className={styles.screen}>
      <XPBar progress={progress} xpProgress={xpProgress} />

      <div className={styles.content}>
        <h2 className={styles.heading}>SESSION DONE!</h2>

        <div className={styles.stars}>
          {[1, 2, 3].map((s) => (
            <span key={s} className={s <= stars ? styles.starOn : styles.starOff}>
              ★
            </span>
          ))}
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <span className={styles.statValue}>{sessionStats.totalTasks}</span>
            <span className={styles.statLabel}>Blocks Mined</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statValue}>{sessionStats.firstAttemptCorrect}</span>
            <span className={styles.statLabel}>First Try!</span>
          </div>

          <XPChestAnimation xpEarned={sessionStats.xpEarned ?? 0} audio={audio} />

          <div className={styles.statBox}>
            <span className={styles.statValue}>LVL {progress.level}</span>
            <span className={styles.statLabel}>Your Level</span>
          </div>
        </div>

        <div className={styles.buttons}>
          <button className={styles.playAgainBtn} onClick={onPlayAgain}>
            ▶ PLAY AGAIN
          </button>
          <button className={styles.homeBtn} onClick={onHome}>
            🏠 HOME
          </button>
        </div>
      </div>
    </div>
  );
}
