// src/app/posts/_components/PostCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types/post'; // Post型をインポート
import { formatDate } from '@/lib/utils'; // 日付フォーマット関数をインポート

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <li className="bg-main rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group aspect-square flex flex-col">
      {/* <Link href={`/posts/${post.slug}`} className="h-full flex flex-col"> */}
      <Link href={`/posts/${post.id}`} className="h-full flex flex-col">
        {/* サムネイル表示エリア */}
        <div className="relative w-full h-3/5 rounded-t-2xl overflow-hidden">
          {post.thumbnail ? (
            <Image
              src={post.thumbnail.url}
              alt={`${post.title}のサムネイル`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            // サムネイルがない場合のプレースホルダー
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-sm rounded-t-2xl">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-4 4 4 4-4V5h-2a1 1 0 100 2h2v6z" clipRule="evenodd"></path></svg>
            </div>
          )}
        </div>

        {/* タイトルと日付表示エリア */}
        <div className="p-1 flex flex-col flex-grow mt-1 mx-2">
          <h3 className="text-xl font-bold text-main-text group-hover:text-brand-primary transition-colors flex-grow leading-tight line-clamp-2">
            {post.title}
          </h3>

          <div className="flex justify-between items-center text-sm text-sub-text mt-1 mb-2">
            {post.category && (
              <p className="text-left">
                {post.category.name}
              </p>
            )}
            <p className="text-right">
              更新日: {formatDate(post.updatedAt)}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}