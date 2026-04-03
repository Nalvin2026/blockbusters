import styles from './HomeScreen.module.css';

export default function HomeScreen({ onPlay, progress, audio }) {
  function handlePlay() {
    // First tap unlocks the AudioContext on iOS
    audio.playXPPing();
    onPlay();
  }

  return (
    <div className={styles.screen}>
      <div className={styles.titleBlock}>
        <div className={styles.icon}>⛏️</div>
        <h1 className={styles.title}>BLOCK</h1>
        <h1 className={styles.titleLine2}>BUSTERS</h1>
      </div>

      <div className={styles.subtitle}>
        <p>Mine blocks. Learn letters.</p>
        <p>Earn diamonds! 💎</p>
      </div>

      <button className={styles.playBtn} onClick={handlePlay}>
        ▶ PLAY!
      </button>

      {progress.sessionsPlayed > 0 && (
        <div className={styles.stats}>
          <span>⭐ Level {progress.level}</span>
          <span>🎮 {progress.sessionsPlayed} sessions</span>
          <span>✨ {progress.xp} XP</span>
        </div>
      )}

      <div className={styles.decorBlocks}>
        <div className={styles.grassBlock} />
        <div className={styles.dirtBlock} />
        <div className={styles.stoneBlock} />
        <div className={styles.grassBlock} />
      </div>
    </div>
  );
}
