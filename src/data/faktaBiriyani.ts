import { Restaurant } from '@/types';

export const faktaBiriyaniData: Restaurant = {
  id: 'fakta-biriyani',
  slug: 'fakta-biriyani',
  name: 'Fakta Biriyani',
  tagline: 'Explore Menu & Order Online',
  description: 'Authentic Biriyani in Chiplun',
  emoji: '🍗',
  whatsappNumber: '+917737157377',
  theme: {
    primary: '#1C1917',
    secondary: '#FFFBEB',
    accent: '#D97706',
    headerBg: '#1C1917',
    headerText: '#FFFBEB'
  },
  categories: [
    { id: 'chicken', name: 'Chicken' },
    { id: 'mutton', name: 'Mutton' },
    { id: 'egg', name: 'Egg' },
    { id: 'veg', name: 'Veg' },
    { id: 'fish', name: 'Fish' },
    { id: 'sides', name: 'Sides' },
    { id: 'beverages', name: 'Beverages' }
  ],
  menuItems: [
    {
      id: 'fb-ch-1',
      categoryId: 'chicken',
      name: 'Chicken Dum Biryani',
      price: 179,
      isVeg: false,
      hasVariants: true,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
      variants: [
        { id: 'fb-ch1-h', name: 'Half', price: 179 },
        { id: 'fb-ch1-f', name: 'Full', price: 279 },
        { id: 'fb-ch1-500', name: 'Pack (500GM)', price: 599 },
        { id: 'fb-ch1-1k', name: 'Pack (1 KG)', price: 1199 }
      ]
    },
    {
      id: 'fb-ch-2',
      categoryId: 'chicken',
      name: 'Chicken Dum Boneless Biryani',
      price: 189,
      isVeg: false,
      hasVariants: true,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
      variants: [
        { id: 'fb-ch2-h', name: 'Half', price: 189 },
        { id: 'fb-ch2-f', name: 'Full', price: 289 },
        { id: 'fb-ch2-500', name: 'Pack (500GM)', price: 649 },
        { id: 'fb-ch2-1k', name: 'Pack (1 KG)', price: 1299 }
      ]
    },
    {
      id: 'fb-ch-3',
      categoryId: 'chicken',
      name: 'Chicken Tikka Biryani',
      price: 219,
      isVeg: false,
      hasVariants: true,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
      variants: [
        { id: 'fb-ch3-h', name: 'Half', price: 219 },
        { id: 'fb-ch3-f', name: 'Full', price: 319 },
        { id: 'fb-ch3-500', name: 'Pack (500GM)', price: 679 },
        { id: 'fb-ch3-1k', name: 'Pack (1 KG)', price: 1349 }
      ]
    },
    {
      id: 'fb-ch-4',
      categoryId: 'chicken',
      name: 'Chicken Seekh Biryani',
      price: 249,
      isVeg: false,
      hasVariants: true,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
      variants: [
        { id: 'fb-ch4-h', name: 'Half', price: 249 },
        { id: 'fb-ch4-f', name: 'Full', price: 349 },
        { id: 'fb-ch4-500', name: 'Pack (500GM)', price: 679 },
        { id: 'fb-ch4-1k', name: 'Pack (1 KG)', price: 1249 }
      ]
    },
    {
      id: 'fb-ch-5',
      categoryId: 'chicken',
      name: 'Chicken Pulao',
      price: 169,
      isVeg: false,
      hasVariants: true,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
      variants: [
        { id: 'fb-ch5-h', name: 'Half', price: 169 },
        { id: 'fb-ch5-f', name: 'Full', price: 259 },
        { id: 'fb-ch5-500', name: 'Pack (500GM)', price: 499 },
        { id: 'fb-ch5-1k', name: 'Pack (1 KG)', price: 949 }
      ]
    },
    {
      id: 'fb-mt-1',
      categoryId: 'mutton',
      name: 'Mutton Dum Biryani',
      price: 279,
      isVeg: false,
      hasVariants: true,
      image: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?w=400&h=300&fit=crop',
      variants: [
        { id: 'fb-mt1-h', name: 'Half', price: 279 },
        { id: 'fb-mt1-f', name: 'Full', price: 379 },
        { id: 'fb-mt1-500', name: 'Pack (500GM)', price: 899 },
        { id: 'fb-mt1-1k', name: 'Pack (1 KG)', price: 1799 }
      ]
    },
    {
      id: 'fb-mt-2',
      categoryId: 'mutton',
      name: 'Mutton Pulao',
      price: 249,
      isVeg: false,
      hasVariants: true,
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop',
      variants: [
        { id: 'fb-mt2-h', name: 'Half', price: 249 },
        { id: 'fb-mt2-f', name: 'Full', price: 349 },
        { id: 'fb-mt2-500', name: 'Pack (500GM)', price: 799 },
        { id: 'fb-mt2-1k', name: 'Pack (1 KG)', price: 1599 }
      ]
    },
    {
      id: 'fb-eg-1',
      categoryId: 'egg',
      name: 'Egg Biryani',
      price: 149,
      isVeg: false,
      hasVariants: true,
      image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400&h=300&fit=crop',
      variants: [
        { id: 'fb-eg1-h', name: 'Half', price: 149 },
        { id: 'fb-eg1-f', name: 'Full', price: 249 },
        { id: 'fb-eg1-500', name: 'Pack (500GM)', price: 449 },
        { id: 'fb-eg1-1k', name: 'Pack (1 KG)', price: 899 }
      ]
    },
    {
      id: 'fb-vg-1',
      categoryId: 'veg',
      name: 'Veg Biryani',
      price: 179,
      isVeg: true,
      hasVariants: true,
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop',
      variants: [
        { id: 'fb-vg1-h', name: 'Half', price: 179 },
        { id: 'fb-vg1-f', name: 'Full', price: 279 },
        { id: 'fb-vg1-500', name: 'Pack (500GM)', price: 499 },
        { id: 'fb-vg1-1k', name: 'Pack (1 KG)', price: 999 }
      ]
    },
    {
      id: 'fb-vg-2',
      categoryId: 'veg',
      name: 'Paneer Tikka Biryani',
      price: 219,
      isVeg: true,
      hasVariants: true,
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop',
      variants: [
        { id: 'fb-vg2-h', name: 'Half', price: 219 },
        { id: 'fb-vg2-f', name: 'Full', price: 319 },
        { id: 'fb-vg2-500', name: 'Pack (500GM)', price: 649 },
        { id: 'fb-vg2-1k', name: 'Pack (1 KG)', price: 1299 }
      ]
    },
    {
      id: 'fb-vg-3',
      categoryId: 'veg',
      name: 'Veg Pulao',
      price: 449,
      isVeg: true,
      hasVariants: true,
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop',
      // NOTE: Veg Pulao prices as supplied by owner - may need correction
      variants: [
        { id: 'fb-vg3-h', name: 'Half', price: 449 },
        { id: 'fb-vg3-f', name: 'Full', price: 899 },
        { id: 'fb-vg3-500', name: 'Pack (500GM)', price: 499 },
        { id: 'fb-vg3-1k', name: 'Pack (1 KG)', price: 899 }
      ]
    },
    {
      id: 'fb-fs-1',
      categoryId: 'fish',
      name: 'Prawns Biryani',
      price: 269,
      isVeg: false,
      hasVariants: true,
      image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400&h=300&fit=crop',
      variants: [
        { id: 'fb-fs1-h', name: 'Half', price: 269 },
        { id: 'fb-fs1-f', name: 'Full', price: 369 },
        { id: 'fb-fs1-500', name: 'Pack (500GM)', price: 799 },
        { id: 'fb-fs1-1k', name: 'Pack (1 KG)', price: 1599 }
      ]
    },
    {
      id: 'fb-sd-1',
      categoryId: 'sides',
      name: 'Chicken Cutlet 2pcs',
      price: 129,
      isVeg: false,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop'
    },
    {
      id: 'fb-sd-2',
      categoryId: 'sides',
      name: 'Veg Cutlet 2pcs',
      price: 99,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop'
    },
    {
      id: 'fb-sd-3',
      categoryId: 'sides',
      name: 'Gulabjamun 2pcs',
      price: 49,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1666190064667-3149e0cc68a0?w=400&h=300&fit=crop'
    },
    {
      id: 'fb-sd-4',
      categoryId: 'sides',
      name: 'Raita',
      price: 39,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop'
    },
    {
      id: 'fb-bv-1',
      categoryId: 'beverages',
      name: 'Mirinda (250 ml)',
      price: 129,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&h=300&fit=crop'
    },
    {
      id: 'fb-bv-2',
      categoryId: 'beverages',
      name: 'Pepsi (250 ml)',
      price: 29,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&h=300&fit=crop'
    },
    {
      id: 'fb-bv-3',
      categoryId: 'beverages',
      name: 'Coke (250 ml)',
      price: 29,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&h=300&fit=crop'
    },
    {
      id: 'fb-bv-4',
      categoryId: 'beverages',
      name: 'Masala Chaas (300 ml)',
      price: 39,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1587049016823-69ef9d68f664?w=400&h=300&fit=crop'
    },
    {
      id: 'fb-bv-5',
      categoryId: 'beverages',
      name: 'Cold Coffee (300 ml)',
      price: 79,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop'
    }
  ]
};
