import XPBar from './XPBar';
import styles from './SessionSummaryScreen.module.css';

function starsFromStats(stats) {
  if (stats.firstAttemptCorrect >= 8) return 3;
  if (stats.firstAttemptCorrect >= 5) return 2;
  return 1;
}

export default function SessionSummaryScreen({
  sessionStats,
  progress,
  xpProgress,
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
          <div className={styles.statBox}>
            <span className={styles.statValue}>+{sessionStats.xpEarned ?? 0}</span>
            <span className={styles.statLabel}>XP Earned</span>
          </div>
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
