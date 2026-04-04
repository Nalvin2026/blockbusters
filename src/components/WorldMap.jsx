import styles from './WorldMap.module.css';

const ZONES = [
  {
    id: 'grasslands',
    name: 'THE STONE MINE',
    emoji: '⛏️',
    description: 'Letters & Words',
    minLevel: 1,
    biome: 'grass',
  },
  {
    id: 'desert',
    name: 'DESERT RUINS',
    emoji: '🏜️',
    description: 'Digraphs',
    minLevel: 2,
    biome: 'sand',
  },
  {
    id: 'crystal',
    name: 'CRYSTAL CAVERN',
    emoji: '💎',
    description: 'Sound Blending',
    minLevel: 3,
    biome: 'crystal',
  },
  {
    id: 'ocean',
    name: 'OCEAN TEMPLE',
    emoji: '🌊',
    description: 'Rhyme & Sort',
    minLevel: 4,
    biome: 'water',
  },
];

export default function WorldMap({ onExplore, onBack, progress }) {
  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack} aria-label="Back to home">
          ← HOME
        </button>
        <h2 className={styles.heading}>CHOOSE ZONE</h2>
      </div>

      <div className={styles.zoneList}>
        {ZONES.map((zone) => {
          const unlocked = progress.level >= zone.minLevel;
          return (
            <div
              key={zone.id}
              className={[styles.zoneCard, !unlocked ? styles.locked : ''].join(' ')}
            >
              <span className={styles.zoneEmoji}>{zone.emoji}</span>
              <div className={styles.zoneInfo}>
                <span className={styles.zoneName}>{zone.name}</span>
                <span className={styles.zoneDesc}>{zone.description}</span>
              </div>
              {unlocked ? (
                <button className={styles.exploreBtn} onClick={() => onExplore(zone.id)}>
                  EXPLORE!
                </button>
              ) : (
                <span className={styles.lockIcon}>🔒</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
