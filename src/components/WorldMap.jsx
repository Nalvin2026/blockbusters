import styles from './WorldMap.module.css';

const ZONES = [
  {
    id: 'grasslands',
    name: 'THE STONE MINE',
    emoji: '⛏️',
    description: 'Letters & Words',
    unlocked: true,
    biome: 'grass',
  },
  {
    id: 'desert',
    name: 'DESERT RUINS',
    emoji: '🏜️',
    description: 'Unlock at Level 2',
    unlocked: false,
    biome: 'sand',
  },
  {
    id: 'ocean',
    name: 'OCEAN TEMPLE',
    emoji: '🌊',
    description: 'Unlock at Level 4',
    unlocked: false,
    biome: 'water',
  },
];

export default function WorldMap({ onExplore, onBack }) {
  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack} aria-label="Back to home">
          ← HOME
        </button>
        <h2 className={styles.heading}>CHOOSE ZONE</h2>
      </div>

      <div className={styles.zoneList}>
        {ZONES.map((zone) => (
          <div
            key={zone.id}
            className={[styles.zoneCard, !zone.unlocked ? styles.locked : ''].join(' ')}
          >
            <span className={styles.zoneEmoji}>{zone.emoji}</span>
            <div className={styles.zoneInfo}>
              <span className={styles.zoneName}>{zone.name}</span>
              <span className={styles.zoneDesc}>{zone.description}</span>
            </div>
            {zone.unlocked ? (
              <button className={styles.exploreBtn} onClick={onExplore}>
                EXPLORE!
              </button>
            ) : (
              <span className={styles.lockIcon}>🔒</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
