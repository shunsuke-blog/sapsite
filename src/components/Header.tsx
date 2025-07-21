// src/components/Header.tsx

'use client'
import Link from 'next/link'
import Image from 'next/image';

export default function Header() {

  return (
    <header className="top-0 z-50 shadow bg-accent-1">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="ロゴ画像"
            width={60}  // ロゴ画像の表示幅 (px)
            height={60} // ロゴ画像の表示高さ (px)
            priority // ホームページのロゴなので、引き続き優先的に読み込む
          />
        </Link>

        {/* SAP COMPASS を中央に寄せるための修正 */}
        <div className='flex-grow text-center font-bold text-main'>
          <span className="text-2xl">SAP COMPASS</span> {/* spanでラップして、必要に応じてサイズ調整 */}
        </div>
      </div>
    </header>
  )
}