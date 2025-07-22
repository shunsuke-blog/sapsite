// src/components/HomePageLayout.tsx
'use client' // 検索窓の入力状態管理やボタンクリックのために必要になる可能性あり

import Link from 'next/link';
import PostListSection from '@/app/posts/_components/PostListSection';
import CategoryButtons from '@/app/posts/_components/CategoryButtons';
import { Post } from '@/types/post'; // Post型をインポート
import Image from 'next/image';
import { useState } from 'react' // 検索窓の入力状態管理に使う（ハンバーガーメニューで使わないなら削除可能）

interface HomePageLayoutProps {
  latestPosts: Post[];
  popularPosts: Post[];
  categories: string[];
}

export default function HomePageLayout({ latestPosts, popularPosts, categories }: HomePageLayoutProps) {

  const [searchTerm, setSearchTerm] = useState(''); // 検索キーワードの状態
  // 検索処理のプレースホルダー
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // フォーム送信のデフォルト動作を防ぐ
    if (searchTerm.trim()) {
      // ここに検索ページへの遷移ロジックなどを実装
      console.log('Searching for:', searchTerm);
    }
  };

  return (
    <main>
      {/* ヒーローセクション */}
      <section className="relative w-full h-96 mb-12 rounded-lg overflow-hidden shadow-xl">
        <Image
          src="/images/hero-image.png" 
          alt="サイトのヒーロー画像"
          fill // 親要素に合わせて画像を埋める
          priority // ページのメイン画像なので優先的に読み込む
          className="object-cover" // 画像が親要素に合わせてトリミングされるようにする
          sizes="(max-width: 1200px) 100vw, 1200px" // レスポンシブ画像のためのsizesプロパティ
        />
        {/* 画像の上に重ねるテキストなどがあればここに追加 */}
        <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="text-center text-main z-10">
            <h1 className=" text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
              SAPの森で迷わない。確かな知識と実践のコンパス。
            </h1>
            <p className="text-lg md:text-xl drop-shadow-md text-main mb-4">
              SAPの基礎から応用まで。現場で役立つ実践的なノウハウと、経験者のリアルな備忘録を公開。
            </p>
            <form onSubmit={handleSearch} className="flex justify-center items-center w-full max-w-xl mx-auto">
              <input
                type="text"
                placeholder="記事を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                // inputの幅を調整し、text-gray-800で入力文字色を指定
                className="flex-grow px-4 py-2 border-2 border-transparent rounded-md text-black bg-background focus:outline-none focus:ring-2 focus:ring-accent-1"
              />
            </form>
          </div>
        </div>
      </section>

      {/* カテゴリボタンセクション */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-brand-primary border-b-2 border-brand-primary pb-2">カテゴリから探す</h2>
        <CategoryButtons categories={categories} />
      </section>

      {/* 最新記事セクション */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-brand-primary border-b-2 border-brand-primary pb-2">最新記事</h2>
        <PostListSection posts={latestPosts} />
        <div className="text-right mt-6">
          <Link href="/posts/latest" className="text-brand-primary hover:underline text-lg font-medium">
            最新記事をもっと見る &rarr;
          </Link>
        </div>
      </section>

      {/* 人気記事セクション */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-brand-primary border-b-2 border-brand-primary pb-2">人気記事</h2>
        <PostListSection posts={popularPosts} />
        <div className="text-right mt-6">
          <Link href="/posts/popular" className="text-brand-primary hover:underline text-lg font-medium">
            人気記事をもっと見る &rarr;
          </Link>
        </div>
      </section>
      {/* 著者セクション */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-brand-primary border-b-2 border-brand-primary pb-2">著者プロフィール</h2>
        <div className="text-right mt-6">
          <Link href="/posts/popular" className="text-brand-primary hover:underline text-lg font-medium">
            著者プロフィールへ &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
