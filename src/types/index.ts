export interface MenuVariant {
  id: string;
  name: string; // e.g. 'Half', 'Full', 'Pack (500GM)', 'Pack (1 KG)'
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number; // base price (used when no variants)
  description?: string;
  image: string;
  isVeg: boolean;
  categoryId: string;
  hasVariants?: boolean;
  variants?: MenuVariant[];
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export interface RestaurantTheme {
  primary: string;
  secondary: string;
  accent: string;
  headerBg: string;
  headerText: string;
}

export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  emoji: string;
  whatsappNumber: string;
  theme: RestaurantTheme;
  categories: Category[];
  menuItems: MenuItem[];
  isComingSoon?: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  selectedVariant?: MenuVariant;
  quantity: number;
  unitPrice: number;
}

export type OrderType = 'takeaway' | 'dine-in';

export interface OrderDetails {
  restaurantName: string;
  orderType: OrderType;
  customerName: string;
  customerPhone?: string;
  address?: string;
  landmark?: string;
  location?: string;
  tableNumber?: string;
  items: CartItem[];
  totalAmount: number;
}
