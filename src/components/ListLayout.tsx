import Link from 'next/link';
import PostListSection from '@/app/posts/_components/PostListSection';
import { Post } from '@/types/post'; // Post型をインポート

interface ListProps {
  latestPosts: Post[];
}

export default function List({ latestPosts }: ListProps) {
  return (
    <main className="container mx-auto p-4">
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-brand-primary border-b-2 border-brand-primary pb-2">記事一覧</h2>
        <PostListSection posts={latestPosts} />
      </section>
    </main>
  );
}
