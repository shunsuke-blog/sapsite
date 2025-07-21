// src/components/SidebarContentAds.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPopularPosts } from '@/lib/posts'; // 例として人気記事も表示
import { CATEGORY_SLUG_MAP, CATEGORY_NAMES } from '@/constants/categories'; // カテゴリ定数をインポート
import CategoryButtons from '@/app/posts/_components/CategoryButtons';

export default async function SidebarContentAds() {
  // 人気記事は広告と並ぶ一般的なサイドバーコンテンツなので、ここで取得
  const popularPosts = await getPopularPosts(5); // 人気記事を5件取得

  return (
    <div className="p-6 rounded-2xl bg-main shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-main-text">広告スペース / おすすめ</h2>
      <p className="text-gray-700 mb-4">ここにメインの広告やプロモーションコンテンツが入ります。</p>
      {/* 例: 広告画像 */}
      {/* <div className="relative w-full h-40 bg-gray-300 rounded-md flex items-center justify-center mb-6">
        <span className="text-gray-500">広告バナー</span>
        <Image src="/images/ad-banner.jpg" alt="広告" fill style={{ objectFit: 'cover' }} className="rounded-md"/>
      </div> */}

      {/* 人気記事セクション（共通で表示したい場合） */}
      {popularPosts.length > 0 && (
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-xl font-semibold mb-3 text-main-text">人気の記事</h3>
          <ul>
            {popularPosts.map((post) => (
              <li key={post.id} className="mb-4 last:mb-0">
                <Link href={`/posts/${post.id}`} className="block hover:opacity-75 transition-opacity">
                  {post.thumbnail && (
                    <div className="relative w-full h-20 mb-2 rounded overflow-hidden">
                      <Image
                        src={post.thumbnail.url}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: 'cover' }}
                        className="rounded"
                      />
                    </div>
                  )}
                  <h4 className="font-semibold text-lg leading-tight text-main-text">{post.title}</h4>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* その他のカテゴリボタン（共通で表示したい場合） */}
      <div className="mt-8 pt-6 border-t">
        <h3 className="text-xl font-semibold mb-3 text-main-text">他のカテゴリ</h3>
        <CategoryButtons categories={CATEGORY_NAMES} />
      </div>
    </div>
  );
}