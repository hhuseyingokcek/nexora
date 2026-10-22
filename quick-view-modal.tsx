"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useCurrency } from "@/context/currency-context";
import { useToast } from "@/components/toast";
import { X, Heart, ShoppingBag, Star, Check, ArrowRight } from "lucide-react";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string>("");

  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const { showToast } = useToast();

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const displayPrice = product.discountPrice ?? product.price;
  const hasDiscount = !!product.discountPrice && product.discountPrice < product.price;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant || undefined);
    showToast("Added to Cart", `${quantity}x ${product.name} added to your bag.`, "success");
    onClose();
  };

  const handleWishlist = () => {
    const added = toggleWishlist(product);
    showToast(added ? "Added to Wishlist" : "Removed", product.name, added ? "success" : "info");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-[#121212] border border-[#2D2D2D] rounded-3xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 text-white my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 border border-white/10 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery Preview */}
          <div className="p-6 bg-[#161616] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#262626]">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#1D1D1D] mb-4">
              <Image
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
              {hasDiscount && (
                <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-md bg-[#B3001B] text-white">
                  SALE
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImage === i ? "border-[#B3001B] scale-105" : "border-[#2D2D2D] opacity-60"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Origin */}
              <div className="flex items-center justify-between text-xs text-[#D4AF37] font-semibold uppercase tracking-wider mb-2">
                <span>{product.subCategory}</span>
                <span className="text-neutral-400 font-normal lowercase">{product.origin}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4 text-xs text-neutral-300">
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  <span className="font-bold text-white">{product.rating}</span>
                </div>
                <span>•</span>
                <span>{product.reviewCount} customer reviews</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">In Stock ({product.stock})</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#F5D77F] font-mono">
                  {formatPrice(displayPrice)}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-neutral-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed mb-6 line-clamp-3">
                {product.description}
              </p>

              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-3 mb-6">
                  {product.variants.map(v => (
                    <div key={v.id}>
                      <span className="text-xs font-semibold text-neutral-300 block mb-1.5">
                        Select {v.name}:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {v.options.map(opt => (
                          <button
                            key={opt}
                            onClick={() => setSelectedVariant(opt)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                              selectedVariant === opt
                                ? "bg-[#B3001B] border-[#B3001B] text-white"
                                : "bg-[#1B1B1B] border-[#2E2E2E] text-neutral-300 hover:border-neutral-500"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="space-y-3 pt-4 border-t border-[#262626]">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#333333] rounded-xl bg-[#181818] px-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-neutral-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-1.5 text-neutral-400 hover:text-white"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-[#B3001B] to-[#7A0012] hover:from-[#d10424] hover:to-[#8f0418] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-red-950/50 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>

                {/* Wishlist */}
                <button
                  onClick={handleWishlist}
                  className={`p-3 rounded-xl border transition-colors ${
                    isFavorited
                      ? "bg-[#B3001B] border-[#B3001B] text-white"
                      : "bg-[#1B1B1B] border-[#2E2E2E] text-neutral-300 hover:text-white"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? "fill-white" : ""}`} />
                </button>
              </div>

              <Link
                href={`/product/${product.id}`}
                onClick={onClose}
                className="w-full text-center text-xs text-[#D4AF37] hover:underline flex items-center justify-center gap-1.5 pt-1"
              >
                View full specifications & customer reviews <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
