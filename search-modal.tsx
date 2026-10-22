"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAdminStore } from "@/context/admin-store";
import { useCurrency } from "@/context/currency-context";
import { Search, X, Sparkles, ArrowRight, Star } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  "Dried Eggplants",
  "Urfa Isot",
  "Boz Antep Pistachios",
  "Crimson Luxury Hoodie",
  "Pure Pomegranate Molasses",
  "Sun-Baked Tomato Paste",
  "Kutnu Silk Scarf"
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { products } = useAdminStore();
  const { formatPrice } = useCurrency();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filteredProducts = query.trim() === ""
    ? []
    : products.filter(p => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
        );
      });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#121212] border border-[#2D2D2D] rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Header */}
        <div className="p-4 sm:p-5 border-b border-[#262626] flex items-center gap-3 bg-[#161616]">
          <Search className="w-5 h-5 text-[#D4AF37]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search dried foods, authentic spices, pistachios, luxury textiles..."
            className="flex-1 bg-transparent border-none text-white text-base placeholder-neutral-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-md text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white border border-[#333333] rounded-lg"
          >
            ESC
          </button>
        </div>

        {/* Content Body */}
        <div className="max-h-[65vh] overflow-y-auto p-5">
          {query.trim() === "" ? (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Trending Searches in Gaziantep</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map(item => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="px-3 py-1.5 rounded-full bg-[#1C1C1C] hover:bg-[#2A1114] border border-[#2B2B2B] hover:border-[#B3001B] text-xs text-neutral-300 hover:text-white transition-all"
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Quick Category Jump */}
              <div className="mt-6 pt-5 border-t border-[#222222]">
                <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                  Browse by Collection
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { name: "Local Foods", path: "/shop?cat=food" },
                    { name: "Spices & Isot", path: "/shop?cat=spices" },
                    { name: "Pistachios", path: "/shop?cat=traditional" },
                    { name: "Luxury Textile", path: "/shop?cat=textile" },
                  ].map(cat => (
                    <Link
                      key={cat.name}
                      href={cat.path}
                      onClick={onClose}
                      className="p-3 rounded-xl bg-[#181818] hover:bg-[#201416] border border-[#262626] hover:border-[#B3001B]/50 text-xs font-medium text-neutral-200 hover:text-[#F5D77F] text-center transition-all block"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-400 text-sm">No products found matching &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-neutral-500 mt-1">Try searching for &quot;isot&quot;, &quot;patlıcan&quot;, or &quot;hoodie&quot;</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                <span>Found {filteredProducts.length} results</span>
                <Link
                  href={`/shop?q=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="text-[#D4AF37] hover:underline flex items-center gap-1"
                >
                  View all in shop <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {filteredProducts.map(product => {
                const price = product.discountPrice ?? product.price;
                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-3 rounded-xl bg-[#181818] hover:bg-[#201416] border border-transparent hover:border-[#B3001B]/40 transition-all group"
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#222222] shrink-0 border border-[#2D2D2D]">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-semibold">
                          {product.subCategory}
                        </span>
                        <span className="text-[10px] text-neutral-500">• {product.origin}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-[#F5D77F] truncate transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex items-center gap-1 text-[11px] text-[#D4AF37]">
                          <Star className="w-3 h-3 fill-[#D4AF37]" />
                          <span>{product.rating}</span>
                        </div>
                        <span className="text-xs font-bold text-white font-mono">
                          {formatPrice(price)}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#141414] border-t border-[#262626] flex items-center justify-between text-[11px] text-neutral-500 px-5">
          <span>AI Search Enabled • Authentic Gaziantep Marketplace</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
}
