// src/app/posts/[slug]/page.tsx

import { client } from '@/lib/microcms';
import { notFound } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image'; // Imageコンポーネントをインポート
import Link from 'next/link'; // Linkコンポーネントをインポート (パンくずリスト用)
import { formatDate } from '@/lib/utils'; // 日付フォーマット関数をインポート
import TwoColumnLayout from '@/components/TwoColumnLayout';
import SidebarContentTableOfContents from '@/components/SidebarContentTableOfContents';
import { CATEGORY_SLUG_MAP } from '@/constants/categories';


// type Props = { params: { slug: string } };

interface BlogDetailPageProps {
  // params: {slug: string;};
  params: Promise<{ slug: string }>;
}

// サムネイルの型定義
type Thumbnail = {
  url: string;
  height: number;
  width: number;
};

// カテゴリの型定義を追加
type Category = {
  id: string;
  name: string;
};

// Blogの型を更新: category を追加
type Blog = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  thumbnail?: Thumbnail;
  category?: Category;
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

  // 左側のメインコンテンツ（記事本体）を定義
  const leftContent = (
    // const leftContent = (
    <article className="bg-main p-4 sm:p-8 rounded-2xl shadow-md">
      {/* パンくずリスト */}
      <nav className="text-sm font-bold text-sub-text mb-4" aria-label="breadcrumb">
        <ol className="flex space-x-2">
          <li>
            <Link href="/" className="hover:underline mr-5">
              ホーム
            </Link>
          </li>
          {post.category && (
            <>
              {/* <li>&gt;</li>  */}
              <li>▶︎</li> {/* 区切り文字 */}
              <li>
                {/* カテゴリページへのリンクがあれば、ここにLinkを追加 */}
                <Link href={`/posts/category/${CATEGORY_SLUG_MAP[post.category.name.toLowerCase()]}`}>
                  <span className="font-semibold hover:underline ml-5">{post.category.name}</span>
                </Link>
              </li>
            </>
          )}
          {/* 記事タイトルは、現在のページなのでリンクは不要 */}
          {/* <li>&gt;</li>
          <li>{post.title}</li> */}
        </ol>
      </nav>

      {/* サムネイル */}
      {post.thumbnail && (
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
      )}

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
    </article>
  );

  // // 右側のサイドコンテンツを定義
  const rightContent = (
    <SidebarContentTableOfContents postContentHtml={cleanBody} />
  );

  return <TwoColumnLayout left={leftContent} right={rightContent} />;
}