// src/app/posts/_components/CategoryButtons.tsx

import Link from 'next/link';
import { getSlugFromDisplayName } from '@/constants/categories';

interface CategoryButtonsProps {
  categories: string[];
}

export default function CategoryButtons({ categories }: CategoryButtonsProps) {
  // ユーザーの要件「5つほど」に合わせて、カテゴリが少ない場合は「すべて見る」などを追加
  const displayCategories = [...categories];

  return (
    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
      {displayCategories.map(categoryDisplayName => { // category を categoryDisplayName にリネームして明確化
        //表示名からスラッグを取得
        const categorySlug = getSlugFromDisplayName(categoryDisplayName);

        // スラッグが見つからない場合はボタンをレンダリングしない (安全策)
        if (!categorySlug) return null;

        return (
          <Link
            key={categorySlug} // key はスラッグにするとよりユニークで安定
            href={`/posts/category/${categorySlug}`} // ★取得したスラッグを使用
            className="bg-accent-1 text-main px-5 py-2 rounded-full hover:bg-brand-secondary transition-colors duration-200 text-lg font-bold shadow-md hover:shadow-lg"
          >
            {categoryDisplayName} {/* ボタンの表示テキストは日本語のまま */}
          </Link>
        );
      })}
    </div>
  );
}
