"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useToast } from "@/components/toast";
import {
  ShieldCheck,
  Truck,
  Award,
  Headphones,
  Mail,
  ArrowRight,
  Sparkles,
  CreditCard,
  MapPin,
  Lock
} from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast(
      "Privilege Granted!",
      "You have been registered for VIP access. Use code GAZIANTEP10 on your next order.",
      "success"
    );
    setEmail("");
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#222222] text-white pt-16 pb-12">
      {/* 4 Brand Pillars (Why Choose Nexora) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-3xl bg-gradient-to-br from-[#141414] via-[#120708] to-[#141414] border border-[#2D2D2D] shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2A0E12] border border-[#B3001B]/40 flex items-center justify-center shrink-0 text-[#B3001B] shadow-lg shadow-red-950/50">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Fast Insulated Shipping</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Cold-chain packaging preserves fragile baklava and sun-dried items. Shipped within 24 hours.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#221B0A] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 text-[#D4AF37] shadow-lg">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">100% Authentic Gaziantep</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Directly harvested and prepared by registered guild masters in Gaziantep. Zero counterfeit or blend.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#142318] border border-emerald-500/40 flex items-center justify-center shrink-0 text-emerald-400 shadow-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Multi-Gateway Secure Pay</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Protected by 256-bit encryption. Supports Stripe, PayTR, iyzico, 3D Secure, and Cash on Delivery.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1D1726] border border-purple-500/40 flex items-center justify-center shrink-0 text-purple-400 shadow-lg">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">24/7 Connoisseur Support</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Direct culinary and sizing guidance via live messaging or WhatsApp concierge.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#222222]">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#B3001B] to-[#D4AF37] p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#0D0D0D] rounded-[6px] flex items-center justify-center">
                  <span className="text-xs font-black text-[#D4AF37]">N</span>
                </div>
              </div>
              <span className="text-2xl font-black tracking-[0.2em] text-white font-serif">
                NEXORA
              </span>
            </Link>

            <p className="text-xs text-[#D4AF37] font-semibold uppercase tracking-widest">
              Authentic Taste of Gaziantep
            </p>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Nexora bridges centuries of Gaziantep culinary heritage and Silk Road artisanal textile craft with modern luxury aesthetics. Sourced directly from village growers, stone mills, and heritage weavers.
            </p>

            <div className="flex items-center gap-2 text-xs text-neutral-400 pt-2">
              <MapPin className="w-4 h-4 text-[#B3001B] shrink-0" />
              <span>Tarihi Bakırcılar Çarşısı No: 48, Gaziantep, Turkey</span>
            </div>
          </div>

          {/* Gastronomy Collection Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Local Gastronomy
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="/shop?cat=food" className="hover:text-white transition-colors">
                  Sun-Dried Eggplants & Peppers
                </Link>
              </li>
              <li>
                <Link href="/shop?cat=food" className="hover:text-white transition-colors">
                  Sun-Baked Tomato & Pepper Pastes
                </Link>
              </li>
              <li>
                <Link href="/shop?cat=spices" className="hover:text-white transition-colors">
                  Silk Urfa-Antep Oiled Isot
                </Link>
              </li>
              <li>
                <Link href="/shop?cat=spices" className="hover:text-white transition-colors">
                  Wild Mountain Sumac & Mint
                </Link>
              </li>
              <li>
                <Link href="/shop?cat=traditional" className="hover:text-white transition-colors">
                  First-Harvest Boz Antep Pistachios
                </Link>
              </li>
              <li>
                <Link href="/shop?cat=traditional" className="hover:text-white transition-colors">
                  Stone-Oven Gaziantep Baklava
                </Link>
              </li>
            </ul>
          </div>

          {/* Luxury Textile Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Textile Collection
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="/shop?cat=textile" className="hover:text-white transition-colors">
                  460 GSM Heavyweight Hoodies
                </Link>
              </li>
              <li>
                <Link href="/shop?cat=textile" className="hover:text-white transition-colors">
                  Heritage Crest Embroidered Tees
                </Link>
              </li>
              <li>
                <Link href="/shop?cat=textile" className="hover:text-white transition-colors">
                  Relaxed Tailored Turkish Linen
                </Link>
              </li>
              <li>
                <Link href="/shop?cat=textile" className="hover:text-white transition-colors">
                  Artisan Quilted Bomber Jackets
                </Link>
              </li>
              <li>
                <Link href="/shop?cat=textile" className="hover:text-white transition-colors">
                  Gold Crest Velvet Caps
                </Link>
              </li>
              <li>
                <Link href="/shop?cat=textile" className="hover:text-white transition-colors">
                  Historic Kutnu Silk Scarves
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Privilege Newsletter
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Subscribe for early seasonal pistachio harvests, limited edition textile drops, and exclusive recipes.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-[#181818] border border-[#2D2D2D] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#B3001B]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#B3001B] to-[#7A0012] hover:opacity-90 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-red-950/60"
              >
                <span>Claim 10% Welcome Gift</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Payment Methods & Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            <p>© {new Date().getFullYear()} NEXORA. All rights reserved. Celebrating Gaziantep UNESCO Heritage.</p>
          </div>

          {/* Payment Gateway Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {["Stripe", "PayTR", "iyzico", "Visa", "Mastercard", "Troy", "Cash on Delivery"].map(badge => (
              <span
                key={badge}
                className="px-2.5 py-1 rounded bg-[#161616] border border-[#262626] text-[10px] font-semibold text-neutral-300 tracking-wider uppercase"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link href="/story" className="hover:text-white transition-colors">Heritage</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Support</Link>
            <Link href="/admin" className="text-[#D4AF37] hover:underline flex items-center gap-1">
              <Lock className="w-3 h-3" /> Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
