// src/app/page.tsx (ホーム画面)

import { getLatestPosts, getPopularPosts } from '@/lib/posts';
import HomePageLayout from '@/components/HomePageLayout'; // 新しく作成したレイアウトコンポーネントをインポート
import { CATEGORY_NAMES } from '@/constants/categories';

export default async function HomePage() {
  // サーバーサイドでデータをフェッチ
  const latestPosts = await getLatestPosts(4); // 最新記事を3つ取得
  const popularPosts = await getPopularPosts(4); // 人気記事を3つ取得
  const categories = CATEGORY_NAMES; // 全カテゴリを取得

  return (
    // HomePageLayoutにフェッチしたデータを渡してレンダリング
    <HomePageLayout
      latestPosts={latestPosts}
      popularPosts={popularPosts}
      categories={categories}
    />
  );
}
