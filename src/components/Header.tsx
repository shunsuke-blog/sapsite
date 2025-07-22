// src/components/Header.tsx

'use client' // 検索窓の入力状態管理やボタンクリックのために必要になる可能性あり

import Link from 'next/link'
import { useState } from 'react' // 検索窓の入力状態管理に使う（ハンバーガーメニューで使わないなら削除可能）
import Image from 'next/image';
import React from 'react';
import { FiSearch } from 'react-icons/fi'; // Feather Iconsの検索アイコンをインポート
import { MdSearch } from 'react-icons/md'; // Material Design Iconsの検索アイコンをインポート

export default function Header() {
  const [isOpen, setIsOpen] = useState(false); // ハンバーガーメニューが不要なら削除
  const [searchTerm, setSearchTerm] = useState(''); // 検索キーワードの状態

  // 検索処理のプレースホルダー
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // フォーム送信のデフォルト動作を防ぐ
    if (searchTerm.trim()) {
      // ここに検索ページへの遷移ロジックなどを実装
      // 例: router.push(`/search?q=${searchTerm}`);
      console.log('Searching for:', searchTerm);
    }
  };

  return (
    <header className="top-0 z-50 shadow bg-accent-1">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">

        {/* ロゴ (左寄せ) */}
        <Link href="/" className="flex-shrink-0 flex items-center">
          <Image
            src="/images/logo.png"
            alt="ロゴ画像"
            width={60}
            height={60}
            priority
          />
        </Link>

        {/* SAP COMPASS を物理的な中央に寄せるための領域 */}
        <div className='flex-1 text-center font-bold text-main ml-auto mr-auto'>
          <span className="text-2xl">SAP COMPASS</span>
        </div>

        {/* 検索窓 (右端) */}
        {/* ロゴの幅 (60px) に合わせたスペースを確保し、その中に検索窓を配置 */}
        <div className="flex-shrink-0 w-[60px] flex items-center justify-end"> {/* w-[60px] でロゴと同じ幅を確保 */}
          <form onSubmit={handleSearch} className="flex items-center">
            {/* 検索アイコン */}
            <button type="submit" className="p-1">
              <MdSearch className="w-5 h-5 cursor-pointer" />
            </button>
            {/* 検索入力フィールド（普段は隠しておき、クリックで表示するなど、UIは工夫可能） */}
            {/* ここでは常に表示する例 */}
            <input
              type="text"
              placeholder="検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ml-2 w-full max-w-[calc(100vw-200px)] md:w-32 lg:w-40 px-2 py-1 border border-gray-300 rounded-md text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
            // placeholderのスタイルや入力欄の幅は調整してください
            // 例: md:w-0 md:focus:w-32 で普段は非表示、フォーカスで表示
            />
          </form>
        </div>

        {/* PCメニュー (コメントアウトされているが、もし使うならここ。検索窓との兼ね合いを考慮) */}
        {/* <nav className="hidden md:flex space-x-6">
          <Link href="/posts/latest" className="text-main hover:font-bold">最新記事</Link>
          <Link href="/posts/category/sap" className="text-main hover:font-bold">SAP</Link>
          <Link href="/posts/category/web-design" className="text-main hover:font-bold">Webサイト制作</Link>
        </nav> */}

        {/* ハンバーガーアイコン (コメントアウトされているが、もし使うならここ。検索窓と同時に表示するか考慮) */}
        {/* <button
          className="md:hidden text-main"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>*/}
      </div>

      {/* モバイルメニュー (コメントアウトされているが、もし使うならここ) */}
      {/* {isOpen && (
        <nav className="md:hidden px-4 pb-4 space-y-2">
          <Link href="/posts/latest" className="block text-main hover:font-bold">最新記事</Link>
          <Link href="/posts/category/sap" className="block text-main hover:font-bold">SAP</Link>
          <Link href="/posts/category/web-design" className="block text-main hover:font-bold">Webサイト制作</Link>
        </nav>
      )} */}
    </header>
  );
}