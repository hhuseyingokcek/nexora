"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAdminStore } from "@/context/admin-store";
import { useCurrency } from "@/context/currency-context";
import { ProductCard } from "@/components/product-card";
import { QuickViewModal } from "@/components/quick-view-modal";
import { INITIAL_REVIEWS } from "@/data/mock-data";
import { Product } from "@/types";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Flame,
  Award,
  ChevronRight,
  Star,
  Quote,
  CheckCircle2,
  Clock,
  Layers,
  Heart
} from "lucide-react";

export default function HomePage() {
  const { products, categories, banner, flashSale } = useAdminStore();
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<"bestsellers" | "new" | "discounted">("bestsellers");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Tabbed Products
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 8);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 8);
  const discountedProducts = products
    .filter(p => p.discountPrice && p.discountPrice < p.price)
    .slice(0, 8);

  const displayedProducts =
    activeTab === "bestsellers"
      ? bestSellers
      : activeTab === "new"
      ? newArrivals
      : discountedProducts;

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white overflow-hidden">
      
      {/* ========================================================
          1. HERO SECTION
          ======================================================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={banner.bgImageUrl}
            alt="Authentic Gaziantep Heritage"
            fill
            priority
            className="object-cover object-center scale-105 animate-in fade-in duration-1000"
          />
          {/* Obsidian-Crimson Luxury Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/85 to-[#1A0307]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#B3001B]/25 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 flex flex-col items-start">
          
          {/* Cultural Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-6 shadow-xl animate-in fade-in slide-in-from-bottom-3 duration-500">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{banner.badge}</span>
          </div>

          {/* Big Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] max-w-3xl mb-6">
            <span>{banner.title}</span>{" "}
            <span className="bg-gradient-to-r from-[#FF6B7D] via-[#B3001B] to-[#D4AF37] bg-clip-text text-transparent font-serif italic">
              {banner.highlightText}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed mb-10 font-normal">
            {banner.subtitle}
          </p>

          {/* Call To Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <Link
              href={banner.primaryButtonLink}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#B3001B] via-[#940016] to-[#7A0012] hover:from-[#d10424] hover:to-[#8f0418] text-white text-sm font-bold uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-red-950/80 active:scale-95 transition-all group border border-white/10"
            >
              <span>{banner.primaryButtonText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href={banner.secondaryButtonLink}
              className="px-8 py-4 rounded-2xl bg-[#141414]/80 hover:bg-[#1C1C1C] text-neutral-200 hover:text-white text-sm font-semibold uppercase tracking-widest border border-white/15 backdrop-blur-md transition-all flex items-center gap-2"
            >
              <span>{banner.secondaryButtonText}</span>
            </Link>
          </div>

          {/* Trust Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10 w-full max-w-4xl text-neutral-300 text-xs">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>100% Sun-Dried Harvest</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#B3001B] shrink-0" />
              <span>460 GSM Heavyweight Terry</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Express Insulated Cargo</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero Artificial Additives</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. FEATURED CATEGORIES
          ======================================================== */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">
              <Layers className="w-4 h-4" />
              <span>Curated Collections</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Signature Antep Craftsmanship
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-semibold text-[#D4AF37] hover:underline flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>Explore All Collections</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Large Featured Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/shop?cat=${cat.slug.replace("gaziantep-local-foods", "food").replace("traditional-products", "traditional")}`}
              className="group relative rounded-3xl overflow-hidden bg-[#141414] border border-[#262626] hover:border-[#B3001B]/80 transition-all duration-500 hover:shadow-2xl hover:shadow-[#B3001B]/20 flex flex-col h-[420px]"
            >
              {/* Category Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-black/30 group-hover:via-[#0D0D0D]/40 transition-colors" />
              </div>

              {/* Card Badge */}
              <div className="relative z-10 p-5 flex justify-between items-start">
                {cat.badge && (
                  <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg bg-black/60 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30 shadow-md">
                    {cat.badge}
                  </span>
                )}
                <span className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 mt-auto p-6 bg-gradient-to-t from-[#0D0D0D] to-transparent">
                <span className="text-[11px] text-[#D4AF37] uppercase tracking-wider font-semibold block mb-1">
                  {cat.itemCount}+ Authentic Items
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-[#F5D77F] transition-colors mb-2">
                  {cat.name}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================
          3. FLASH SALE / SEASONAL HARVEST BANNER
          ======================================================== */}
      {flashSale.active && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-20">
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 bg-gradient-to-r from-[#2B0409] via-[#1A0306] to-[#0F0204] border border-[#B3001B]/50 shadow-2xl shadow-red-950/70 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B3001B]/30 border border-[#B3001B]/60 text-xs font-bold uppercase tracking-wider text-red-200">
                <Flame className="w-4 h-4 text-[#B3001B] fill-[#B3001B]" />
                <span>Limited Harvest Flash Offer</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {flashSale.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
                Enjoy an automatic <strong className="text-[#D4AF37]">{flashSale.discountPercentage}% discount</strong> on all sun-cured eggplants, silk isot and stone-baked pastes. Sourced directly from village family farms.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <div className="text-center sm:text-right">
                <span className="text-xs text-neutral-400 uppercase tracking-widest block font-medium">Use Voucher</span>
                <span className="text-lg font-mono font-black text-[#D4AF37] tracking-wider bg-black/60 px-4 py-2 rounded-xl border border-[#D4AF37]/40 block mt-1">
                  GAZIANTEP10
                </span>
              </div>
              <Link
                href="/shop?sale=true"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#B3001B] to-[#7A0012] hover:opacity-90 text-white text-xs font-bold uppercase tracking-wider shadow-xl shadow-red-950/80 transition-all"
              >
                Claim Seasonal Offer
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          4. FEATURED PRODUCTS (TABS: BEST SELLERS, NEW, DISCOUNTED)
          ======================================================== */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-[#222222]">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Curated Masterpieces
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Hand-selected Gaziantep food heritage & luxury streetwear staples
            </p>
          </div>

          {/* Interactive Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#141414] border border-[#262626] self-start sm:self-auto">
            <button
              onClick={() => setActiveTab("bestsellers")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "bestsellers"
                  ? "bg-[#B3001B] text-white shadow-lg shadow-red-950/60"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "new"
                  ? "bg-[#B3001B] text-white shadow-lg shadow-red-950/60"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveTab("discounted")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "discounted"
                  ? "bg-[#B3001B] text-white shadow-lg shadow-red-950/60"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              On Sale
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={p => setQuickViewProduct(p)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#181818] hover:bg-[#201517] border border-[#2E2E2E] hover:border-[#B3001B] text-xs font-bold uppercase tracking-widest text-neutral-200 hover:text-white transition-all shadow-xl"
          >
            <span>Browse Full Catalog ({products.length} Products)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ========================================================
          5. HERITAGE & GASTRONOMY STORY SPLIT
          ======================================================== */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-[#0D0D0D] via-[#140507] to-[#0D0D0D] border-y border-[#262626] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Story Text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
                <Award className="w-4 h-4" />
                <span>UNESCO City of Gastronomy</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                Where 6,000 Years of Flavour Meets Modern Luxury
              </h2>

              <p className="text-sm text-neutral-300 leading-relaxed font-light">
                Gaziantep is not merely a city; it is the culinary beating heart of the ancient Silk Road. For centuries, merchant caravans exchanged Persian saffron, Syrian spices, and Anatolian seeds in the historic inns of Antep.
              </p>

              <p className="text-sm text-neutral-300 leading-relaxed font-light">
                At <strong>NEXORA</strong>, we partner directly with the generational masters: farmers sun-curing hollowed eggplants on whitewashed roofs, stone-millers hand-sweating silky purple isot under morning wool blankets, and textile artisans hand-weaving historic Kutnu silk on century-old wooden shuttle looms.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#331114]">
                <div>
                  <span className="text-2xl font-black text-[#D4AF37] font-mono">40+</span>
                  <p className="text-xs text-neutral-400 mt-0.5">Generational Artisan Families</p>
                </div>
                <div>
                  <span className="text-2xl font-black text-[#B3001B] font-mono">100%</span>
                  <p className="text-xs text-neutral-400 mt-0.5">Authentic Regional Harvest</p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/story"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:text-[#F5D77F] underline underline-offset-8"
                >
                  Read The Complete Gaziantep Story <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Story Visual Imagery Collage */}
            <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden border border-[#B3001B]/40 shadow-2xl shadow-red-950/80">
              <Image
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80"
                alt="Gaziantep Historic Spices & Culture"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 text-xs">
                <p className="font-semibold text-white">
                  &ldquo;A taste shaped by southern Anatolian winds, fertile limestone soils, and unyielding patience.&rdquo;
                </p>
                <span className="text-[11px] text-[#D4AF37] mt-1 block font-mono">
                  — Tarihi Gaziantep Arasaları
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. CUSTOMER REVIEWS & TESTIMONIALS
          ======================================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">
            <Star className="w-4 h-4 fill-[#D4AF37]" />
            <span>Customer Impressions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Loved by Chefs & Connoisseurs
          </h2>
          <p className="text-xs text-neutral-400 mt-2">
            Over 2,400 verified reviews across Turkey, Europe, and North America
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_REVIEWS.slice(0, 3).map(rev => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-[#141414] border border-[#262626] flex flex-col justify-between hover:border-[#D4AF37]/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#D4AF37]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-500 font-mono">{rev.date}</span>
                </div>

                <h4 className="font-bold text-white text-base mb-2">
                  &ldquo;{rev.title}&rdquo;
                </h4>

                <p className="text-xs text-neutral-300 leading-relaxed font-light">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#222222] flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-white block">{rev.userName}</span>
                  {rev.verified && (
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium mt-0.5">
                      <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                    </span>
                  )}
                </div>
                <Quote className="w-6 h-6 text-neutral-700" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
