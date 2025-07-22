// src/app/posts/[slug]/page.tsx

import { client } from '@/lib/microcms';
import { notFound } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image'; // Imageコンポーネントをインポート
import Link from 'next/link'; // Linkコンポーネントをインポート (パンくずリスト用)
import { formatDate } from '@/lib/utils'; // 日付フォーマット関数をインポート
import TwoColumnLayout from '@/components/TwoColumnLayout';
import CardTableOfContents from '@/components/sidebar-cards/CardTableOfContents';
import CardPopularPosts from '@/components/sidebar-cards/CardPopularPosts';
import CardProfile from '@/components/sidebar-cards/CardProfile';
import CardAd from '@/components/sidebar-cards/CardAd';
import { getSlugFromDisplayName } from '@/constants/categories';
// import { Tag } from '@/constants/tags';
import { Tag } from '@/types/tag';
import { Category } from '@/types/category';
import React from 'react';

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

// サムネイルの型定義
type Thumbnail = {
  url: string;
  height: number;
  width: number;
};

// // カテゴリの型定義を追加
// type Category = {
//   id: string;
//   name: string;
//   slug: string;
// };

// Blogの型を更新: category を追加
type Blog = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  thumbnail: Thumbnail;
  category: Category;
  tags: Tag[];
  slug: string;
};

type MicroCMSContentId = {
  id: string;
};

export async function generateStaticParams() {
  const data: { contents: MicroCMSContentId[] } = await client.get({ endpoint: 'blogs' });
  return data.contents.map((content) => ({
    slug: content.id,
  }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  let post: Blog;
  try {
    post = await client.get({
      endpoint: 'blogs',
      // contentId: params.slug,
      contentId: slug,
    }) as Blog
  } catch (err) {
    // console.error(`Failed to fetch blog post with slug: ${params.slug}`, err); // エラーログを追加
    console.error(`Failed to fetch blog post with slug: ${slug}`, err); // エラーログを追加
    notFound();
  }

  const cleanBody = DOMPurify.sanitize(post.content);
  const updatedDate = formatDate(post.updatedAt);
  const categoryDisplayName = post.category?.name;
  const categorySlug = categoryDisplayName ? getSlugFromDisplayName(categoryDisplayName) : undefined;
  // const tagSlug = post.tags?.name;

  // 左側のメインコンテンツ（記事本体）を定義
  const leftContent = (
    // const leftContent = (
    <article className="bg-main p-4 sm:p-8 rounded-2xl shadow-md">
      {/* パンくずリスト */}
      <div className="flex justify-between items-center">
        <nav className="text-sm font-bold text-sub-text mb-4" aria-label="breadcrumb">
          <ol className="flex space-x-2">
            <li>
              <Link href="/" className="hover:underline mr-5">
                ホーム
              </Link>
            </li>
            {/* ★修正: categorySlug が存在する場合のみリンクを生成 */}
            {post.category && categorySlug && ( // categorySlug が取得できた場合のみリンク表示
              <>
                <li>▶︎</li> {/* 区切り文字 */}
                <li>
                  <Link
                    href={`/posts/category/${categorySlug}`} // ★getSlugFromDisplayName で得たスラッグを使用
                    className="font-semibold hover:underline ml-5"
                  >
                    {post.category.name}
                  </Link>
                </li>
              </>
            )}
          </ol>
        </nav>

        <nav className="text-sm font-bold text-sub-text mb-4" aria-label="tags breadcrumb">
          <ol className="flex space-x-2 justify-end">
            {/* post.tags の最初の3つなど、表示数を制限することも検討 */}
            {/* {post.tags.slice(0, 3).map((tag, index) => ( // 例: 最大3つ表示 */}
            {post.tags && post.tags.length > 0 && post.tags.slice(0, 3).map((tag, index) => ( // 例: 最大3つ表示
              <React.Fragment key={tag.id}>
                {index > 0 && <li>▶︎</li>} {/* 最初のタグ以外は区切り文字を追加 */}
                <li>
                  {/* タグのスラッグ（tag.slug）を使ってリンクを生成 */}
                  {/* tag.slug は microCMS側で設定していることを前提とします */}
                  <Link href={`/posts/tag/${tag.slug}`} className="hover:underline">
                    {tag.name}
                  </Link>
                </li>
              </React.Fragment>
            ))}

          </ol>
        </nav>
      </div>

      {/* サムネイル */}
      {
        post.thumbnail && (
          <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.thumbnail.url}
              alt={`${post.title}のサムネイル`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>
        )
      }

      {/* タイトルと更新日 */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-main-text">{post.title}</h1>
        <p className="text-right text-sub-text mt-2">{updatedDate}</p>
      </div>

      {/* 記事の内容 */}
      <div
        className="prose max-w-none lg:prose-lg text-main-text"
        dangerouslySetInnerHTML={{ __html: cleanBody }}
      />
    </article >
  );

  // // 右側のサイドコンテンツを定義
  const rightContent = (
    // < className="sticky top-6 "> {/* 各カード間の余白 */}
    <div className="space-y-6 sticky top-6"> {/* 各カード間の余白 */}
      {/* 目次カード (記事コンテンツに応じて表示) */}
      <CardTableOfContents postContentHtml={cleanBody} />
      <CardAd />
      {/* <CardPopularPosts /> */}
      {/* <CardProfile /> */}
    </div>
  );

  return <TwoColumnLayout left={leftContent} right={rightContent} />;
}