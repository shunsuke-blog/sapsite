// src/app/posts/latest/page.tsx

import { getLatestPosts } from '@/lib/posts';
import PostListSection from '@/app/posts/_components/PostListSection';
import TwoColumnLayout from '@/components/TwoColumnLayout';
import SidebarContentAds from '@/components/SidebarContentAds';

export default async function LatestPostsPage() {
  const latestPosts = await getLatestPosts(20); // 取得件数は調整

  if (!latestPosts || latestPosts.length === 0) {
    return <p className="text-sub-text text-center py-8">まだ最新記事がありません。</p>;
  }

  // return (
  const leftContent = (
    <>
      <h1 className="text-4xl font-extrabold mb-10 text-main-text border-b-4 border-brand-primary pb-4">
        最新記事一覧
      </h1>
      <PostListSection posts={latestPosts} />
      {/* 必要であれば、ここにページネーションなどのロジックを追加 */}
    </>
  );

  const rightContent = (
    <SidebarContentAds /> // 広告用のサイドバーコンポーネント
  );

  return (
    <TwoColumnLayout left={leftContent} right={rightContent} />
  );

}