import { motion } from "framer-motion";
import { categories } from "@/data/questions";
import type { QuizMode } from "@/hooks/useQuiz";

interface HomeScreenProps {
  onStart: (mode: QuizMode, category?: string) => void;
}

const modeCards = [
  {
    mode: "sprint" as QuizMode,
    title: "Exam Sprint",
    subtitle: "10 rapid-fire questions",
    emoji: "⚡",
    description: "Quick burst to test your knowledge",
  },
  {
    mode: "flashcard" as QuizMode,
    title: "Flashcards",
    subtitle: "Flip & learn at your pace",
    emoji: "🃏",
    description: "Study mode with card flipping",
  },
];

const categoryEmojis: Record<string, string> = {
  "Traffic Lights": "🚦",
  "Parking": "🅿️",
  "Road Markings": "🛣️",
  "Signs": "🪧",
  "Rules": "📋",
  "Following Distance": "📏",
  "Vehicle Controls": "🎛️",
  "Lights": "💡",
  "Railway Crossings": "🚂",
  "Right of Way": "🚗",
  "Night Driving": "🌙",
  "Traffic Circles": "🔄",
  "Vehicle Safety": "🛡️",
  "Towing": "🔗",
  "Motorcycles": "🏍️",
  "Pedestrians": "🚶",
  "Cyclists": "🚴",
  "Licensing": "📄",
  "Speed": "💨",
  "Safety": "⛑️",
  "Bridges": "🌉",
  "Stopping Distance": "🛑",
  "Signals": "🔔",
};

export default function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <div className="min-h-screen px-4 pb-8">
      {/* Header */}
      <motion.div 
        className="pt-12 pb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.div 
          className="text-5xl mb-3"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          🚗
        </motion.div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight" style={{ letterSpacing: "-0.02em" }}>
          Pulse
        </h1>
        <p className="text-body text-muted-foreground mt-1">
          Ready to crush the Provisional?
        </p>
      </motion.div>

      {/* Mode Cards */}
      <div className="space-y-3 mb-8">
        {modeCards.map((card, i) => (
          <motion.button
            key={card.mode}
            onClick={() => onStart(card.mode)}
            className="w-full card-surface p-5 text-left active:scale-[0.98] bounce-ease"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.1, type: "spring", stiffness: 260, damping: 20 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">{card.emoji}</span>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                <p className="text-meta text-sm">{card.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Category Practice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-3 px-1">Practice by Topic</h2>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              onClick={() => onStart("category", cat)}
              className="card-surface p-3 text-left active:scale-[0.97] bounce-ease"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="text-xl">{categoryEmojis[cat] || "📚"}</span>
              <p className="text-sm font-medium text-foreground mt-1 leading-tight">{cat}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Daily tip */}
      <motion.div
        className="mt-8 card-surface p-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-sm text-muted-foreground">
          💡 <strong className="text-foreground">90 questions</strong> from your exam documents loaded and ready to go!
        </p>
      </motion.div>
    </div>
  );
}
