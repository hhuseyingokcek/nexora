"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useCurrency } from "@/context/currency-context";
import { useToast } from "@/components/toast";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Tag, ShieldCheck } from "lucide-react";

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
    removeItem,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    finalTotal,
    freeShippingThreshold,
    freeShippingProgress,
    coupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { formatPrice } = useCurrency();
  const { showToast } = useToast();
  const [couponInput, setCouponInput] = useState("");

  if (!isDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    showToast(res.success ? "Coupon Applied" : "Coupon Error", res.message, res.success ? "success" : "error");
    if (res.success) setCouponInput("");
  };

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F0F0F] border-l border-[#262626] shadow-2xl flex flex-col justify-between text-white">
          
          {/* Header */}
          <div className="p-5 border-b border-[#262626] flex items-center justify-between bg-[#141414]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B3001B]" />
              <h2 className="text-lg font-bold tracking-wide">Shopping Bag</h2>
              <span className="text-xs bg-[#262626] text-neutral-300 px-2 py-0.5 rounded-full font-mono">
                {items.length}
              </span>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-5 py-3.5 bg-gradient-to-r from-[#1B0508] to-[#120808] border-b border-[#262626]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-neutral-300 flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-emerald-400 font-semibold">
                    You have unlocked FREE Express Delivery!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#F5D77F]">{formatPrice(amountNeededForFreeShipping)}</strong> for free shipping
                  </span>
                )}
              </span>
              <span className="font-mono text-xs text-[#D4AF37] font-semibold">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#262626] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#B3001B] via-[#D4AF37] to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#222222]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-[#181818] border border-[#262626] flex items-center justify-center mb-4 text-neutral-600">
                  <ShoppingBag className="w-9 h-9" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Your bag is currently empty</h3>
                <p className="text-xs text-neutral-400 max-w-xs mb-6">
                  Explore hand-carved dried eggplants, fragrant stone-ground isot, or our luxury streetwear collection.
                </p>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#B3001B] to-[#7A0012] text-white text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  Discover Gaziantep Flavors
                </button>
              </div>
            ) : (
              items.map((item, idx) => {
                const itemPrice = item.product.discountPrice ?? item.product.price;
                return (
                  <div key={`${item.product.id}-${item.selectedVariant || idx}`} className="py-4 flex gap-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#1B1B1B] shrink-0 border border-[#262626]">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/product/${item.product.id}`}
                            onClick={() => setIsDrawerOpen(false)}
                            className="font-medium text-sm text-white hover:text-[#D4AF37] line-clamp-1 transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.product.id, item.selectedVariant)}
                            className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {item.selectedVariant && (
                          <span className="text-[11px] text-[#D4AF37] bg-[#221c10] px-2 py-0.5 rounded border border-[#443818] inline-block mt-0.5">
                            {item.selectedVariant}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-[#333333] rounded-lg bg-[#181818] overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant)}
                            className="p-1 px-2 text-neutral-400 hover:text-white hover:bg-[#262626] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs px-2.5 font-semibold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant)}
                            className="p-1 px-2 text-neutral-400 hover:text-white hover:bg-[#262626] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-semibold text-sm text-white">
                          {formatPrice(itemPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#262626] bg-[#141414] space-y-4">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
                    placeholder="Coupon code (e.g. GAZIANTEP10)"
                    className="w-full bg-[#1B1B1B] border border-[#2E2E2E] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#B3001B]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#262626] hover:bg-[#333333] text-xs font-medium rounded-xl text-white transition-colors"
                >
                  Apply
                </button>
              </form>

              {coupon && (
                <div className="flex items-center justify-between text-xs px-3 py-1.5 bg-[#1f1606] border border-[#594411] rounded-lg text-[#F5D77F]">
                  <span>Coupon: <strong>{coupon.code}</strong> ({coupon.description})</span>
                  <button onClick={removeCoupon} className="text-neutral-400 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Price Calculation breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-300 pt-2 border-t border-[#222222]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-white">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-400 font-semibold">FREE</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[#262626]">
                  <span>Total</span>
                  <span className="text-xl text-[#F5D77F] font-mono">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#B3001B] to-[#7A0012] hover:from-[#d40020] hover:to-[#910116] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-red-950/60 active:scale-98 transition-all"
                >
                  Proceed to Secure Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-[#1C1C1C] hover:bg-[#262626] text-neutral-300 hover:text-white text-xs font-medium flex items-center justify-center transition-colors"
                >
                  View Full Cart & Shipping Calculator
                </Link>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>256-Bit SSL Encrypted Gaziantep Artisanal Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
