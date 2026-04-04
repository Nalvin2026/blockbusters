import styles from './OceanMob.module.css';

export default function OceanMob() {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <p className={styles.warning}>⚠ SHARK! ⚠</p>
        <div className={styles.sharkWrap}>
          <div className={styles.shark} />
        </div>
        <p className={styles.sub}>Don't worry — keep going!</p>
      </div>
    </div>
  );
}
