// src/app/posts/popular/page.tsx

import { getPopularPosts } from '@/lib/posts';
import PostListSection from '@/app/posts/_components/PostListSection';
import TwoColumnLayout from '@/components/TwoColumnLayout';
import SidebarContentAds from '@/components/SidebarContentAds';

export default async function PopularPostsPage() {
  const popularPosts = await getPopularPosts(20); // 取得件数は調整

  if (!popularPosts || popularPosts.length === 0) {
    return <p className="text-sub-text text-center py-8">まだ人気記事がありません。</p>;
  }

  const leftContent = (
    <>
      <h1 className="text-4xl font-extrabold mb-10 text-main-text border-b-4 border-brand-primary pb-4">
        人気記事一覧
      </h1>
      <PostListSection posts={popularPosts} />
    </>
  );

  const rightContent = (
    <SidebarContentAds /> // 広告用のサイドバーコンポーネント
  );

  return (
    <TwoColumnLayout left={leftContent} right={rightContent} />
  );
}