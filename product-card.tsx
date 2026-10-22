"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useCompare } from "@/context/compare-context";
import { useCurrency } from "@/context/currency-context";
import { useToast } from "@/components/toast";
import { Heart, Eye, ArrowLeftRight, ShoppingBag, Star, Sparkles } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toggleCompare, isInCompare } = useCompare();
  const { formatPrice } = useCurrency();
  const { showToast } = useToast();

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const displayPrice = product.discountPrice ?? product.price;
  const hasDiscount = !!product.discountPrice && product.discountPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    showToast("Added to Cart", `${product.name} has been added to your shopping bag.`, "success");
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product);
    showToast(
      added ? "Added to Wishlist" : "Removed from Wishlist",
      product.name,
      added ? "success" : "info"
    );
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = toggleCompare(product);
    showToast(result.added ? "Compare List" : "Comparison Updated", result.message, result.added ? "success" : "info");
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <div
      className="group relative rounded-2xl bg-[#141414] border border-[#262626] hover:border-[#B3001B]/60 transition-all duration-300 hover:shadow-2xl hover:shadow-[#B3001B]/15 hover:-translate-y-1.5 flex flex-col overflow-hidden"
      onMouseEnter={() => product.images.length > 1 && setCurrentImageIndex(1)}
      onMouseLeave={() => setCurrentImageIndex(0)}
    >
      {/* Top Media Container */}
      <div className="relative aspect-[4/4.5] w-full overflow-hidden bg-[#1B1B1B]">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <Image
            src={product.images[currentImageIndex] || product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
        </Link>

        {/* Gradient Overlay for subtle depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-black/30 pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {hasDiscount && (
            <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-gradient-to-r from-[#B3001B] to-[#7A0012] text-white shadow-lg shadow-red-950/50">
              -{discountPercent}%
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2.5 py-0.5 text-[11px] font-semibold tracking-wide rounded-md bg-[#D4AF37]/90 text-black flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3 fill-black" /> Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-md bg-white/20 backdrop-blur-md text-white border border-white/20">
              New
            </span>
          )}
        </div>

        {/* Floating Quick Action Buttons */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            aria-label="Add to Wishlist"
            className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-md ${
              isFavorited
                ? "bg-[#B3001B] text-white shadow-red-900/50 scale-105"
                : "bg-black/60 text-neutral-300 hover:text-white hover:bg-black/90 border border-white/10"
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? "fill-white" : ""}`} />
          </button>

          {/* Quick View Button */}
          {onQuickView && (
            <button
              onClick={handleQuickView}
              aria-label="Quick View"
              className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-neutral-300 hover:text-white hover:bg-black/90 border border-white/10 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}

          {/* Compare Button */}
          <button
            onClick={handleCompare}
            aria-label="Compare Product"
            className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-200 border border-white/10 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 ${
              isCompared
                ? "bg-[#D4AF37] text-black"
                : "bg-black/60 text-neutral-300 hover:text-white hover:bg-black/90"
            }`}
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Add To Cart Bar at Bottom of Image */}
        <div className="absolute bottom-3 left-3 right-3 z-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#B3001B] to-[#7A0012] hover:from-[#d10424] hover:to-[#8f0418] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-red-950/60 active:scale-98 transition-transform"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Bag
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Origin & Category Label */}
          <div className="flex items-center justify-between text-[11px] text-[#D4AF37] font-medium tracking-wide uppercase mb-1.5">
            <span>{product.subCategory}</span>
            <span className="text-neutral-400 font-normal lowercase">{product.origin}</span>
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.id}`} className="block group-hover:text-[#F5D77F] transition-colors">
            <h3 className="font-semibold text-white text-base leading-snug line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>

          {/* Tagline snippet */}
          <p className="text-xs text-neutral-400 line-clamp-1 mb-3">
            {product.tagline}
          </p>
        </div>

        <div>
          {/* Rating & Stock */}
          <div className="flex items-center justify-between text-xs mb-3">
            <div className="flex items-center gap-1 text-[#D4AF37]">
              <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
              <span className="font-semibold text-white">{product.rating}</span>
              <span className="text-neutral-500 text-[11px]">({product.reviewCount})</span>
            </div>

            {product.stock <= 40 ? (
              <span className="text-[11px] text-amber-400/90 font-medium bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Only {product.stock} left
              </span>
            ) : (
              <span className="text-[11px] text-emerald-400/90 font-medium">In Stock</span>
            )}
          </div>

          {/* Price Container */}
          <div className="pt-2.5 border-t border-[#222222] flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-white tracking-tight">
                {formatPrice(displayPrice)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-neutral-500 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            <span className="text-[11px] text-neutral-400 font-medium">
              {product.weightOrSize.split("(")[0]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
