"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCompare } from "@/context/compare-context";
import { ArrowLeftRight, X, Sparkles } from "lucide-react";

export function CompareDrawer() {
  const { compareProducts, removeFromCompare, clearCompare } = useCompare();

  if (compareProducts.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#141414]/95 backdrop-blur-xl border border-[#D4AF37]/40 shadow-2xl rounded-2xl p-3 flex items-center justify-between text-white gap-3">
        
        {/* Products thumbnails */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold uppercase tracking-wider px-2 shrink-0">
            <ArrowLeftRight className="w-4 h-4" />
            <span>Compare ({compareProducts.length}/4)</span>
          </div>

          <div className="flex items-center gap-2">
            {compareProducts.map(p => (
              <div
                key={p.id}
                className="relative w-11 h-11 rounded-lg overflow-hidden bg-[#222222] border border-[#333333] shrink-0 group"
              >
                <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                <button
                  onClick={() => removeFromCompare(p.id)}
                  className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearCompare}
            className="text-xs text-neutral-400 hover:text-white px-2 py-1"
          >
            Clear
          </button>

          <Link
            href="/compare"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#B3001B] to-[#7A0012] hover:opacity-90 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-red-950/50"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Compare Now
          </Link>
        </div>
      </div>
    </div>
  );
}
