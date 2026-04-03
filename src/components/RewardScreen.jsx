import { useEffect, useState } from 'react';
import styles from './RewardScreen.module.css';

const REWARD_ITEMS = [
  { emoji: '💎', name: 'Diamond' },
  { emoji: '🪙', name: 'Gold Coin' },
  { emoji: '⛏️', name: 'Iron Pickaxe' },
  { emoji: '⚔️', name: 'Wooden Sword' },
  { emoji: '💚', name: 'Emerald' },
  { emoji: '🍞', name: 'Bread' },
  { emoji: '🪶', name: 'Feather' },
  { emoji: '🦴', name: 'Bone' },
];

function starsFromStats(stats) {
  if (stats.firstAttemptCorrect >= 8) return 3;
  if (stats.firstAttemptCorrect >= 5) return 2;
  return 1;
}

const PRAISE_PHRASES = [
  'Well done Ollie!',
  'Nice one, Ollie!',
  'Great job, Ollie!',
  'Top work, Ollie!',
  'Brilliant, Ollie!',
  'Awesome stuff, Ollie!',
  'You smashed it, Ollie!',
  'Super work, Ollie!',
  'Legend, Ollie!',
  'So proud, Ollie!',
  'You nailed it, Ollie!',
  'Well done Oliver!',
  'Nice one, Oliver!',
  'Brilliant, Oliver!',
  'You smashed it, Oliver!',
  'Legend, Oliver!',
];

export default function RewardScreen({ sessionStats, audio, onContinue }) {
  const stars = starsFromStats(sessionStats);
  const [reward] = useState(
    () => REWARD_ITEMS[Math.floor(Math.random() * REWARD_ITEMS.length)]
  );
  const [praise] = useState(
    () => PRAISE_PHRASES[Math.floor(Math.random() * PRAISE_PHRASES.length)]
  );
  const [chestOpen, setChestOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => {
      audio.playLevelComplete();
      setChestOpen(true);
    }, 400);
    const t2 = setTimeout(() => {
      setShowContent(true);
      // Speak the reward message once content is visible
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(
          `${praise} You got a ${reward.name} and ${stars} ${stars === 1 ? 'star' : 'stars'}!`
        );
        u.lang = 'en-GB';
        u.rate = 0.85;
        u.pitch = 1.1;
        window.speechSynthesis.speak(u);
      }
    }, 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.speechSynthesis?.cancel();
    };
  }, [audio, reward.name]);

  return (
    <div className={styles.screen}>
      <h2 className={styles.heading}>
        {stars === 3 ? '⭐ EPIC! ⭐' : stars === 2 ? 'GREAT JOB!' : 'WELL DONE!'}
      </h2>

      {/* Treasure chest */}
      <div className={styles.chestWrapper}>
        <div className={[styles.chest, chestOpen ? styles.chestOpen : ''].join(' ')}>
          <div className={styles.chestLid} />
          <div className={styles.chestBody}>
            <span className={styles.chestLock}>🔒</span>
          </div>
        </div>
      </div>

      {showContent && (
        <div className={styles.rewardContent}>
          <div className={styles.rewardItem}>
            <span className={styles.rewardEmoji}>{reward.emoji}</span>
            <span className={styles.rewardName}>You got a {reward.name}!</span>
          </div>

          <div className={styles.stars}>
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={[styles.star, s <= stars ? styles.starFilled : styles.starEmpty].join(' ')}
              >
                ★
              </span>
            ))}
          </div>

          <p className={styles.xpLabel}>
            +{sessionStats.xpEarned ?? 0} XP earned this session!
          </p>

          <button className={styles.continueBtn} onClick={onContinue}>
            CLAIM REWARD!
          </button>
        </div>
      )}
    </div>
  );
}
