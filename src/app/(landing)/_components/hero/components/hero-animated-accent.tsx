"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { HeroSparkleIcon } from "@/components/custom/icons/hero-sparkle-icon";
import { cn } from "@/lib/utils";

export interface HeroAnimatedAccentProps {
  words: readonly string[];
  className?: string;
}

const WORD_CHANGE_INTERVAL_MS = 4800;
const WORD_TRANSITION = {
  duration: 2.65,
  ease: [0.22, 1, 0.36, 1] as const,
};
const WORD_EXIT_TRANSITION = {
  duration: 1.7,
  ease: [0.22, 1, 0.36, 1] as const,
};
const LAYOUT_TRANSITION = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function HeroAnimatedAccent({ words, className }: HeroAnimatedAccentProps) {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [activeWordWidth, setActiveWordWidth] = useState<number | null>(null);
  const activeWordSizerRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const activeWord = words[activeWordIndex] ?? words[0] ?? "";
  const activeAccentText = activeWord.endsWith("?") ? activeWord : `${activeWord}?`;

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

  useLayoutEffect(() => {
    const sizerElement = activeWordSizerRef.current;

    if (!sizerElement) {
      return;
    }

    const updateWordWidth = () => {
      setActiveWordWidth(sizerElement.offsetWidth);
    };

    updateWordWidth();

    const resizeObserver = new ResizeObserver(updateWordWidth);
    resizeObserver.observe(sizerElement);
    window.addEventListener("resize", updateWordWidth);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateWordWidth);
    };
  }, [activeAccentText]);

  return (
    <span className={cn("hero-title__accent", className)}>
      <span className="sr-only">{activeAccentText}</span>

      <motion.span
        aria-hidden="true"
        className="hero-title__accent-content"
        layout="position"
        transition={{ layout: LAYOUT_TRANSITION }}
      >
        <motion.span
          animate={activeWordWidth === null ? undefined : { width: activeWordWidth }}
          className="hero-title__accent-word-sequence"
          initial={false}
          layout="position"
          transition={LAYOUT_TRANSITION}
        >
          <span ref={activeWordSizerRef} aria-hidden="true" className="hero-title__accent-word-sizer">
            {activeAccentText}
          </span>
          <AnimatePresence initial={false} mode="sync">
            <motion.span
              animate={{ filter: "blur(0px)", opacity: 1 }}
              className="hero-title__accent-word"
              exit={prefersReducedMotion ? { opacity: 1 } : { filter: "blur(2px)", opacity: 0, transition: WORD_EXIT_TRANSITION }}
              initial={prefersReducedMotion ? false : { filter: "blur(3px)", opacity: 0 }}
              key={activeAccentText}
              transition={WORD_TRANSITION}
            >
              <span className="hero-title__accent-word-text">{activeAccentText}</span>
              <HeroSparkleIcon className="hero-accent-sparkle--word" />
            </motion.span>
          </AnimatePresence>
        </motion.span>
      </motion.span>
    </span>
  );
}
