import { Snack } from "@/lib/snacks";
import { SnackCard } from "@/components/snack/SnackCard";

interface SnackCardListProps {
  snacks: Snack[];
}

export function SnackCardList({ snacks }: SnackCardListProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-2xl font-extrabold text-dark">
          最新测评
        </h2>
        <span className="text-sm text-dark/40 font-medium">
          共 {snacks.length} 篇
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {snacks.map((snack) => (
          <SnackCard key={snack.id} snack={snack} />
        ))}
      </div>
    </section>
  );
}
