import { motion } from "framer-motion";

interface ResultsScreenProps {
  score: number;
  total: number;
  streak: number;
  elapsed: number;
  onRestart: () => void;
  onHome: () => void;
}

export default function ResultsScreen({ score, total, streak, elapsed, onRestart, onHome }: ResultsScreenProps) {
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 70;
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

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
          {passed ? "🎉" : "💪"}
        </motion.div>
        <h1 className="text-display text-3xl text-foreground">
          {passed ? "Crushed it!" : "Keep pushing!"}
        </h1>
        <p className="text-body text-muted-foreground mt-2">
          {passed 
            ? "You're getting closer to acing that provisional!" 
            : "Every attempt makes you stronger. Try again!"}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-8">
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
        className="card-surface p-4 w-full max-w-sm text-center mb-8 glow-primary"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, type: "spring" }}
      >
        <span className="text-primary font-bold text-lg">+{score * 10 + streak * 5} Focus XP earned!</span>
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
