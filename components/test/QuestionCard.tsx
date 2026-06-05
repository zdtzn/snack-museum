"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Question } from "./TestData";

interface QuestionCardProps {
  question: Question;
  onSelect: (idx: number) => void;
}

export function QuestionCard({ question, onSelect }: QuestionCardProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -60 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="w-full max-w-lg mx-auto"
      >
        {/* 题目标题 */}
        <div className="text-center mb-8">
          <motion.p
            className="text-2xl sm:text-3xl font-extrabold text-dark mb-2 leading-snug"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {question.title}
          </motion.p>
          {question.subtitle && (
            <motion.p
              className="text-sm text-dark/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {question.subtitle}
            </motion.p>
          )}
        </div>

        {/* 选项 */}
        <div className="space-y-3">
          {question.options.map((opt, idx) => (
            <motion.button
              key={idx}
              onClick={() => onSelect(idx)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + idx * 0.08 }}
              whileTap={{ scale: 0.97 }}
              className="w-full glass card-hover p-4 sm:p-5 text-left flex items-start gap-4 group
                hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <span className="text-3xl shrink-0 group-hover:scale-110 transition-transform">
                {opt.emoji}
              </span>
              <span className="text-sm sm:text-base text-dark/70 group-hover:text-dark leading-relaxed transition-colors">
                {opt.text}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
