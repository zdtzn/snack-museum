"use client";

import { useState } from "react";
import { RandomPicker } from "@/components/snack/RandomPicker";
import { Snack } from "@/lib/snacks";

interface Props {
  snacks: Snack[];
}

export function RandomClient({ snacks }: Props) {
  const [showPicker, setShowPicker] = useState(true);

  if (!showPicker) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-24 text-center">
        <button
          onClick={() => setShowPicker(true)}
          className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all"
        >
          再来一次 🎲
        </button>
      </div>
    );
  }

  return <RandomPicker snacks={snacks} onClose={() => setShowPicker(false)} />;
}
