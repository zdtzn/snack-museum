"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions, computeResult, type PersonalityId } from "@/components/test/TestData";
import { QuestionCard } from "@/components/test/QuestionCard";
import { ProgressBar } from "@/components/test/ProgressBar";
import { MixingLoader } from "@/components/test/MixingLoader";
import { ResultCard } from "@/components/test/ResultCard";
import { CustomerService } from "@/components/snack/CustomerService";

type Phase = "start" | "quiz" | "mixing" | "result";

export function TestClient() {
  const [phase, setPhase] = useState<Phase>("start");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<PersonalityId[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showCustomerService, setShowCustomerService] = useState(false);

  useEffect(() => {
    const handler = () => setShowCustomerService(true);
    window.addEventListener("open-customer-service", handler);
    return () => window.removeEventListener("open-customer-service", handler);
  }, []);

  const startQuiz = useCallback(() => {
    setPhase("quiz");
    setCurrentQ(0);
    setAnswers([]);
    setSelectedIdx(null);
  }, []);

  const handleSelect = useCallback(
    (idx: number) => {
      if (phase !== "quiz") return;
      setSelectedIdx(idx);
      const personality = questions[currentQ].options[idx].personality;

      // 短暂延迟后跳下一题
      setTimeout(() => {
        const newAnswers = [...answers, personality];
        if (currentQ + 1 >= questions.length) {
          setAnswers(newAnswers);
          setPhase("mixing");
          // 搅拌动画 2.5 秒后出结果
          setTimeout(() => {
            setPhase("result");
          }, 2500);
        } else {
          setAnswers(newAnswers);
          setCurrentQ((c) => c + 1);
          setSelectedIdx(null);
        }
      }, 300);
    },
    [currentQ, answers, phase]
  );

  const handleRetry = useCallback(() => {
    startQuiz();
  }, [startQuiz]);

  const result = answers.length >= 5 ? computeResult(answers) : null;

  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col items-center px-4 py-8">
      {/* 开始页 */}
      {phase === "start" && (
        <motion.div
          className="flex flex-col items-center justify-center flex-1 text-center max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            className="text-7xl mb-6"
            animate={{ rotate: [0, -8, 8, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🧬
          </motion.p>
          <h1 className="text-3xl sm:text-4xl font-extrabold gradient-text mb-3">
            测测你的零食人格
          </h1>
          <p className="text-dark/50 mb-8 max-w-sm leading-relaxed">
            5道灵魂拷问，揭开你藏在味蕾深处的真实性格。<br />
            据说测完的人……都开始疯狂囤零食了 🤫
          </p>

          <div className="grid grid-cols-5 gap-2 mb-8">
            {["🍮", "🌶", "🔥", "✨", "🫖"].map((e, i) => (
              <motion.span
                key={i}
                className="text-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
              >
                {e}
              </motion.span>
            ))}
          </div>

          <motion.button
            onClick={startQuiz}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-primary to-accent text-white font-extrabold
              text-lg rounded-2xl shadow-xl shadow-accent/20 hover:shadow-2xl hover:scale-105
              transition-all active:scale-95"
          >
            开始测试 🚀
          </motion.button>

          <p className="text-xs text-dark/25 mt-6">仅需 60 秒 · 已有 9999+ 人完成测试</p>
        </motion.div>
      )}

      {/* 答题中 */}
      {phase === "quiz" && (
        <div className="w-full max-w-lg pt-4">
          <ProgressBar current={currentQ} total={questions.length} />
          <QuestionCard
            key={currentQ}
            question={questions[currentQ]}
            onSelect={handleSelect}
          />
        </div>
      )}

      {/* 搅拌 Loading */}
      {phase === "mixing" && (
        <div className="flex-1 flex items-center justify-center w-full">
          <MixingLoader />
        </div>
      )}

      {/* 结果 */}
      {phase === "result" && result && (
        <div className="w-full pt-4 pb-12">
          <ResultCard result={result} onRetry={handleRetry} />
        </div>
      )}

      {showCustomerService && <CustomerService onClose={() => setShowCustomerService(false)} />}
    </div>
  );
}
