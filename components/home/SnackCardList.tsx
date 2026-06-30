import { Snack } from "@/lib/snacks";
import { SnackCard } from "@/components/snack/SnackCard";

interface SnackCardListProps {
  snacks: Snack[];
}

export function SnackCardList({ snacks }: SnackCardListProps) {
  return (
    <section id="snack-list" className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">curated shelf</p>
          <h2 className="mt-1 text-3xl font-black tracking-tight text-dark">精选零食</h2>
        </div>
        <span className="text-sm font-medium text-dark/45">当前展示 {snacks.length} 款</span>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {snacks.map((snack) => (
          <SnackCard key={snack.id} snack={snack} />
        ))}
      </div>
    </section>
  );
}
