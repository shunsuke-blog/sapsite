// src/components/sidebar-cards/CardAd.tsx
import Image from 'next/image';
import Link from 'next/link';

// 広告はクライアントサイドの追跡が不要であればサーバーコンポーネント
export default function CardAd() {
  return (
    <div className="p-6 rounded-2xl bg-main shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-main-text">PR: おすすめサービス</h3>
      <Link href="/ad-landing-page" className="block hover:opacity-80 transition-opacity">
        <div className="relative w-full aspect-video rounded-md overflow-hidden mb-2">
          <Image
            src="/images/ad-banner-example.jpg" // 広告画像のパス
            alt="おすすめサービス広告"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="rounded"
          />
        </div>
        <p className="text-sub-text text-sm leading-tight">
          ここに広告のキャッチコピーや簡単な説明が入ります。
        </p>
      </Link>
    </div>
  );
}