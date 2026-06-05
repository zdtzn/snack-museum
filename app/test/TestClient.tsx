"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { questions, computeResult, type PersonalityId, type PersonalityResult } from "@/components/test/TestData";
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
  // 新增：明确缓存计算出来的结果，防止 React 异步渲染导致结果穿透或为 null
  const [finalResult, setFinalResult] = useState<PersonalityResult | null>(null);
  const [showCustomerService, setShowCustomerService] = useState(false);

  // 监听全局客服唤起事件
  useEffect(() => {
    const handler = () => setShowCustomerService(true);
    window.addEventListener("open-customer-service", handler);
    return () => window.removeEventListener("open-customer-service", handler);
  }, []);

  // 重置并开始测试
  const startQuiz = useCallback(() => {
    setPhase("quiz");
    setCurrentQ(0);
    setAnswers([]);
    setFinalResult(null);
  }, []);

  // 处理选项点击
  const handleSelect = useCallback((idx: number) => {
    const personality = questions[currentQ].options[idx].personality;

    // 1. 优先使用函数式更新，确保在多步异步操作中彻底解决 React 状态闭包 Bug
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers, personality];

      // 2. 判断是否是最后一道题
      if (currentQ + 1 >= questions.length) {
        // 在进入 loading 前，就把结果精准算出来并存好
        const calculated = computeResult(newAnswers);
        setFinalResult(calculated);
        
        // 丝滑切入"搅拌中"动画
        setPhase("mixing");
        
        // 2.5秒后准时呈现海报结果
        setTimeout(() => {
          setPhase("result");
        }, 2500);
      } else {
        // 不是最后一题，正常挺进下一题
        setCurrentQ((c) => c + 1);
      }

      return newAnswers;
    });
  }, [currentQ]);

  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col items-center px-4 py-8">
      {/* 1. 开始欢迎页 */}
      {phase === "start" && (
        <motion.div className="flex flex-col items-center justify-center flex-1 text-center max-w-lg"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <motion.p className="text-7xl mb-6" animate={{ rotate: [0, -8, 8, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}>🧬</motion.p>
          <h1 className="text-3xl sm:text-4xl font-extrabold gradient-text mb-3">测测你的零食人格</h1>
          <p className="text-dark/50 mb-8 max-w-sm leading-relaxed">
            5道灵魂拷问，揭开你藏在味蕾深处的真实性格。<br />
            据说测完的人……都开始疯狂囤零食了 🤫
          </p>
          <motion.button onClick={startQuiz} whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-primary to-accent text-white font-extrabold
              text-lg rounded-2xl shadow-xl shadow-accent/20 hover:shadow-2xl hover:scale-105
              transition-all active:scale-95">
            开始测试 🚀
          </motion.button>
          <p className="text-xs text-dark/25 mt-6">仅需 60 秒 · 已有 9999+ 人完成测试</p>
        </motion.div>
      )}

      {/* 2. 答题进行中 */}
      {phase === "quiz" && (
        <div className="w-full max-w-lg pt-4">
          <ProgressBar current={currentQ} total={questions.length} />
          {/* 使用 key={currentQ} 确保切换题目时有丝滑的动态加载/刷新效果 */}
          <QuestionCard key={currentQ} question={questions[currentQ]} onSelect={handleSelect} />
        </div>
      )}

      {/* 3. 算法搅拌动态 Loading */}
      {phase === "mixing" && (
        <div className="flex-1 flex items-center justify-center w-full">
          <MixingLoader />
        </div>
      )}

      {/* 4. 结果卡片展示页 */}
      {phase === "result" && finalResult && (
        <div className="w-full pt-4 pb-12">
          <ResultCard result={finalResult} onRetry={startQuiz} />
        </div>
      )}

      {/* 全局私域弹窗组件 */}
      {showCustomerService && <CustomerService onClose={() => setShowCustomerService(false)} />}
    </div>
  );
}
