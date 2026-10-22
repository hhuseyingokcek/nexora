"use client";

import React from "react";
import { Order } from "@/types";
import { useCurrency } from "@/context/currency-context";
import { X, Printer, ShieldCheck, Download } from "lucide-react";

interface InvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export function InvoiceModal({ order, onClose }: InvoiceModalProps) {
  const { formatPrice } = useCurrency();

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const vatAmount = (order.subtotal * 0.1).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity no-print"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-[#141414] border border-[#2D2D2D] rounded-3xl shadow-2xl overflow-hidden z-10 text-white my-auto max-h-[90vh] flex flex-col">
        {/* Modal Controls Bar */}
        <div className="p-4 bg-[#1A1A1A] border-b border-[#2D2D2D] flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#D4AF37]">
              Official Commercial Receipt / E-Fatura
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#B3001B] to-[#7A0012] hover:opacity-90 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg"
            >
              <Printer className="w-4 h-4" />
              Print Invoice
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-white text-black font-sans print:p-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-neutral-200 pb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl font-black tracking-widest text-[#B3001B]">NEXORA</span>
                <span className="text-xs px-2 py-0.5 rounded bg-black text-[#D4AF37] font-semibold uppercase">
                  Heritage
                </span>
              </div>
              <p className="text-xs text-neutral-600 font-medium tracking-wide">
                Authentic Taste of Gaziantep • Gastronomy & Textile A.Ş.
              </p>
              <p className="text-xs text-neutral-500 mt-2">
                Tarihi Bakırcılar Çarşısı No: 48, Şahinbey / Gaziantep
              </p>
              <p className="text-xs text-neutral-500">
                Tax Office: Şahinbey V.D. • Tax ID: 6310928172
              </p>
            </div>

            <div className="text-left sm:text-right">
              <h1 className="text-xl font-bold uppercase tracking-wider text-neutral-800">
                TAX INVOICE
              </h1>
              <p className="text-sm font-bold text-[#B3001B] mt-1 font-mono">
                {order.orderNumber}
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Date: {new Date(order.createdAt).toLocaleDateString("tr-TR", { day: "2-digit", month: "short", year: "numeric" })}
              </p>
              <p className="text-xs text-neutral-500">
                Payment: <strong className="uppercase">{order.paymentMethod.replace("_", " ")}</strong> ({order.paymentStatus})
              </p>
            </div>
          </div>

          {/* Customer & Shipping Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-neutral-200 text-xs">
            <div>
              <h4 className="font-bold uppercase text-neutral-400 mb-2">Billed To</h4>
              <p className="font-bold text-neutral-900 text-sm">{order.customer.name}</p>
              <p className="text-neutral-600 mt-0.5">{order.customer.email}</p>
              <p className="text-neutral-600">{order.customer.phone}</p>
            </div>

            <div>
              <h4 className="font-bold uppercase text-neutral-400 mb-2">Shipping Destination</h4>
              <p className="text-neutral-800 font-medium">{order.customer.address}</p>
              <p className="text-neutral-800">
                {order.customer.district}, {order.customer.city} - {order.customer.postalCode}
              </p>
              <p className="text-neutral-500 mt-1">
                Carrier: {order.cargoCompany} {order.trackingNumber ? `(${order.trackingNumber})` : ""}
              </p>
            </div>
          </div>

          {/* Products Table */}
          <div className="py-6">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-neutral-300 text-neutral-500 uppercase tracking-wider">
                  <th className="py-2.5">Item & Description</th>
                  <th className="py-2.5 text-center">SKU</th>
                  <th className="py-2.5 text-center">Qty</th>
                  <th className="py-2.5 text-right">Unit Price</th>
                  <th className="py-2.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {order.items.map((item, i) => (
                  <tr key={i} className="text-neutral-800">
                    <td className="py-3 pr-2">
                      <p className="font-bold text-neutral-900">{item.product.name}</p>
                      {item.selectedVariant && (
                        <p className="text-[11px] text-neutral-500">Variant: {item.selectedVariant}</p>
                      )}
                      <p className="text-[11px] text-neutral-500">Origin: {item.product.origin}</p>
                    </td>
                    <td className="py-3 text-center text-neutral-600 font-mono">{item.product.sku}</td>
                    <td className="py-3 text-center font-bold">{item.quantity}</td>
                    <td className="py-3 text-right font-mono">{formatPrice(item.price)}</td>
                    <td className="py-3 text-right font-bold font-mono">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="border-t border-neutral-300 pt-4 flex justify-end">
            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal (Excl. VAT):</span>
                <span className="font-mono">{formatPrice(order.subtotal * 0.9)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Calculated VAT (10%):</span>
                <span className="font-mono">{vatAmount} ₺</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount ({order.couponCode || 'PROMO'}):</span>
                  <span className="font-mono">-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Shipping Fee:</span>
                <span className="font-mono">
                  {order.shipping === 0 ? "FREE" : formatPrice(order.shipping)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-neutral-900 pt-2 border-t-2 border-neutral-900">
                <span>Grand Total:</span>
                <span className="text-[#B3001B] font-mono text-base">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-8 pt-6 border-t border-neutral-200 text-center text-[10px] text-neutral-400">
            <p>This document is an electronic sales invoice issued pursuant to Turkish Tax Procedural Law.</p>
            <p className="mt-1">Thank you for supporting traditional Gaziantep artisans and sustainable heritage agriculture.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
