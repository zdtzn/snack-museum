"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { PersonalityResult } from "./TestData";
import { results } from "./TestData";
import { Share2, RotateCcw, Copy, Check } from "lucide-react";

interface ResultCardProps {
  result: PersonalityResult;
  onRetry: () => void;
}

/** SVG 雷达图 */
function RadarSVG({ radar }: { radar: PersonalityResult["radar"] }) {
  const labels = [
    { key: "socialGlow", label: "社交高光度" },
    { key: "stressHardcore", label: "抗压硬核度" },
    { key: "emotional", label: "情感细腻度" },
    { key: "optimism", label: "乐天开心值" },
    { key: "reliable", label: "靠谱陪伴感" },
  ];

  const cx = 100, cy = 100, r = 70, sides = labels.length;
  const toRad = (i: number) => (Math.PI * 2 * i) / sides - Math.PI / 2;

  const maxVal = 50;
  const values = labels.map((l) => radar[l.key as keyof typeof radar] || 0);

  // 多边形坐标
  const polyPoints = values
    .map((v, i) => {
      const ratio = v / maxVal;
      const x = cx + Math.cos(toRad(i)) * r * ratio;
      const y = cy + Math.sin(toRad(i)) * r * ratio;
      return `${x},${y}`;
    })
    .join(" ");

  // 背景网格（3层同心多边形）
  const grids = [0.33, 0.66, 1].map((ratio) =>
    labels
      .map((_, i) => {
        const x = cx + Math.cos(toRad(i)) * r * ratio;
        const y = cy + Math.sin(toRad(i)) * r * ratio;
        return `${x},${y}`;
      })
      .join(" ")
  );

  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[220px] mx-auto">
      {/* 背景网格 */}
      {grids.map((pts, j) => (
        <polygon
          key={j}
          points={pts}
          fill="none"
          stroke="rgba(255,179,71,0.2)"
          strokeWidth="1"
        />
      ))}
      {/* 轴线 */}
      {labels.map((_, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={cx + Math.cos(toRad(i)) * r}
          y2={cy + Math.sin(toRad(i)) * r}
          stroke="rgba(255,179,71,0.15)"
          strokeWidth="1"
        />
      ))}
      {/* 数据区域 */}
      <polygon
        points={polyPoints}
        fill="rgba(255,179,71,0.25)"
        stroke="#FFB347"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* 数据点 */}
      {values.map((v, i) => {
        const x = cx + Math.cos(toRad(i)) * r * (v / maxVal);
        const y = cy + Math.sin(toRad(i)) * r * (v / maxVal);
        return <circle key={i} cx={x} cy={y} r="3.5" fill="#FF8C69" />;
      })}
      {/* 标签 */}
      {labels.map((l, i) => {
        const x = cx + Math.cos(toRad(i)) * (r + 22);
        const y = cy + Math.sin(toRad(i)) * (r + 22);
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-[10px] fill-dark/60 font-bold"
          >
            {l.label}
          </text>
        );
      })}
    </svg>
  );
}

export function ResultCard({ result, onRetry }: ResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  const { soulmate, nemesis } = result.match;
  const soulResult = results[soulmate];
  const nemeResult = results[nemesis];

  // 截图保存
  const handleScreenshot = async () => {
    if (!cardRef.current) return;
    setSaving(true);
    try {
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#fff8f0",
        scale: 2,
        useCORS: true,
      });
      const blob = await new Promise<Blob | null>((res) =>
        canvas.toBlob(res, "image/png")
      );
      if (!blob) {
        // fallback: download via link
        const link = document.createElement("a");
        link.download = `我的零食人格-${result.brand}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      } else {
        // try share API on mobile
        if (navigator.share && navigator.canShare?.({ files: [new File([blob], "test.png", { type: "image/png" })] })) {
          await navigator.share({
            files: [new File([blob], `零食人格-${result.brand}.png`, { type: "image/png" })],
            title: "我的零食人格",
            text: `我在鑫安好物优选测出了【${result.title}】！快来测测你是什么零食人格~`,
          });
        } else {
          const link = document.createElement("a");
          link.download = `我的零食人格-${result.brand}.png`;
          link.href = URL.createObjectURL(blob);
          link.click();
          URL.revokeObjectURL(link.href);
        }
      }
    } catch (e) {
      console.error("截图失败", e);
    }
    setSaving(false);
  };

  // 复制文案
  const handleCopy = async () => {
    const text = `我在鑫安好物优选测出了【${result.title}】！\n✨ 特质：${result.tags.join(" · ")}\n快来测测你是什么零食人格~`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-lg mx-auto"
    >
      {/* 结果卡片主体——截图核心区域 */}
      <div
        ref={cardRef}
        className="glass-heavy p-6 sm:p-8 relative overflow-hidden"
        style={{ borderTop: `4px solid ${result.color}` }}
      >
        {/* 人格标题 */}
        <div className="text-center mb-6">
          <motion.p
            className="text-5xl mb-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
          >
            {result.title.slice(0, 2)}
          </motion.p>
          <motion.h2
            className="text-2xl sm:text-3xl font-extrabold gradient-text mb-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {result.title}
          </motion.h2>
          <motion.p
            className="text-sm text-dark/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {result.subtitle}
          </motion.p>
        </div>

        {/* 特质标签 */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {result.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-bold text-white"
              style={{ background: result.color }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* 性格像素解析 */}
        <motion.div
          className="glass p-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-sm text-dark/70 leading-relaxed">{result.analysis}</p>
        </motion.div>

        {/* 社交雷达图 */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm font-bold text-dark/60 mb-2 text-center">
            📡 社交雷达图
          </p>
          <RadarSVG radar={result.radar} />
        </motion.div>

        {/* 社交合拍矩阵 */}
        <motion.div
          className="grid grid-cols-2 gap-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {/* 绝配 */}
          <div className="glass p-4 text-center border border-green/30">
            <p className="text-xs text-green font-bold mb-1">💚 绝配灵魂伴侣</p>
            <p className="text-sm font-extrabold text-dark">{soulResult.brand}</p>
            <p className="text-[10px] text-dark/40">{soulResult.title}</p>
          </div>
          {/* 互斥 */}
          <div className="glass p-4 text-center border border-pink/30">
            <p className="text-xs text-pink font-bold mb-1">💔 互斥绝缘体</p>
            <p className="text-sm font-extrabold text-dark">{nemeResult.brand}</p>
            <p className="text-[10px] text-dark/40">{nemeResult.title}</p>
          </div>
        </motion.div>

        {/* 微信转化钩子 */}
        <motion.button
          onClick={() =>
            window.dispatchEvent(new CustomEvent("open-customer-service"))
          }
          className="glass p-4 text-center border-2 border-green/30 bg-green/5 w-full cursor-pointer
            hover:bg-green/10 hover:scale-[1.02] transition-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <p className="text-lg mb-2">🎁</p>
          <p className="text-sm text-dark/70 leading-relaxed">{result.hook}</p>
          <p className="text-xs text-primary font-bold mt-2">👉 点击联系客服领福利</p>
        </motion.button>
      </div>

      {/* 操作按钮区 */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={onRetry}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3
            glass text-dark font-bold rounded-xl hover:bg-primary/5 transition-all text-sm"
        >
          <RotateCcw size={16} />
          重新测试
        </button>
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3
            glass text-dark font-bold rounded-xl hover:bg-primary/5 transition-all text-sm"
        >
          {copied ? <Check size={16} className="text-green" /> : <Copy size={16} />}
          {copied ? "已复制" : "复制文案"}
        </button>
        <button
          onClick={handleScreenshot}
          disabled={saving}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3
            bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl
            shadow-lg shadow-accent/20 hover:scale-105 transition-all text-sm disabled:opacity-60"
        >
          <Share2 size={16} />
          {saving ? "生成中..." : "保存海报"}
        </button>
      </div>

      {/* 再来一次 */}
      <div className="text-center mt-4">
        <button
          onClick={onRetry}
          className="text-xs text-dark/30 hover:text-primary transition-colors"
        >
          🔄 再测一次看看其他结果？
        </button>
      </div>
    </motion.div>
  );
}
