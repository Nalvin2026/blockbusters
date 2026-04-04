import styles from './CaveBat.module.css';

export default function CaveBat() {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <p className={styles.warning}>⚠ CAVE BAT! ⚠</p>
        <div className={styles.batWrap}>
          <div className={styles.bat} />
        </div>
        <p className={styles.sub}>Don't worry — keep going!</p>
      </div>
    </div>
  );
}
