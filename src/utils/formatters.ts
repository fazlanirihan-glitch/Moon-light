export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

export function formatPhone(phone: string): string {
  // Remove non-digits
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return digits;
  }
  // If has country code
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  return phone;
}
