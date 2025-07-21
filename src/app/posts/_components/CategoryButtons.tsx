// src/app/posts/_components/CategoryButtons.tsx

import Link from 'next/link';

interface CategoryButtonsProps {
  categories: string[];
}

export default function CategoryButtons({ categories }: CategoryButtonsProps) {
  // ユーザーの要件「5つほど」に合わせて、カテゴリが少ない場合は「すべて見る」などを追加
  const displayCategories = [...categories];
  // 例: カテゴリが3つしかなくても、5つ表示したい場合は、
  // 追加のボタン（例: 「すべて見る」「Webサイト制作」）をここで定義します。
  // getAllCategories関数で既に「Webサイト制作」「その他」を追加しているので、
  // ここではそのままcategoriesを使います。

  return (
    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
      {displayCategories.map(category => (
        <Link
          key={category}
          // カテゴリ名がURLフレンドリーになるように変換 (例: "SAP" -> "sap")
          href={`/posts/category/${category.toLowerCase()}`}
          className="bg-accent-1 text-main px-5 py-2 rounded-full hover:bg-brand-secondary transition-colors duration-200 text-lg font-medium shadow-md hover:shadow-lg"
        >
          {category}
        </Link>
      ))}
      {/* 全ての記事へのリンクを追加することもできます */}
      {/* <Link
        href="/posts"
        className="bg-gray-600 text-white px-5 py-2 rounded-full hover:bg-gray-700 transition-colors duration-200 text-lg font-medium shadow-md hover:shadow-lg"
      >
        全ての記事
      </Link> */}
    </div>
  );
}
