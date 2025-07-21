// src/app/posts/_components/PostListSection.tsx

import PostCard from './PostCard';
import { Post } from '@/types/post'; // Post型をインポート

interface PostListSectionProps {
  posts: Post[];
}

export default function PostListSection({ posts }: PostListSectionProps) {
  if (!posts || posts.length === 0) {
    return <p className="text-sub-text text-center py-8">まだ記事がありません。</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {
        posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))
      }
    </div>
  );
}
