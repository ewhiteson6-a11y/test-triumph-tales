import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Question } from "@/data/questions";

interface QuizCardProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswer: (index: number) => void;
  onNext: () => void;
  direction: number;
}

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    rotate: direction > 0 ? 10 : -10,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 25 },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    rotate: direction < 0 ? 10 : -10,
  }),
};

export default function QuizCard({ question, selectedAnswer, onAnswer, onNext, direction }: QuizCardProps) {
  const [shaking, setShaking] = useState(false);
  const answered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === question.correctIndex;

  const handleSelect = (index: number) => {
    if (answered) return;
    onAnswer(index);
    if (index !== question.correctIndex) {
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
    }
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={question.id}
        custom={direction}
        variants={cardVariants}
        initial="enter"
        animate="center"
        exit="exit"
        className={`card-surface p-6 min-h-[420px] flex flex-col ${shaking ? "animate-shake" : ""}`}
      >
        {/* Category chip */}
        <span className="text-meta text-xs font-medium bg-secondary px-3 py-1 rounded-full self-start mb-4">
          {question.category}
        </span>

        {/* Question */}
        <h2 className="text-display text-foreground mb-8 flex-grow flex items-center">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, i) => {
            const isSelected = selectedAnswer === i;
            const isCorrectOption = i === question.correctIndex;
            
            let optionStyle = "bg-secondary text-foreground";
            if (answered) {
              if (isCorrectOption) optionStyle = "bg-primary text-primary-foreground";
              else if (isSelected && !isCorrectOption) optionStyle = "bg-destructive text-destructive-foreground";
            }

            return (
              <motion.button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={answered}
                className={`w-full p-4 card-inner text-left font-medium transition-all bounce-ease ${optionStyle} ${
                  !answered ? "active:scale-[0.97]" : ""
                }`}
                whileTap={!answered ? { scale: 0.97 } : {}}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
              >
                <span className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center text-sm font-bold nums">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {option}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Next button */}
        {answered && (
          <motion.button
            onClick={onNext}
            className="mt-6 w-full py-4 rounded-[12px] bg-primary text-primary-foreground font-semibold text-lg bounce-ease active:scale-[0.97]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileTap={{ scale: 0.97 }}
          >
            {isCorrect ? "You've got this! Next →" : "Keep going! Next →"}
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
