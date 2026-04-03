import styles from './XPBar.module.css';

export default function XPBar({ progress, xpProgress }) {
  const fillPercent = Math.min(
    100,
    Math.round((xpProgress.current / xpProgress.needed) * 100)
  );

  return (
    <div className={styles.bar}>
      <span className={styles.level}>LVL {progress.level}</span>
      <div className={styles.track} aria-label={`XP: ${progress.xp}`}>
        <div className={styles.fill} style={{ width: `${fillPercent}%` }} />
      </div>
      <span className={styles.xpText}>{progress.xp} XP</span>
    </div>
  );
}
