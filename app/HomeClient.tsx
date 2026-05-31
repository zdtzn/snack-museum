"use client";

import { useState, useEffect } from "react";
import { HeroBanner } from "@/components/home/HeroBanner";
import { CategoryNav } from "@/components/home/CategoryNav";
import { SnackCardList } from "@/components/home/SnackCardList";
import { FeedZone } from "@/components/home/FeedZone";
import { CustomerService } from "@/components/snack/CustomerService";
import { Snack, SnackCategory } from "@/lib/snacks";

interface Props {
  snacks: Snack[];
}

export function HomeClient({ snacks }: Props) {
  const [activeCategory, setActiveCategory] = useState<SnackCategory | undefined>(undefined);
  const [showCustomerService, setShowCustomerService] = useState(false);

  const filteredSnacks = activeCategory
    ? snacks.filter((s) => s.category === activeCategory)
    : snacks;

  // 监听投喂完成事件
  useEffect(() => {
    const handler = () => setShowCustomerService(true);
    window.addEventListener("open-customer-service", handler);
    return () => window.removeEventListener("open-customer-service", handler);
  }, []);

  return (
    <>
      <HeroBanner />
      <CategoryNav active={activeCategory} onSelect={(cat) =>
        setActiveCategory(activeCategory === cat ? undefined : cat)
      } />
      <SnackCardList snacks={filteredSnacks} />

      {/* 右下角投喂萌猫 */}
      <FeedZone snackNames={snacks.map(s => s.name)} />

      {/* 客服弹窗 */}
      {showCustomerService && (
        <CustomerService onClose={() => setShowCustomerService(false)} />
      )}
    </>
  );
}
