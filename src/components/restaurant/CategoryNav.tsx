'use client';

import { Category } from '@/types';

interface CategoryNavProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelect: (categoryId: string | null) => void;
  accentColor?: string;
}

export default function CategoryNav({
  categories,
  selectedCategoryId,
  onSelect,
  accentColor = '#1C1917',
}: CategoryNavProps) {
  if (categories.length === 0) return null;

  return (
    <nav className="overflow-x-auto scrollbar-hide py-2" aria-label="Menu categories">
      <div className="flex gap-2 px-1 min-w-max">
        <button
          onClick={() => onSelect(null)}
          className={`px-4 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all shadow-xs active:scale-95 ${
            selectedCategoryId === null
              ? 'text-white shadow-md'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200/80'
          }`}
          style={
            selectedCategoryId === null
              ? { backgroundColor: accentColor }
              : undefined
          }
          aria-pressed={selectedCategoryId === null}
        >
          All Items
        </button>
        {categories.map((category) => {
          const isSelected = selectedCategoryId === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onSelect(category.id)}
              className={`px-4 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all shadow-xs active:scale-95 ${
                isSelected
                  ? 'text-white shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200/80'
              }`}
              style={
                isSelected
                  ? { backgroundColor: accentColor }
                  : undefined
              }
              aria-pressed={isSelected}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
