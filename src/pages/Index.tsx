import { useState } from "react";
import { useQuiz } from "@/hooks/useQuiz";
import HomeScreen from "@/components/HomeScreen";
import QuizCard from "@/components/QuizCard";
import FlashCard from "@/components/FlashCard";
import ProgressBar from "@/components/ProgressBar";
import ResultsScreen from "@/components/ResultsScreen";
import { motion } from "framer-motion";

const Index = () => {
  const { state, startQuiz, answerQuestion, nextQuestion, prevQuestion, reset, score, elapsed } = useQuiz();
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    nextQuestion();
  };

  const handlePrev = () => {
    setDirection(-1);
    prevQuestion();
  };

  // Home
  if (!state) {
    return (
      <div className="max-w-md mx-auto">
        <HomeScreen onStart={(mode, category) => startQuiz(mode, category, mode === "flashcard" ? 20 : 10)} />
      </div>
    );
  }

  // Results
  if (state.isComplete && state.mode !== "flashcard") {
    return (
      <div className="max-w-md mx-auto">
        <ResultsScreen
          score={score}
          total={state.questions.length}
          streak={state.bestStreak}
          elapsed={elapsed}
          onRestart={() => startQuiz(state.mode, undefined, state.questions.length)}
          onHome={reset}
        />
      </div>
    );
  }

  const currentQ = state.questions[state.currentIndex];

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
        <span className="text-meta text-sm font-semibold capitalize">{state.mode === "category" ? "Topic Quiz" : state.mode}</span>
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
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
