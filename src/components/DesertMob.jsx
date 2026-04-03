import styles from './DesertMob.module.css';

export default function DesertMob() {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <p className={styles.warning}>⚠ CREEPER! ⚠</p>
        <div className={styles.creeperHead} />
        <p className={styles.sub}>Don't worry — keep going!</p>
      </div>
    </div>
  );
}
