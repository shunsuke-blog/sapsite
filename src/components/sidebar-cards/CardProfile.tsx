// src/components/sidebar-cards/CardProfile.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function CardProfile() {
  return (
    <div className="p-6 rounded-2xl bg-main shadow-lg text-center">
      <h3 className="text-xl font-bold mb-4 text-main-text">著者プロフィール</h3>
      <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-brand-primary">
        <Image
          src="/images/profile-icon.png" // プロフィール画像のパス
          alt="著者アイコン"
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>
      <p className="font-semibold text-lg text-main-text mb-2">よしのん</p>
      <p className="text-sub-text text-sm mb-4">SAPエンジニア。ブログではSAPやWeb開発に関する情報を発信しています。</p>
      <Link href="/about" className="text-brand-primary hover:underline text-sm font-medium">
        詳細プロフィール &rarr;
      </Link>
    </div>
  );
}