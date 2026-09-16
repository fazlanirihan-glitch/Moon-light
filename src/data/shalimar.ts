// Shalimar Cloud Restaurant - Placeholder data. Add categories and menuItems when provided by owner.
import { Restaurant } from '@/types';

export const shalimarData: Restaurant = {
  id: 'shalimar',
  slug: 'shalimar',
  name: 'Shalimar Cloud Restaurant',
  tagline: 'Explore Menu & Order Online',
  description: 'Coming Soon to Chiplun',
  emoji: '🍽️',
  whatsappNumber: '+910000000000', // TODO: Replace with actual number
  theme: {
    primary: '#1B4332',
    secondary: '#F0FDF4',
    accent: '#16A34A',
    headerBg: '#1B4332',
    headerText: '#F0FDF4'
  },
  isComingSoon: true,
  categories: [],
  menuItems: []
};
