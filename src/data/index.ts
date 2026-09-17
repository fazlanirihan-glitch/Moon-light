import { moonlightData } from './moonlight';
import { faktaBiriyaniData } from './faktaBiriyani';
import { shalimarData } from './shalimar';
import { Restaurant } from '@/types';

export const restaurants: Restaurant[] = [
  moonlightData,
  faktaBiriyaniData,
  shalimarData,
];

export function getRestaurantBySlug(slug: string): Restaurant | undefined {
  return restaurants.find((r) => r.slug === slug);
}

export { moonlightData, faktaBiriyaniData, shalimarData };
