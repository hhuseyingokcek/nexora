"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useCompare } from "@/context/compare-context";
import { useCurrency } from "@/context/currency-context";
import { useAuth } from "@/context/auth-context";
import { SearchModal } from "@/components/search-modal";
import { Currency } from "@/types";
import {
  Search,
  ShoppingBag,
  Heart,
  ArrowLeftRight,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  Shield,
  Sparkles,
  LogOut,
  Package,
  Layers,
  MapPin
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { compareCount } = useCompare();
  const { currency, setCurrency } = useCurrency();
  const { user, isAuthenticated, isAdmin, logout, demoLogin } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsCurrencyMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop All", href: "/shop" },
    { label: "Local Foods", href: "/shop?cat=food" },
    { label: "Spices & Isot", href: "/shop?cat=spices" },
    { label: "Pistachios", href: "/shop?cat=traditional" },
    { label: "Luxury Textile", href: "/shop?cat=textile" },
    { label: "Heritage", href: "/story" },
  ];

  return (
    <>
      {/* Top Heritage Notice Bar */}
      <div className="bg-gradient-to-r from-[#170305] via-[#2F040A] to-[#170305] text-[11px] font-medium text-neutral-300 py-2 border-b border-[#3D0A11]/60 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-[#D4AF37]">
            <MapPin className="w-3.5 h-3.5 text-[#B3001B]" />
            <span>Direct from Gaziantep Artisans • UNESCO Gastronomy City</span>
          </div>

          <div className="mx-auto sm:mx-0 flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-neutral-200">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              Free Express Insulated Delivery over 500 ₺
            </span>
            <span className="text-[#D4AF37] font-semibold hidden md:inline">
              Code: GAZIANTEP10 (-10%)
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <Link href="/admin" className="text-neutral-400 hover:text-[#D4AF37] flex items-center gap-1">
              <Shield className="w-3 h-3 text-[#B3001B]" /> Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#0D0D0D]/95 backdrop-blur-xl border-b border-[#262626] shadow-2xl py-3"
            : "bg-[#0D0D0D]/80 backdrop-blur-md border-b border-white/5 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <Link href="/" className="flex flex-col items-center sm:items-start group">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#B3001B] to-[#D4AF37] p-0.5 shadow-lg shadow-red-950/50 flex items-center justify-center">
                <div className="w-full h-full bg-[#0D0D0D] rounded-[6px] flex items-center justify-center">
                  <span className="text-xs font-black text-[#D4AF37]">N</span>
                </div>
              </div>
              <span className="text-2xl sm:text-3xl font-black tracking-[0.2em] text-white font-serif group-hover:text-[#F5D77F] transition-colors">
                NEXORA
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium hidden sm:block mt-0.5">
              Authentic Taste of Gaziantep
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest font-semibold transition-all hover:text-[#D4AF37] relative py-1 ${
                    isActive ? "text-[#D4AF37]" : "text-neutral-300"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#B3001B] to-[#D4AF37] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition-colors relative"
              aria-label="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Currency Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/5 border border-white/10"
              >
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {isCurrencyMenuOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-[#161616] border border-[#2D2D2D] rounded-xl shadow-2xl py-1 z-50 animate-in fade-in">
                  {(["TRY", "USD", "EUR", "GBP"] as Currency[]).map(cur => (
                    <button
                      key={cur}
                      onClick={() => {
                        setCurrency(cur);
                        setIsCurrencyMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-white/10 ${
                        currency === cur ? "text-[#D4AF37] font-bold" : "text-neutral-300"
                      }`}
                    >
                      <span>{cur}</span>
                      {currency === cur && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Comparison Link */}
            <Link
              href="/compare"
              className="p-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition-colors relative hidden sm:flex"
              aria-label="Product Comparison"
            >
              <ArrowLeftRight className="w-5 h-5" />
              {compareCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </Link>

            {/* Wishlist Link */}
            <Link
              href="/account?tab=wishlist"
              className="p-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition-colors relative hidden sm:flex"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#B3001B] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-red-950/80">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* User Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1"
                aria-label="User Account"
              >
                <UserIcon className="w-5 h-5" />
                {isAdmin && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-1.5 right-1.5 ring-2 ring-black" />
                )}
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#141414] border border-[#2D2D2D] rounded-2xl shadow-2xl py-2 z-50 text-white animate-in fade-in">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-3 border-b border-[#222222]">
                        <p className="text-xs text-neutral-400">Signed in as</p>
                        <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                        <span className={`inline-block text-[10px] font-semibold uppercase px-2 py-0.5 rounded mt-1 ${
                          isAdmin ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-[#262626] text-neutral-300"
                        }`}>
                          {user?.role}
                        </span>
                      </div>

                      <div className="py-1">
                        {isAdmin && (
                          <Link
                            href="/admin"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#D4AF37] font-semibold hover:bg-white/5"
                          >
                            <Shield className="w-4 h-4 text-[#B3001B]" />
                            Admin Dashboard
                          </Link>
                        )}
                        <Link
                          href="/account"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs text-neutral-300 hover:text-white hover:bg-white/5"
                        >
                          <Package className="w-4 h-4 text-neutral-400" />
                          My Orders & Dashboard
                        </Link>
                        <Link
                          href="/account?tab=wishlist"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs text-neutral-300 hover:text-white hover:bg-white/5"
                        >
                          <Heart className="w-4 h-4 text-neutral-400" />
                          My Wishlist ({wishlistCount})
                        </Link>
                      </div>

                      <div className="pt-2 border-t border-[#222222]">
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-red-400 hover:bg-red-500/10"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-3 border-b border-[#222222]">
                        <h4 className="text-sm font-bold text-white">Welcome to Nexora</h4>
                        <p className="text-xs text-neutral-400 mt-0.5">Sign in for fast checkout & orders</p>
                        <div className="mt-3 flex gap-2">
                          <Link
                            href="/auth/login"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex-1 py-1.5 text-center text-xs font-semibold rounded-lg bg-[#B3001B] text-white hover:opacity-90"
                          >
                            Sign In
                          </Link>
                          <Link
                            href="/auth/register"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex-1 py-1.5 text-center text-xs font-semibold rounded-lg bg-[#262626] text-white hover:bg-[#333333]"
                          >
                            Register
                          </Link>
                        </div>
                      </div>

                      {/* 1-Click Demo Buttons for effortless evaluation */}
                      <div className="p-3 bg-[#1A1A1A] rounded-b-2xl">
                        <span className="text-[10px] uppercase font-bold text-[#D4AF37] block mb-2">
                          Quick Demo Switch:
                        </span>
                        <div className="flex flex-col gap-1.5">
                          <button
                            onClick={() => {
                              demoLogin("customer");
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-1.5 rounded-lg bg-[#222222] hover:bg-[#2A2A2A] text-xs text-neutral-200 flex items-center justify-between"
                          >
                            <span>Login as Customer</span>
                            <span className="text-[10px] text-neutral-500">Demo</span>
                          </button>
                          <button
                            onClick={() => {
                              demoLogin("admin");
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-1.5 rounded-lg bg-[#2A1114] hover:bg-[#381216] border border-[#B3001B]/40 text-xs text-[#F5D77F] flex items-center justify-between"
                          >
                            <span>Login as Admin</span>
                            <span className="text-[10px] text-[#B3001B] font-bold">Admin</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#B3001B] to-[#7A0012] hover:from-[#cb0221] hover:to-[#8c0217] text-white flex items-center gap-2 shadow-lg shadow-red-950/60 active:scale-95 transition-all"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">Bag</span>
              <span className="w-5 h-5 bg-white text-[#B3001B] text-xs font-bold rounded-full flex items-center justify-center font-mono">
                {totalItems}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#121212] border-t border-[#262626] px-4 py-5 space-y-4 animate-in slide-in-from-top-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2.5 rounded-xl text-sm font-semibold text-neutral-300 hover:text-white hover:bg-white/5 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-neutral-600">→</span>
                </Link>
              ))}
              <Link
                href="/compare"
                className="px-3 py-2.5 rounded-xl text-sm font-semibold text-neutral-300 hover:text-white hover:bg-white/5 flex items-center justify-between"
              >
                <span>Comparison ({compareCount})</span>
                <span className="text-neutral-600">→</span>
              </Link>
              <Link
                href="/admin"
                className="px-3 py-2.5 rounded-xl text-sm font-semibold text-[#D4AF37] hover:bg-white/5 flex items-center justify-between"
              >
                <span>Admin Management Panel</span>
                <Shield className="w-4 h-4 text-[#B3001B]" />
              </Link>
            </nav>

            <div className="pt-4 border-t border-[#262626] flex items-center justify-between">
              <span className="text-xs text-neutral-400">Select Currency</span>
              <div className="flex gap-1.5">
                {(["TRY", "USD", "EUR", "GBP"] as Currency[]).map(cur => (
                  <button
                    key={cur}
                    onClick={() => setCurrency(cur)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      currency === cur
                        ? "bg-[#B3001B] text-white"
                        : "bg-[#1C1C1C] text-neutral-400"
                    }`}
                  >
                    {cur}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Instant Live Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
