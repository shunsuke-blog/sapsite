// src/components/sidebar-cards/CardPopularPosts.tsx
import Link from 'next/link';
import Image from 'next/image';
import { getPopularPosts } from '@/lib/posts'; // 人気記事取得関数をインポート

export default async function CardPopularPosts() {
  const popularPosts = await getPopularPosts(5); // 人気記事を5件取得

  if (popularPosts.length === 0) {
    return null; // 記事がない場合は何も表示しない
  }

  return (
    <div className="p-6 rounded-2xl bg-main shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-main-text">人気の記事</h3>
      <ul>
        {popularPosts.map((post) => (
          <li key={post.id} className="mb-4 last:mb-0">
            <Link href={`/posts/${post.id}`} className="block hover:opacity-75 transition-opacity">
              {post.thumbnail && (
                <div className="relative w-full h-24 mb-2 rounded overflow-hidden">
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
  );
}