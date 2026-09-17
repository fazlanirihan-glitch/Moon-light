import Link from 'next/link';
import { ZENCRO_URL } from '@/config/restaurants';

export default function ZenCroFooter() {
  return (
    <footer className="py-6 text-center">
      <Link
        href={ZENCRO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-stone-400 hover:text-stone-600 transition-colors"
      >
        Our digital ordering system is developed by ZenCro Digital.
      </Link>
    </footer>
  );
}
