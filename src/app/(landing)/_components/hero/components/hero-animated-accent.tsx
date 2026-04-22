"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { HeroSparkleIcon } from "@/components/custom/icons/hero-sparkle-icon";
import { cn } from "@/lib/utils";

export interface HeroAnimatedAccentProps {
  words: readonly string[];
  className?: string;
}

const WORD_CHANGE_INTERVAL_MS = 3600;
const WORD_TRANSITION = {
  duration: 0.56,
  ease: [0.4, 0, 0.2, 1] as const,
};
const LAYOUT_TRANSITION = {
  duration: 0.56,
  ease: [0.4, 0, 0.2, 1] as const,
};

export function HeroAnimatedAccent({ words, className }: HeroAnimatedAccentProps) {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const accessiblePhrase = `${words[0] ?? ""} is using?`;

  useEffect(() => {
    if (prefersReducedMotion || words.length <= 1) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setActiveWordIndex((currentIndex) => (currentIndex + 1) % words.length);
    }, WORD_CHANGE_INTERVAL_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activeWordIndex, prefersReducedMotion, words]);

  return (
    <span className={cn("hero-title__accent", className)}>
      <span className="sr-only">{accessiblePhrase}</span>

      <motion.span
        aria-hidden="true"
        className="hero-title__accent-content"
        layout="position"
        transition={{ layout: LAYOUT_TRANSITION }}
      >
        <motion.span className="hero-title__accent-word-sequence" layout="position" transition={{ layout: LAYOUT_TRANSITION }}>
          <AnimatePresence initial={false} mode="sync">
            <motion.span
              animate={{ opacity: 1 }}
              className="hero-title__accent-word"
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              key={words[activeWordIndex]}
              transition={WORD_TRANSITION}
            >
              {words[activeWordIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.span>

        <motion.span className="hero-title__accent-suffix" layout="position" transition={{ layout: LAYOUT_TRANSITION }}>
          <span className="hero-title__accent-suffix-text">is</span>
          <span className="hero-title__accent-using">
            <span className="hero-title__accent-using-letter">
              u
              <HeroSparkleIcon className="hero-accent-sparkle--using" />
            </span>
            <span className="hero-title__accent-suffix-text">sing</span>
          </span>
          <span className="hero-title__accent-suffix-text">?</span>
        </motion.span>
      </motion.span>
    </span>
  );
}
