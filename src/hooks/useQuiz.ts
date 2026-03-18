import { useState, useCallback } from "react";
import { questions, shuffleArray, type Question } from "@/data/questions";

export type QuizMode = "sprint" | "flashcard" | "category";

interface QuizState {
  mode: QuizMode;
  questions: Question[];
  currentIndex: number;
  answers: (number | null)[];
  isComplete: boolean;
  streak: number;
  bestStreak: number;
  startTime: number;
}

export function useQuiz() {
  const [state, setState] = useState<QuizState | null>(null);

  const startQuiz = useCallback((mode: QuizMode, category?: string, count = 10) => {
    let pool = category 
      ? questions.filter(q => q.category === category) 
      : [...questions];
    pool = shuffleArray(pool).slice(0, Math.min(count, pool.length));
    
    setState({
      mode,
      questions: pool,
      currentIndex: 0,
      answers: new Array(pool.length).fill(null),
      isComplete: false,
      streak: 0,
      bestStreak: 0,
      startTime: Date.now(),
    });
  }, []);

  const answerQuestion = useCallback((optionIndex: number) => {
    if (!state || state.answers[state.currentIndex] !== null) return;
    
    const isCorrect = optionIndex === state.questions[state.currentIndex].correctIndex;
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
        ans !== null && ans === state.questions[i].correctIndex ? acc + 1 : acc, 0)
    : 0;

  const elapsed = state ? Math.floor((Date.now() - state.startTime) / 1000) : 0;

  return { state, startQuiz, answerQuestion, nextQuestion, prevQuestion, reset, score, elapsed };
}
