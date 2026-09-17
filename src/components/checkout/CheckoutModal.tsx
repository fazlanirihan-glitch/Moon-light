'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/formatters';
import { buildWhatsAppMessage, buildWhatsAppURL, isWhatsAppConfigured } from '@/utils/whatsapp';
import { OrderType, OrderDetails } from '@/types';
import { DEFAULT_LOCATION } from '@/config/restaurants';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
  whatsappNumber: string;
  allowDineIn?: boolean;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  restaurantName,
  whatsappNumber,
  allowDineIn = true,
}: CheckoutModalProps) {
  const { items, totalAmount, clearCart } = useCart();
  const isDineInAllowed = allowDineIn !== false;
  const [orderType, setOrderType] = useState<OrderType>('takeaway');
  const effectiveOrderType: OrderType = isDineInAllowed ? orderType : 'takeaway';
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [tableNumber, setTableNumber] = useState('');
  const [showReview, setShowReview] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [whatsappUnavailableMsg, setWhatsappUnavailableMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!customerName.trim()) {
      newErrors.name = 'Name is required';
    }

    if (effectiveOrderType === 'takeaway') {
      if (!customerPhone.trim()) {
        newErrors.phone = 'Mobile number is required';
      } else if (!/^[6-9]\d{9}$/.test(customerPhone.trim().replace(/\D/g, ''))) {
        newErrors.phone = 'Enter a valid 10-digit mobile number';
      }
      if (!address.trim()) {
        newErrors.address = 'Address is required';
      }
      if (!location.trim()) {
        newErrors.location = 'Location is required';
      }
    } else {
      if (!tableNumber.trim()) {
        newErrors.table = 'Table number is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToReview = () => {
    if (validate()) {
      setWhatsappUnavailableMsg(null);
      setShowReview(true);
    }
  };

  const currentOrderDetails: OrderDetails = {
    restaurantName,
    orderType: effectiveOrderType,
    customerName: customerName.trim(),
    customerPhone: effectiveOrderType === 'takeaway' ? customerPhone.trim() : undefined,
    address: effectiveOrderType === 'takeaway' ? address.trim() : undefined,
    landmark: effectiveOrderType === 'takeaway' && landmark.trim() ? landmark.trim() : undefined,
    location: effectiveOrderType === 'takeaway' ? location.trim() : undefined,
    tableNumber: effectiveOrderType === 'dine-in' ? tableNumber.trim() : undefined,
    items,
    totalAmount,
  };

  const handlePlaceOrder = () => {
    const message = buildWhatsAppMessage(currentOrderDetails);
    const url = buildWhatsAppURL(whatsappNumber, message);

    if (!url || !isWhatsAppConfigured(whatsappNumber)) {
      setWhatsappUnavailableMsg(
        'Ordering on WhatsApp is currently unavailable. Please contact the restaurant.'
      );
      return;
    }

    // Open WhatsApp
    window.open(url, '_blank');

    // Clear cart and close
    clearCart();
    onClose();
  };

  // ===================== REVIEW SCREEN =====================
  if (showReview) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4"
        onClick={() => setShowReview(false)}
      >
        <div
          className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-stone-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
                Step 2 of 2
              </span>
              <h2 className="text-xl font-bold text-stone-900">Review Your Order</h2>
            </div>
            <button
              onClick={() => setShowReview(false)}
              className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800"
              aria-label="Go back to edit"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Restaurant & Type */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">
                    Restaurant
                  </span>
                  <p className="font-bold text-stone-900 text-base">{restaurantName}</p>
                </div>
                <span className="px-3 py-1 bg-stone-900 text-white rounded-full text-xs font-semibold">
                  {effectiveOrderType === 'takeaway'
                    ? (isDineInAllowed ? '🛍️ Takeaway' : '🛍️ Takeaway (Cloud Kitchen)')
                    : '🍽️ Dine-in'}
                </span>
              </div>

              {/* Customer Details */}
              <div className="pt-2 border-t border-stone-200/60 text-sm">
                <p className="text-stone-700">
                  <strong className="text-stone-900">Customer:</strong> {customerName}
                </p>
                {effectiveOrderType === 'takeaway' && (
                  <>
                    <p className="text-stone-700 mt-0.5">
                      <strong className="text-stone-900">Mobile:</strong> {customerPhone}
                    </p>
                    <p className="text-stone-700 mt-0.5">
                      <strong className="text-stone-900">Address:</strong> {address}
                    </p>
                    {landmark && (
                      <p className="text-stone-700 mt-0.5">
                        <strong className="text-stone-900">Landmark:</strong> {landmark}
                      </p>
                    )}
                    <p className="text-stone-700 mt-0.5">
                      <strong className="text-stone-900">Location:</strong> {location}
                    </p>
                  </>
                )}
                {effectiveOrderType === 'dine-in' && (
                  <p className="text-stone-700 mt-0.5">
                    <strong className="text-stone-900">Table:</strong> Table {tableNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Order Items Breakdown */}
            <div>
              <span className="text-xs text-stone-400 font-bold uppercase tracking-wider block mb-2">
                Order Items ({items.reduce((s, i) => s + i.quantity, 0)})
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={`${item.menuItem.id}-${item.selectedVariant?.id || 'base'}`}
                    className="flex justify-between items-center text-sm py-1.5 border-b border-stone-100 last:border-0"
                  >
                    <div>
                      <span className="font-medium text-stone-900">
                        {item.quantity} × {item.menuItem.name}
                      </span>
                      {item.selectedVariant && (
                        <span className="text-xs text-stone-500 block">
                          ({item.selectedVariant.name})
                        </span>
                      )}
                    </div>
                    <span className="font-semibold text-stone-900">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100 space-y-2 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Estimated Taxes & Charges</span>
                <span>{formatPrice(0)}</span>
              </div>
              <div className="flex justify-between font-bold text-base text-stone-950 pt-2 border-t border-stone-200">
                <span>Total Amount</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
            </div>

            {/* Payment Method Notice */}
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-200/60 flex items-start gap-2.5">
              <span className="text-base">💵</span>
              <div className="text-xs text-amber-900">
                <strong className="font-semibold">Pay on Delivery / Pickup:</strong> No advance online payment needed. Cash or UPI accepted upon delivery or pickup.
              </div>
            </div>

            {/* WhatsApp Unavailable Error Notice */}
            {whatsappUnavailableMsg && (
              <div className="bg-rose-50 rounded-xl p-3 border border-rose-200 text-rose-800 text-xs font-medium">
                {whatsappUnavailableMsg}
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-5 border-t border-stone-100 space-y-2 bg-stone-50/50">
            <button
              onClick={handlePlaceOrder}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-base rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>PLACE ORDER ON WHATSAPP</span>
            </button>
            <button
              onClick={() => setShowReview(false)}
              className="w-full text-center text-xs font-semibold text-stone-500 py-2 hover:text-stone-800"
            >
              ← Edit Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===================== DETAILS INPUT SCREEN =====================
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
              Step 1 of 2
            </span>
            <h2 className="text-xl font-bold text-stone-900">Checkout</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800"
            aria-label="Close checkout"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Order Type Selection */}
          {isDineInAllowed ? (
            <div>
              <label className="block text-sm font-bold text-stone-800 mb-2">
                How would you like to receive your order?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOrderType('takeaway')}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1.5 ${
                    effectiveOrderType === 'takeaway'
                      ? 'border-stone-950 bg-stone-950 text-white shadow-md'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <span className="text-2xl">🛍️</span>
                  <span className="font-bold text-sm">TAKEAWAY</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('dine-in')}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1.5 ${
                    effectiveOrderType === 'dine-in'
                      ? 'border-stone-950 bg-stone-950 text-white shadow-md'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <span className="text-2xl">🍽️</span>
                  <span className="font-bold text-sm">DINE-IN</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3.5 p-4 bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-2xl shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xl shrink-0 shadow-xs">
                🛍️
              </div>
              <div>
                <div className="font-bold text-sm text-emerald-950 flex items-center gap-2">
                  <span>Takeaway Order</span>
                  <span className="text-[10px] uppercase tracking-wider bg-emerald-200/90 text-emerald-900 px-2 py-0.5 rounded-md font-black">
                    Cloud Kitchen
                  </span>
                </div>
                <div className="text-xs text-emerald-800/90 mt-0.5">
                  Shalimar is a cloud kitchen. All orders are packed fresh for takeaway.
                </div>
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4 pt-2 border-t border-stone-100">
            <h3 className="text-base font-bold text-stone-900">
              {effectiveOrderType === 'takeaway' ? 'TAKEAWAY DETAILS' : 'DINE-IN DETAILS'}
            </h3>

            {/* Customer Name */}
            <div>
              <label htmlFor="chk-name" className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="chk-name"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3.5 rounded-2xl border text-stone-900 text-base font-medium placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all ${
                  errors.name ? 'border-rose-400 bg-rose-50/50' : 'border-stone-200 bg-stone-50/50'
                }`}
              />
              {errors.name && <p className="text-rose-600 text-xs font-semibold mt-1">{errors.name}</p>}
            </div>

            {effectiveOrderType === 'takeaway' ? (
              <>
                {/* Mobile Number */}
                <div>
                  <label htmlFor="chk-phone" className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="chk-phone"
                    type="tel"
                    inputMode="numeric"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="10-digit mobile number"
                    className={`w-full px-4 py-3.5 rounded-2xl border text-stone-900 text-base font-medium placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all ${
                      errors.phone ? 'border-rose-400 bg-rose-50/50' : 'border-stone-200 bg-stone-50/50'
                    }`}
                  />
                  {errors.phone && <p className="text-rose-600 text-xs font-semibold mt-1">{errors.phone}</p>}
                </div>

                {/* Full Address */}
                <div>
                  <label htmlFor="chk-addr" className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="chk-addr"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Flat / Building / Street address"
                    className={`w-full px-4 py-3.5 rounded-2xl border text-stone-900 text-base font-medium placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all ${
                      errors.address ? 'border-rose-400 bg-rose-50/50' : 'border-stone-200 bg-stone-50/50'
                    }`}
                  />
                  {errors.address && <p className="text-rose-600 text-xs font-semibold mt-1">{errors.address}</p>}
                </div>

                {/* Landmark (Optional) */}
                <div>
                  <label htmlFor="chk-landmark" className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Landmark <span className="text-stone-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    id="chk-landmark"
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="Nearby landmark or shop"
                    className="w-full px-4 py-3.5 rounded-2xl border border-stone-200 bg-stone-50/50 text-stone-900 text-base font-medium placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all"
                  />
                </div>

                {/* Location / Area (Pre-filled Chiplun) */}
                <div>
                  <label htmlFor="chk-location" className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Location / Area <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="chk-location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={`w-full px-4 py-3.5 rounded-2xl border text-stone-900 text-base font-medium placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all ${
                      errors.location ? 'border-rose-400 bg-rose-50/50' : 'border-stone-200 bg-stone-50/50'
                    }`}
                  />
                  {errors.location && <p className="text-rose-600 text-xs font-semibold mt-1">{errors.location}</p>}
                </div>
              </>
            ) : (
              /* Table Number for Dine-in */
              <div>
                <label htmlFor="chk-table" className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  Table Number <span className="text-rose-500">*</span>
                </label>
                <input
                  id="chk-table"
                  type="text"
                  inputMode="numeric"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="e.g. 12"
                  className={`w-full px-4 py-3.5 rounded-2xl border text-stone-900 text-base font-medium placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all ${
                    errors.table ? 'border-rose-400 bg-rose-50/50' : 'border-stone-200 bg-stone-50/50'
                  }`}
                />
                {errors.table && <p className="text-rose-600 text-xs font-semibold mt-1">{errors.table}</p>}
              </div>
            )}
          </div>

          {/* Quick Order Summary */}
          <div className="pt-4 border-t border-stone-100">
            <span className="text-xs text-stone-400 font-bold uppercase tracking-wider block mb-2">
              Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} items)
            </span>
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100 space-y-1.5 text-sm">
              {items.map((cartItem, idx) => (
                <div key={idx} className="flex justify-between text-stone-700">
                  <span className="truncate pr-2">
                    {cartItem.quantity} × {cartItem.menuItem.name}
                    {cartItem.selectedVariant && ` (${cartItem.selectedVariant.name})`}
                  </span>
                  <span className="font-semibold text-stone-900 flex-shrink-0">
                    {formatPrice(cartItem.unitPrice * cartItem.quantity)}
                  </span>
                </div>
              ))}
              <div className="pt-2 mt-2 border-t border-stone-200 flex justify-between font-bold text-stone-950 text-base">
                <span>Total</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="p-5 border-t border-stone-100">
          <button
            onClick={handleContinueToReview}
            className="w-full bg-stone-950 text-white font-bold py-4 rounded-2xl text-base hover:bg-stone-800 active:scale-98 transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Continue to Review Order</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
