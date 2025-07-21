// src/app/posts/category/[categorySlug]/page.tsx

import Link from 'next/link';
import { getPostsByCategory } from '@/lib/posts';
import { Post } from '@/types/post';
import { CATEGORY_SLUG_MAP, CATEGORY_SLUGS } from '@/constants/categories';
import { notFound } from 'next/navigation';
import PostListSection from '@/app/posts/_components/PostListSection';
import TwoColumnLayout from '@/components/TwoColumnLayout';
import CardAd from '@/components/sidebar-cards/CardAd';
import CardPopularPosts from '@/components/sidebar-cards/CardPopularPosts';
import CardProfile from '@/components/sidebar-cards/CardProfile';

export async function generateStaticParams() {
  return CATEGORY_SLUGS.map((slug) => ({
    categorySlug: slug,
  }));
}

// export default async function CategoryPostsPage({ params }: { params: { categorySlug: string } }) {
// ★修正箇所1: params の型定義を Promise でラップする★
export default async function CategoryPostsPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  // ★修正箇所2: params を await で解決する★
  const resolvedParams = await params;
  const categorySlug = resolvedParams.categorySlug;
  const categoryName = CATEGORY_SLUG_MAP[categorySlug];
  // const categoryName = CATEGORY_SLUG_MAP[params.categorySlug];

  if (!categoryName) {
    notFound();
  }

  const posts: Post[] = await getPostsByCategory(categoryName);

  const leftContent = !posts || posts.length === 0 ? ( // 条件式 ? 真の場合のJSX : 偽の場合のJSX
    // 記事がない場合
    <>
      <h1 className="text-4xl font-extrabold mb-10 text-main-text border-b-4 border-brand-primary pb-4">
        カテゴリ: &quot;{categoryName}&quot;
      </h1>
      <p className="text-sub-text">このカテゴリにはまだ記事がありません。</p>
      <div className="mt-8">
        <Link href="/posts" className="text-brand-primary hover:underline">
          すべての記事に戻る &rarr;
        </Link>
      </div>
    </>
  ) : (
    // 記事がある場合
    <>
      <h1 className="text-4xl font-extrabold mb-10 text-main-text border-b-4 border-brand-primary pb-4">
        カテゴリ: &quot;{categoryName}&quot;
      </h1>
      <PostListSection posts={posts} />
    </>
  );

  const rightContent = (
    <div className="space-y-6"> {/* 各カード間の余白 */}
      {/* 広告カード */}
      <CardAd />
      <CardPopularPosts />
      {/* 自己紹介カード */}
      <CardProfile />
    </div>
  )

  return (
    <TwoColumnLayout left={leftContent} right={rightContent} />
  );
}