import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories, questions } from "@/data/questions";
import type { QuizMode } from "@/hooks/useQuiz";
import type { Stats } from "@/hooks/useStats";

interface HomeScreenProps {
  onStart: (mode: QuizMode, category?: string, count?: number, questionIds?: number[]) => void;
  stats: Stats;
  missedIds: number[];
}

const modeCards = [
  {
    mode: "sprint" as QuizMode,
    title: "Exam Sprint",
    subtitle: "10 rapid-fire questions",
    emoji: "⚡",
    description: "Quick burst to test your knowledge",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    mode: "marathon" as QuizMode,
    title: "Full Marathon",
    subtitle: "All 90 questions",
    emoji: "🏁",
    description: "Complete exam simulation",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    mode: "flashcard" as QuizMode,
    title: "Flashcards",
    subtitle: "Flip & learn at your pace",
    emoji: "🃏",
    description: "Study mode with card flipping",
    gradient: "from-secondary to-muted",
  },
];

const categoryEmojis: Record<string, string> = {
  "Traffic Lights": "🚦", "Parking": "🅿️", "Road Markings": "🛣️", "Signs": "🪧",
  "Rules": "📋", "Following Distance": "📏", "Vehicle Controls": "🎛️", "Lights": "💡",
  "Railway Crossings": "🚂", "Right of Way": "🚗", "Night Driving": "🌙",
  "Traffic Circles": "🔄", "Vehicle Safety": "🛡️", "Towing": "🔗", "Motorcycles": "🏍️",
  "Pedestrians": "🚶", "Cyclists": "🚴", "Licensing": "📄", "Speed": "💨",
  "Safety": "⛑️", "Bridges": "🌉", "Stopping Distance": "🛑", "Signals": "🔔",
};

function getLevelInfo(xp: number) {
  const level = Math.floor(xp / 200) + 1;
  const currentXp = xp % 200;
  return { level, currentXp, nextLevelXp: 200 };
}

export default function HomeScreen({ onStart, stats, missedIds }: HomeScreenProps) {
  const [showTopics, setShowTopics] = useState(false);
  const { level, currentXp, nextLevelXp } = getLevelInfo(stats.xp);
  const accuracy = stats.totalAnswered > 0 ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100) : 0;

  // Identify weak categories
  const weakCats = Object.entries(stats.weakCategories)
    .filter(([, v]) => v.total >= 3 && (v.correct / v.total) < 0.6)
    .sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total))
    .slice(0, 3);

  return (
    <div className="min-h-screen px-4 pb-8">
      {/* Header */}
      <motion.div
        className="pt-10 pb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              Pulse
            </h1>
            <p className="text-meta mt-0.5">Provisional Exam Prep</p>
          </div>
          <motion.div 
            className="card-surface px-4 py-2 flex items-center gap-2"
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg">🏆</span>
            <div className="text-right">
              <p className="text-xs text-muted-foreground font-medium">Level</p>
              <p className="text-lg font-bold text-foreground nums leading-none">{level}</p>
            </div>
          </motion.div>
        </div>

        {/* XP Progress */}
        <div className="card-surface p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">Focus XP</span>
            <span className="text-xs text-muted-foreground nums">{currentXp}/{nextLevelXp}</span>
          </div>
          <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentXp / nextLevelXp) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-3">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground nums">{stats.totalSessions}</p>
              <p className="text-xs text-muted-foreground">Sessions</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground nums">{accuracy}%</p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground nums">{stats.bestStreak}🔥</p>
              <p className="text-xs text-muted-foreground">Best Streak</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mode Cards */}
      <div className="space-y-3 mb-6">
        {modeCards.map((card, i) => (
          <motion.button
            key={card.mode}
            onClick={() => onStart(card.mode, undefined, card.mode === "marathon" ? 90 : card.mode === "flashcard" ? 20 : 10)}
            className={`w-full card-surface p-5 text-left active:scale-[0.98] bounce-ease bg-gradient-to-r ${card.gradient}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.1, type: "spring", stiffness: 260, damping: 20 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">{card.emoji}</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                <p className="text-meta text-sm">{card.description}</p>
              </div>
              <span className="text-muted-foreground text-xl">→</span>
            </div>
          </motion.button>
        ))}

        {/* Review Mistakes */}
        {missedIds.length > 0 && (
          <motion.button
            onClick={() => onStart("mistakes", undefined, missedIds.length, missedIds)}
            className="w-full card-surface p-5 text-left active:scale-[0.98] bounce-ease bg-gradient-to-r from-destructive/10 to-destructive/5 border border-destructive/20"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 20 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">🔁</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">Review Mistakes</h3>
                <p className="text-meta text-sm">{missedIds.length} questions to revisit</p>
              </div>
              <span className="text-muted-foreground text-xl">→</span>
            </div>
          </motion.button>
        )}
      </div>

      {/* Weak Areas */}
      {weakCats.length > 0 && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-sm font-semibold text-destructive mb-2 px-1 flex items-center gap-1">
            ⚠️ Needs Attention
          </h2>
          <div className="flex gap-2 flex-wrap">
            {weakCats.map(([cat, v]) => (
              <motion.button
                key={cat}
                onClick={() => onStart("category", cat)}
                className="card-surface px-3 py-2 text-sm font-medium text-foreground border border-destructive/20 active:scale-95 bounce-ease"
                whileTap={{ scale: 0.95 }}
              >
                {categoryEmojis[cat] || "📚"} {cat}
                <span className="text-destructive ml-1 text-xs nums">{Math.round((v.correct / v.total) * 100)}%</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Category Practice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={() => setShowTopics(v => !v)}
          className="flex items-center justify-between w-full px-1 mb-3"
        >
          <h2 className="text-lg font-semibold text-foreground">Practice by Topic</h2>
          <motion.span
            animate={{ rotate: showTopics ? 180 : 0 }}
            className="text-muted-foreground"
          >
            ▼
          </motion.span>
        </button>

        <AnimatePresence>
          {showTopics && (
            <motion.div
              className="grid grid-cols-2 gap-2"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {categories.map((cat, i) => {
                const catQuestions = questions.filter(q => q.category === cat).length;
                const catStat = stats.weakCategories[cat];
                const catAccuracy = catStat && catStat.total > 0 ? Math.round((catStat.correct / catStat.total) * 100) : null;

                return (
                  <motion.button
                    key={cat}
                    onClick={() => onStart("category", cat)}
                    className="card-surface p-3 text-left active:scale-[0.97] bounce-ease"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{categoryEmojis[cat] || "📚"}</span>
                      {catAccuracy !== null && (
                        <span className={`text-xs font-bold nums ${catAccuracy >= 70 ? "text-primary" : "text-destructive"}`}>
                          {catAccuracy}%
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-foreground mt-1 leading-tight">{cat}</p>
                    <p className="text-xs text-muted-foreground">{catQuestions} Qs</p>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Install hint */}
      <motion.div
        className="mt-8 card-surface p-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-sm text-muted-foreground">
          📲 <strong className="text-foreground">Install Pulse</strong> — Add to Home Screen from your browser menu for offline access!
        </p>
      </motion.div>
    </div>
  );
}
