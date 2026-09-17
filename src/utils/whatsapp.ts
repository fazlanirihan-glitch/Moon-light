import { CartItem, OrderDetails } from '@/types';
import { formatPrice } from './formatters';
import { ORDER_WHATSAPP_NUMBER } from '@/config/restaurants';

/**
 * Normalizes restaurant name for WhatsApp order header
 * Example:
 * "Moonlight Cafe & Restaurant" -> "MOONLIGHT CAFE"
 * "Fakta Biriyani" -> "FAKTA BIRIYANI"
 * "Shalimar Cloud Restaurant" -> "SHALIMAR CLOUD RESTAURANT"
 */
export function formatRestaurantHeaderName(name: string): string {
  const upper = (name || '').toUpperCase().trim();
  if (upper.includes('MOONLIGHT')) {
    return 'MOONLIGHT CAFE';
  }
  if (upper.includes('FAKTA')) {
    return 'FAKTA BIRIYANI';
  }
  if (upper.includes('SHALIMAR')) {
    return 'SHALIMAR CLOUD RESTAURANT';
  }
  return upper;
}

/**
 * Checks if WhatsApp order routing number is configured.
 */
export function isWhatsAppConfigured(phoneNumber?: string): boolean {
  const num = phoneNumber || ORDER_WHATSAPP_NUMBER;
  if (!num) return false;
  const clean = num.replace(/\D/g, '');
  if (clean.length < 10) return false;
  if (/^0+$/.test(clean) || clean.includes('0000000000')) return false;
  return true;
}

/**
 * Builds the exact structured WhatsApp order message required by the owner.
 */
export function buildWhatsAppMessage(order: OrderDetails): string {
  const lines: string[] = [];

  // Top Restaurant Order Identification
  const restaurantHeader = formatRestaurantHeaderName(order.restaurantName);
  lines.push(`NEW ORDER — ${restaurantHeader}`);
  lines.push('');

  // Order Type (TAKEAWAY or DINE-IN)
  const orderTypeUpper = order.orderType === 'takeaway' ? 'TAKEAWAY' : 'DINE-IN';
  lines.push(`Order Type: ${orderTypeUpper}`);
  lines.push('');

  // Customer Information
  lines.push(`Customer Name: ${order.customerName}`);

  if (order.orderType === 'takeaway') {
    if (order.customerPhone) {
      lines.push(`Mobile: ${order.customerPhone}`);
    }
    lines.push('');
    if (order.address) {
      lines.push(`Address: ${order.address}`);
    }
    lines.push(`Landmark: ${order.landmark && order.landmark.trim() ? order.landmark.trim() : '-'}`);
    lines.push(`Location: ${order.location || 'Chiplun'}`);
  } else {
    if (order.tableNumber) {
      lines.push(`Table Number: ${order.tableNumber}`);
    }
  }

  lines.push('');
  lines.push('--------------------------------');
  lines.push('ORDER ITEMS');
  lines.push('');

  // Items formatting with variant support
  order.items.forEach((item: CartItem, idx: number) => {
    const itemTotal = formatPrice(item.unitPrice * item.quantity);

    if (item.selectedVariant) {
      if (idx > 0) lines.push('');
      lines.push(`${item.quantity} × ${item.menuItem.name}`);
      lines.push(`Variant: ${item.selectedVariant.name}`);
      lines.push(itemTotal);
    } else {
      lines.push(`${item.quantity} × ${item.menuItem.name} — ${itemTotal}`);
    }
  });

  lines.push('');
  lines.push('--------------------------------');
  lines.push(`TOTAL: ${formatPrice(order.totalAmount)}`);
  lines.push('');
  lines.push('Please prepare the order.');

  return lines.join('\n');
}

/**
 * Generates WhatsApp click-to-chat URL routed directly to the central owner number.
 * Destination number is always +917875747996.
 */
export function buildWhatsAppURL(
  phoneNumber: string = ORDER_WHATSAPP_NUMBER,
  message: string
): string | null {
  const targetNumber = phoneNumber || ORDER_WHATSAPP_NUMBER;

  if (!isWhatsAppConfigured(targetNumber)) {
    return null;
  }

  // Clean target number to digits
  let digits = targetNumber.replace(/\D/g, '');

  // Ensure Indian country code 91
  if (digits.length === 10) {
    digits = '91' + digits;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${encodedMessage}`;
}
