// Central configuration for restaurant WhatsApp order routing
// The owner has confirmed that ALL THREE RESTAURANTS use the SAME WhatsApp number for receiving orders.

export const ORDER_WHATSAPP_NUMBER = "917875747996";

export const RESTAURANT_WHATSAPP_NUMBERS: Record<string, string> = {
  'moonlight': ORDER_WHATSAPP_NUMBER,
  'fakta-biriyani': ORDER_WHATSAPP_NUMBER,
  'shalimar': ORDER_WHATSAPP_NUMBER,
};

export const DEFAULT_LOCATION = 'Chiplun';

export const ZENCRO_URL = 'https://zencrodigital.in';
