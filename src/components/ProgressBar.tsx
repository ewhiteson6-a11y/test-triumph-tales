import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  streak: number;
}

export default function ProgressBar({ current, total, streak }: ProgressBarProps) {
  const progress = ((current + 1) / total) * 100;
  
  return (
    <div className="w-full px-4 pt-2">
      <div className="relative h-3 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full bg-primary ${streak >= 3 ? "animate-pulse-glow" : ""}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ 
            background: streak >= 5 
              ? "linear-gradient(90deg, hsl(158, 64%, 52%), hsl(262, 80%, 60%))" 
              : undefined 
          }}
        />
        {/* Liquid squishy effect */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-primary/20"
          animate={{ 
            width: `${Math.min(progress + 2, 100)}%`,
            scaleY: [1, 1.2, 1],
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-meta nums">{current + 1} / {total}</span>
        {streak >= 2 && (
          <motion.span 
            className="text-sm font-semibold text-primary"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            🔥 {streak} streak
          </motion.span>
        )}
      </div>
    </div>
  );
}
