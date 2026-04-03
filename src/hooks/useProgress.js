import { useState, useCallback } from 'react';

const STORAGE_KEY = 'blockbusters_progress';

// XP required to reach each level (index = level - 1)
const LEVEL_THRESHOLDS = [0, 100, 250, 500, 800, 1200, 1700, 2300, 3000];

function levelFromXP(xp) {
  let level = 1;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
      break;
    }
  }
  return level;
}

function defaultProgress() {
  return {
    xp: 0,
    level: 1,
    sessionsPlayed: 0,
    lastPlayedDate: null,
    taskAccuracy: {}, // { [taskId]: { correct: number, attempts: number } }
  };
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    return { ...defaultProgress(), ...JSON.parse(raw) };
  } catch {
    return defaultProgress();
  }
}

function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Silently fail — private browsing or storage full
  }
}

export function useProgress() {
  // Lazy initialiser — runs loadProgress once on mount, not on every render
  const [progress, setProgress] = useState(loadProgress);

  const addXP = useCallback((amount) => {
    setProgress((prev) => {
      const newXP = prev.xp + amount;
      const newLevel = levelFromXP(newXP);
      const updated = { ...prev, xp: newXP, level: newLevel };
      saveProgress(updated);
      return updated;
    });
  }, []);

  const recordTaskResult = useCallback((taskId, wasCorrect) => {
    setProgress((prev) => {
      const existing = prev.taskAccuracy[taskId] ?? { correct: 0, attempts: 0 };
      const updated = {
        ...prev,
        taskAccuracy: {
          ...prev.taskAccuracy,
          [taskId]: {
            correct: existing.correct + (wasCorrect ? 1 : 0),
            attempts: existing.attempts + 1,
          },
        },
      };
      saveProgress(updated);
      return updated;
    });
  }, []);

  const completeSession = useCallback(() => {
    setProgress((prev) => {
      const updated = {
        ...prev,
        sessionsPlayed: prev.sessionsPlayed + 1,
        lastPlayedDate: new Date().toISOString(),
      };
      saveProgress(updated);
      return updated;
    });
  }, []);

  // XP progress within the current level (for the XP bar fill)
  const levelStart = LEVEL_THRESHOLDS[progress.level - 1] ?? 0;
  const levelEnd = LEVEL_THRESHOLDS[progress.level] ?? levelStart + 500;
  const xpProgress = {
    current: progress.xp - levelStart,
    needed: levelEnd - levelStart,
  };

  return {
    progress,
    addXP,
    recordTaskResult,
    completeSession,
    xpProgress,
  };
}
