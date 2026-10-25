import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";

type RevealedWordProps = {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  emphasizedWords: string[];
  rangeStart: number;
  rangeSize: number;
};

function RevealedWord({
  word,
  index,
  total,
  progress,
  emphasizedWords,
  rangeStart,
  rangeSize,
}: RevealedWordProps) {
  const reduceMotion = useReducedMotion();
  const start = rangeStart + (index / Math.max(total, 1)) * rangeSize;
  const end = Math.min(start + 0.11, 1);
  const opacity = useTransform(progress, [start, end], [reduceMotion ? 1 : 0.15, 1]);
  const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
  const emphasized = emphasizedWords.includes(cleanWord);

  return (
    <motion.span
      className={emphasized ? "text-festival-gold" : "text-hero-subtitle"}
      style={{ opacity }}
    >
      {word}{index < total - 1 ? " " : ""}
    </motion.span>
  );
}

type ScrollRevealProps = {
  text: string;
  progress: MotionValue<number>;
  emphasizedWords?: string[];
  rangeStart?: number;
  rangeSize?: number;
  className?: string;
};

export function ScrollRevealParagraph({
  text,
  progress,
  emphasizedWords = [],
  rangeStart = 0,
  rangeSize = 0.7,
  className,
}: ScrollRevealProps) {
  const words = text.split(/\s+/);

  return (
    <p className={className}>
      {words.map((word, index) => (
        <RevealedWord
          key={`${word}-${index}`}
          word={word}
          index={index}
          total={words.length}
          progress={progress}
          emphasizedWords={emphasizedWords}
          rangeStart={rangeStart}
          rangeSize={rangeSize}
        />
      ))}
    </p>
  );
}
