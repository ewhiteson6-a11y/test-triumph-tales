import { useState, useCallback } from "react";
import { questions, shuffleArray, type Question } from "@/data/questions";

export type QuizMode = "sprint" | "flashcard" | "category" | "mistakes" | "marathon";

interface ShuffledQuestion extends Question {
  shuffledOptions: string[];
  shuffledCorrectIndex: number;
}

function shuffleQuestion(q: Question): ShuffledQuestion {
  const indices = q.options.map((_, i) => i);
  const shuffledIndices = shuffleArray(indices);
  return {
    ...q,
    shuffledOptions: shuffledIndices.map(i => q.options[i]),
    shuffledCorrectIndex: shuffledIndices.indexOf(q.correctIndex),
  };
}

interface QuizState {
  mode: QuizMode;
  questions: ShuffledQuestion[];
  currentIndex: number;
  answers: (number | null)[];
  isComplete: boolean;
  streak: number;
  bestStreak: number;
  startTime: number;
}

export function useQuiz() {
  const [state, setState] = useState<QuizState | null>(null);

  const startQuiz = useCallback((mode: QuizMode, category?: string, count = 10, questionIds?: number[]) => {
    let pool: Question[];
    
    if (questionIds && questionIds.length > 0) {
      pool = questions.filter(q => questionIds.includes(q.id));
    } else if (category) {
      pool = questions.filter(q => q.category === category);
    } else {
      pool = [...questions];
    }
    
    pool = shuffleArray(pool).slice(0, Math.min(count, pool.length));
    const shuffledPool = pool.map(shuffleQuestion);
    
    setState({
      mode,
      questions: shuffledPool,
      currentIndex: 0,
      answers: new Array(shuffledPool.length).fill(null),
      isComplete: false,
      streak: 0,
      bestStreak: 0,
      startTime: Date.now(),
    });
  }, []);

  const answerQuestion = useCallback((optionIndex: number) => {
    if (!state || state.answers[state.currentIndex] !== null) return;
    
    const isCorrect = optionIndex === state.questions[state.currentIndex].shuffledCorrectIndex;
    const newStreak = isCorrect ? state.streak + 1 : 0;
    
    setState(prev => {
      if (!prev) return prev;
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentIndex] = optionIndex;
      return {
        ...prev,
        answers: newAnswers,
        streak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
      };
    });
  }, [state]);

  const nextQuestion = useCallback(() => {
    setState(prev => {
      if (!prev) return prev;
      if (prev.currentIndex >= prev.questions.length - 1) {
        return { ...prev, isComplete: true };
      }
      return { ...prev, currentIndex: prev.currentIndex + 1 };
    });
  }, []);

  const prevQuestion = useCallback(() => {
    setState(prev => {
      if (!prev || prev.currentIndex <= 0) return prev;
      return { ...prev, currentIndex: prev.currentIndex - 1 };
    });
  }, []);

  const reset = useCallback(() => setState(null), []);

  const score = state 
    ? state.answers.reduce((acc, ans, i) => 
        ans !== null && ans === state.questions[i].shuffledCorrectIndex ? acc + 1 : acc, 0)
    : 0;

  const elapsed = state ? Math.floor((Date.now() - state.startTime) / 1000) : 0;

  const getMissedFromSession = (): { questionId: number; selectedIndex: number }[] => {
    if (!state) return [];
    return state.answers.reduce<{ questionId: number; selectedIndex: number }[]>((acc, ans, i) => {
      if (ans !== null && ans !== state.questions[i].shuffledCorrectIndex) {
        acc.push({ questionId: state.questions[i].id, selectedIndex: ans });
      }
      return acc;
    }, []);
  };

  return { state, startQuiz, answerQuestion, nextQuestion, prevQuestion, reset, score, elapsed, getMissedFromSession };
}
