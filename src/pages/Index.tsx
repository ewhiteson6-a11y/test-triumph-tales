import { useState, useEffect } from "react";
import { useQuiz } from "@/hooks/useQuiz";
import { useStats } from "@/hooks/useStats";
import HomeScreen from "@/components/HomeScreen";
import QuizCard from "@/components/QuizCard";
import FlashCard from "@/components/FlashCard";
import ProgressBar from "@/components/ProgressBar";
import ResultsScreen from "@/components/ResultsScreen";
import { motion } from "framer-motion";

const Index = () => {
  const { state, startQuiz, answerQuestion, nextQuestion, prevQuestion, reset, score, elapsed, getMissedFromSession } = useQuiz();
  const { stats, recordSession, recordCategoryResult, getMissedQuestionIds } = useStats();
  const [direction, setDirection] = useState(1);
  const [liveElapsed, setLiveElapsed] = useState(0);

  // Live timer
  useEffect(() => {
    if (!state || state.isComplete) return;
    const interval = setInterval(() => {
      setLiveElapsed(Math.floor((Date.now() - state.startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [state]);

  // Track category stats on answer
  useEffect(() => {
    if (!state) return;
    const ans = state.answers[state.currentIndex];
    if (ans !== null) {
      const q = state.questions[state.currentIndex];
      recordCategoryResult(q.category, ans === q.shuffledCorrectIndex);
    }
  }, [state?.answers, state?.currentIndex]);

  // Record session on completion
  useEffect(() => {
    if (state?.isComplete && state.mode !== "flashcard") {
      const missed = getMissedFromSession();
      recordSession({
        date: Date.now(),
        mode: state.mode,
        score,
        total: state.questions.length,
        streak: state.bestStreak,
        elapsed: liveElapsed,
        missed,
      });
    }
  }, [state?.isComplete]);

  const handleNext = () => { setDirection(1); nextQuestion(); };
  const handlePrev = () => { setDirection(-1); prevQuestion(); };

  const handleStart = (mode: Parameters<typeof startQuiz>[0], category?: string, count?: number, questionIds?: number[]) => {
    startQuiz(mode, category, count, questionIds);
  };

  // Home
  if (!state) {
    return (
      <div className="max-w-md mx-auto">
        <HomeScreen
          onStart={handleStart}
          stats={stats}
          missedIds={getMissedQuestionIds()}
        />
      </div>
    );
  }

  // Results
  if (state.isComplete && state.mode !== "flashcard") {
    const xpEarned = score * 10 + state.bestStreak * 5;
    const missed = getMissedFromSession();
    const missedIds = missed.map(m => m.questionId);

    return (
      <div className="max-w-md mx-auto">
        <ResultsScreen
          score={score}
          total={state.questions.length}
          streak={state.bestStreak}
          elapsed={liveElapsed}
          xpEarned={xpEarned}
          totalXp={stats.xp}
          onRestart={() => startQuiz(state.mode, undefined, state.questions.length)}
          onHome={reset}
          hasMistakes={missedIds.length > 0}
          onReviewMistakes={() => startQuiz("mistakes", undefined, missedIds.length, missedIds)}
        />
      </div>
    );
  }

  const currentQ = state.questions[state.currentIndex];
  const minutes = Math.floor(liveElapsed / 60);
  const seconds = liveElapsed % 60;

  const modeLabel: Record<string, string> = {
    sprint: "Sprint",
    marathon: "Marathon",
    category: "Topic Quiz",
    flashcard: "Flashcards",
    mistakes: "Review",
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col px-4 pb-6">
      {/* Top bar */}
      <div className="flex items-center justify-between pt-4 pb-2">
        <motion.button
          onClick={reset}
          className="text-muted-foreground text-sm font-medium px-3 py-1.5 rounded-full bg-secondary bounce-ease"
          whileTap={{ scale: 0.95 }}
        >
          ✕ Exit
        </motion.button>
        <div className="text-center">
          <span className="text-meta text-sm font-semibold">{modeLabel[state.mode] || state.mode}</span>
          <p className="text-xs text-muted-foreground nums">{minutes}:{String(seconds).padStart(2, "0")}</p>
        </div>
        {state.mode !== "flashcard" && (
          <span className="text-sm font-bold text-primary nums">{score} pts</span>
        )}
      </div>

      {/* Progress */}
      <ProgressBar current={state.currentIndex} total={state.questions.length} streak={state.streak} />

      {/* Card area */}
      <div className="flex-grow flex items-center py-4">
        <div className="w-full">
          {state.mode === "flashcard" ? (
            <FlashCard
              question={currentQ}
              onNext={handleNext}
              onPrev={handlePrev}
              index={state.currentIndex}
              total={state.questions.length}
            />
          ) : (
            <QuizCard
              question={currentQ}
              selectedAnswer={state.answers[state.currentIndex]}
              onAnswer={answerQuestion}
              onNext={handleNext}
              direction={direction}
              streak={state.streak}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
