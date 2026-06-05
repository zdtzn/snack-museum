export const dynamic = "force-dynamic";

import { getSnacks } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { RatingStars } from "@/components/snack/RatingStars";
import { CustomerServiceButton } from "@/components/snack/CustomerServiceButton";
import { CATEGORY_EMOJIS, CATEGORY_LABELS } from "@/lib/snacks";

export default async function SnackDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const snacks = getSnacks();
  const snack = snacks.find((s) => s.id === slug);
  if (!snack) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="text-sm text-dark/40 hover:text-primary mb-6 inline-block">
        ← 返回首页
      </Link>

      <div className="glass p-6 sm:p-10">
        {/* 图片 */}
        <div className="relative w-full h-64 sm:h-80 rounded-2xl bg-gradient-to-br from-primary-light/30 via-accent/15 to-pink/15 flex items-center justify-center mb-8 overflow-hidden">
          {snack.image ? (
            <Image
              src={snack.image}
              alt={snack.name}
              fill
              sizes="(min-width: 768px) 896px, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <span className="text-8xl">{CATEGORY_EMOJIS[snack.category]}</span>
          )}
        </div>

        {/* 基本信息 */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs px-3 py-1 rounded-full bg-primary/15 text-primary font-bold">
            {CATEGORY_LABELS[snack.category]}
          </span>
          <span className="text-sm text-dark/40">{snack.brand}</span>
          <span className="text-sm text-dark/30">{snack.date}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-dark mb-2">{snack.name}</h1>
        <p className="text-dark/50 mb-4">{snack.subtitle}</p>

        {/* 口感评分 */}
        <div className="glass p-4 mb-6">
          <p className="text-sm font-bold text-dark/60 mb-2">口感评分</p>
          <RatingStars rating={snack.rating} size="lg" label="" />
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {snack.tags.map((t) => (
            <span key={t} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">{t}</span>
          ))}
        </div>

        {/* 简评 */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-dark/60 mb-2">简介</h3>
          <p className="text-dark/70 leading-relaxed">{snack.review}</p>
        </div>

        {/* 咨询客服 */}
        <CustomerServiceButton />

        {/* 联系方式 */}
        <div className="border-t border-primary/10 pt-6">
          <h3 className="text-sm font-bold text-dark/60 mb-4">📞 想购买？联系我们</h3>
          <div className="flex flex-wrap gap-3">
            <div className="glass p-4 flex-1 min-w-[200px]">
              <p className="text-sm font-bold text-green">💬 微信咨询</p>
              <p className="text-lg font-extrabold text-dark mt-1">
                {snack.wechat || "请加微信咨询"}
              </p>
            </div>
            {snack.phone && (
              <a href={`tel:${snack.phone}`} className="glass p-4 flex-1 min-w-[200px] hover:bg-primary/5 transition-colors">
                <p className="text-sm font-bold text-primary">📞 电话咨询</p>
                <p className="text-lg font-extrabold text-dark mt-1">{snack.phone}</p>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
