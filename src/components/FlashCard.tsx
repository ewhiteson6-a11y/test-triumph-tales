import { useState } from "react";
import { motion } from "framer-motion";

interface ShuffledQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  category: string;
  explanation?: string;
  shuffledOptions: string[];
  shuffledCorrectIndex: number;
}

interface FlashCardProps {
  question: ShuffledQuestion;
  onNext: () => void;
  onPrev: () => void;
  index: number;
  total: number;
}

export default function FlashCard({ question, onNext, onPrev, index, total }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped(f => !f);

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="w-full perspective-[1200px] cursor-pointer"
        onClick={handleFlip}
        style={{ minHeight: 380 }}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d", minHeight: 380 }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 card-surface p-8 flex flex-col justify-center items-center text-center backface-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span className="text-meta text-xs font-medium bg-secondary px-3 py-1 rounded-full mb-6">
              {question.category}
            </span>
            <h2 className="text-display text-foreground">{question.question}</h2>
            <p className="text-meta mt-6">Tap to flip 👆</p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 card-surface p-8 flex flex-col justify-center items-center text-center"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <span className="text-sm font-medium text-primary mb-2">Answer</span>
            <h2 className="text-display text-foreground mb-4">
              {question.options[question.correctIndex]}
            </h2>
            <div className="space-y-2 mt-4 w-full">
              {question.options.map((opt, i) => (
                <div
                  key={i}
                  className={`p-3 card-inner text-sm ${
                    i === question.correctIndex
                      ? "bg-primary/10 text-primary font-semibold"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {String.fromCharCode(65 + i)}. {opt}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 w-full">
        <motion.button
          onClick={onPrev}
          className="flex-1 py-4 rounded-[12px] bg-secondary text-foreground font-semibold bounce-ease"
          whileTap={{ scale: 0.95 }}
        >
          ← Back
        </motion.button>
        <span className="text-meta nums">{index + 1}/{total}</span>
        <motion.button
          onClick={() => { setFlipped(false); onNext(); }}
          className="flex-1 py-4 rounded-[12px] bg-primary text-primary-foreground font-semibold bounce-ease"
          whileTap={{ scale: 0.95 }}
        >
          Next →
        </motion.button>
      </div>
    </div>
  );
}
