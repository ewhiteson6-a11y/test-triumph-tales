import { motion } from "framer-motion";

interface ResultsScreenProps {
  score: number;
  total: number;
  streak: number;
  elapsed: number;
  xpEarned: number;
  totalXp: number;
  onRestart: () => void;
  onHome: () => void;
  onReviewMistakes?: () => void;
  hasMistakes: boolean;
}

export default function ResultsScreen({
  score, total, streak, elapsed, xpEarned, totalXp,
  onRestart, onHome, onReviewMistakes, hasMistakes
}: ResultsScreenProps) {
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 70;
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  const getMessage = () => {
    if (percentage === 100) return { emoji: "👑", title: "PERFECT!", sub: "You absolutely nailed it!" };
    if (percentage >= 90) return { emoji: "🎉", title: "Outstanding!", sub: "Almost perfect — incredible work!" };
    if (percentage >= 70) return { emoji: "✅", title: "Passed!", sub: "You're getting closer to acing that provisional!" };
    if (percentage >= 50) return { emoji: "💪", title: "Keep pushing!", sub: "You're making progress. Try again!" };
    return { emoji: "📖", title: "Study time!", sub: "Use flashcards to strengthen weak areas." };
  };

  const msg = getMessage();

  const stats = [
    { label: "Score", value: `${score}/${total}`, emoji: "🎯" },
    { label: "Accuracy", value: `${percentage}%`, emoji: passed ? "✅" : "📈" },
    { label: "Best Streak", value: `${streak}`, emoji: "🔥" },
    { label: "Time", value: `${minutes}:${String(seconds).padStart(2, "0")}`, emoji: "⏱️" },
  ];

  return (
    <div className="flex flex-col items-center px-4 py-8 min-h-screen">
      {/* Hero */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.div
          className="text-7xl mb-4"
          animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {msg.emoji}
        </motion.div>
        <h1 className="text-display text-3xl text-foreground">{msg.title}</h1>
        <p className="text-body text-muted-foreground mt-2">{msg.sub}</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="card-surface p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="text-2xl mb-1">{stat.emoji}</div>
            <div className="text-2xl font-bold text-foreground nums">{stat.value}</div>
            <div className="text-meta text-xs">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* XP Earned */}
      <motion.div
        className="card-surface p-4 w-full max-w-sm text-center mb-4 glow-primary"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, type: "spring" }}
      >
        <span className="text-primary font-bold text-lg">+{xpEarned} Focus XP earned!</span>
        <p className="text-xs text-muted-foreground mt-1">Total: {totalXp} XP</p>
      </motion.div>

      {/* Pass/Fail bar */}
      <motion.div
        className="w-full max-w-sm mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="h-3 bg-secondary rounded-full overflow-hidden relative">
          <motion.div
            className={`h-full rounded-full ${passed ? "bg-primary" : "bg-destructive"}`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
          />
          {/* 70% pass marker */}
          <div className="absolute top-0 bottom-0 left-[70%] w-0.5 bg-foreground/30" />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground">0%</span>
          <span className="text-xs text-muted-foreground">Pass: 70%</span>
          <span className="text-xs text-muted-foreground">100%</span>
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex flex-col gap-3 w-full max-w-sm safe-bottom">
        <motion.button
          onClick={onRestart}
          className="w-full py-4 rounded-[12px] bg-primary text-primary-foreground font-semibold text-lg bounce-ease"
          whileTap={{ scale: 0.97 }}
        >
          {passed ? "Go Again 🚀" : "Try Again 💪"}
        </motion.button>
        {hasMistakes && onReviewMistakes && (
          <motion.button
            onClick={onReviewMistakes}
            className="w-full py-4 rounded-[12px] bg-destructive/10 text-destructive font-semibold text-lg bounce-ease border border-destructive/20"
            whileTap={{ scale: 0.97 }}
          >
            Review Mistakes 🔁
          </motion.button>
        )}
        <motion.button
          onClick={onHome}
          className="w-full py-4 rounded-[12px] bg-secondary text-foreground font-semibold text-lg bounce-ease"
          whileTap={{ scale: 0.97 }}
        >
          Back to Home
        </motion.button>
      </div>
    </div>
  );
}
