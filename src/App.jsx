import { useState } from 'react';
import { useAudio } from './hooks/useAudio';
import { useProgress } from './hooks/useProgress';
import HomeScreen from './components/HomeScreen';
import WorldMap from './components/WorldMap';
import MiningExpedition from './components/MiningExpedition';
import RewardScreen from './components/RewardScreen';
import SessionSummaryScreen from './components/SessionSummaryScreen';
import styles from './App.module.css';

const SCREENS = {
  HOME: 'HOME',
  WORLD_MAP: 'WORLD_MAP',
  EXPEDITION: 'EXPEDITION',
  REWARD: 'REWARD',
  SUMMARY: 'SUMMARY',
};

export default function App() {
  const [screen, setScreen] = useState(SCREENS.HOME);
  const [sessionStats, setSessionStats] = useState(null);
  const [selectedZone, setSelectedZone] = useState('grasslands');

  const audio = useAudio();
  const { progress, xpProgress, addXP, recordTaskResult, completeSession } = useProgress();

  function handleExpeditionComplete(stats) {
    setSessionStats(stats);
    setScreen(SCREENS.REWARD);
  }

  return (
    <div className={styles.app}>
      {/* Portrait-lock overlay — only shows on touch devices in landscape */}
      <div className={styles.rotateOverlay}>
        <div className={styles.rotateMsg}>
          <span className={styles.rotateIcon}>📱</span>
          <p>Please rotate your device to portrait mode</p>
        </div>
      </div>

      {/* Main app — always visible on desktop/laptop */}
      <div className={styles.portrait}>
        {screen === SCREENS.HOME && (
          <HomeScreen
            onPlay={() => setScreen(SCREENS.WORLD_MAP)}
            progress={progress}
            audio={audio}
          />
        )}

        {screen === SCREENS.WORLD_MAP && (
          <WorldMap
            onExplore={(zoneId) => {
              setSelectedZone(zoneId);
              setScreen(SCREENS.EXPEDITION);
            }}
            onBack={() => setScreen(SCREENS.HOME)}
            progress={progress}
          />
        )}

        {screen === SCREENS.EXPEDITION && (
          <MiningExpedition
            zone={selectedZone}
            progress={progress}
            xpProgress={xpProgress}
            audio={audio}
            addXP={addXP}
            recordTaskResult={recordTaskResult}
            completeSession={completeSession}
            onComplete={handleExpeditionComplete}
          />
        )}

        {screen === SCREENS.REWARD && (
          <RewardScreen
            sessionStats={sessionStats}
            audio={audio}
            onContinue={() => setScreen(SCREENS.SUMMARY)}
          />
        )}

        {screen === SCREENS.SUMMARY && (
          <SessionSummaryScreen
            sessionStats={sessionStats}
            progress={progress}
            xpProgress={xpProgress}
            audio={audio}
            onPlayAgain={() => setScreen(SCREENS.WORLD_MAP)}
            onHome={() => setScreen(SCREENS.HOME)}
          />
        )}
      </div>
    </div>
  );
}
