import { useState, useCallback, useEffect } from "react";

export interface SessionRecord {
  date: number;
  mode: string;
  score: number;
  total: number;
  streak: number;
  elapsed: number;
  missed: { questionId: number; selectedIndex: number }[];
}

export interface Stats {
  totalSessions: number;
  totalCorrect: number;
  totalAnswered: number;
  bestStreak: number;
  xp: number;
  sessions: SessionRecord[];
  weakCategories: Record<string, { correct: number; total: number }>;
}

const STORAGE_KEY = "pulse-stats-v1";

function loadStats(): Stats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    totalSessions: 0,
    totalCorrect: 0,
    totalAnswered: 0,
    bestStreak: 0,
    xp: 0,
    sessions: [],
    weakCategories: {},
  };
}

export function useStats() {
  const [stats, setStats] = useState<Stats>(loadStats);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  const recordSession = useCallback((session: SessionRecord) => {
    setStats(prev => {
      const newXp = session.score * 10 + session.streak * 5;
      const weakCategories = { ...prev.weakCategories };
      
      return {
        totalSessions: prev.totalSessions + 1,
        totalCorrect: prev.totalCorrect + session.score,
        totalAnswered: prev.totalAnswered + session.total,
        bestStreak: Math.max(prev.bestStreak, session.streak),
        xp: prev.xp + newXp,
        sessions: [...prev.sessions.slice(-49), session],
        weakCategories,
      };
    });
  }, []);

  const recordCategoryResult = useCallback((category: string, correct: boolean) => {
    setStats(prev => {
      const cat = prev.weakCategories[category] || { correct: 0, total: 0 };
      return {
        ...prev,
        weakCategories: {
          ...prev.weakCategories,
          [category]: {
            correct: cat.correct + (correct ? 1 : 0),
            total: cat.total + 1,
          },
        },
      };
    });
  }, []);

  const getMissedQuestionIds = useCallback((): number[] => {
    const missed = new Set<number>();
    stats.sessions.slice(-10).forEach(s => {
      s.missed.forEach(m => missed.add(m.questionId));
    });
    return Array.from(missed);
  }, [stats]);

  return { stats, recordSession, recordCategoryResult, getMissedQuestionIds };
}
