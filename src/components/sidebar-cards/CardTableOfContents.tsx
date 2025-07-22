// src/components/sidebar-cards/CardTableOfContents.tsx
'use client';

import React, { useEffect, useState, useRef } from 'react'; // useRef を追加
import Link from 'next/link'; // Link コンポーネントを使用する場合

interface CardTableOfContentsProps {
  postContentHtml: string; // 目次生成元のHTML
}

export default function CardTableOfContents({ postContentHtml }: CardTableOfContentsProps) {
  const [headings, setHeadings] = useState<{ id: string; text: string; tag: string }[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // IntersectionObserver を保持するための ref
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(postContentHtml, 'text/html');

    // h1, h2, h3 のすべての見出し要素を取得
    // 取得順序はDOMの出現順になる
    const allHeadingElements = doc.querySelectorAll('h1, h2, h3');

    const extractedHeadings: { id: string; text: string; tag: string }[] = [];
    allHeadingElements.forEach((el) => {
      // id がない場合は生成して設定
      const id = el.id || el.textContent?.trim().replace(/\s+/g, '-').toLowerCase().slice(0, 50) || `heading-${Math.random().toString(36).substring(7)}`;
      el.id = id; // 元のHTMLコンテンツのDOMにもIDを付与（重要）

      extractedHeadings.push({
        id,
        text: el.textContent || '',
        tag: el.tagName.toLowerCase(), // 例: 'h1', 'h2', 'h3'
      });
    });

    setHeadings(extractedHeadings);

    // IntersectionObserver の設定と監視
    // 既存の Observer があれば解除してから新しく作成
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let currentActiveId: string | null = null;
        // 上から下へ走査し、最初に見つかった交差している見出しをアクティブにする
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) { // 50%以上表示されたらアクティブ
            currentActiveId = entry.target.id;
            break; // 最初に見つかったものを採用
          }
        }
        if (currentActiveId) {
          setActiveId(currentActiveId);
        } else {
          // 現在アクティブな見出しがビューポート外に出た場合、
          // もしスクロール位置がドキュメントのトップであればnullにする
          // そうでなければ、最後にアクティブだったものを維持するか、
          // 次に見える見出しを探すなどのロジックを追加することも可能
          const firstHeading = extractedHeadings[0];
          if (firstHeading && window.scrollY < (document.getElementById(firstHeading.id)?.offsetTop || 0)) {
            setActiveId(null); // 最上部に戻ったらアクティブ解除
          }
        }
      },
      {
        rootMargin: '0px 0px -70% 0px', // ビューポート上部から70%のラインで見出しが通過したらアクティブ
        threshold: 0.5, // 要素の50%が見えたら発火
      }
    );

    // すべての見出し要素を監視対象に追加
    allHeadingElements.forEach((el) => observer.observe(el));
    observerRef.current = observer; // observer インスタンスを useRef に保存

    // クリーンアップ関数
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [postContentHtml]); // postContentHtml が変更されたら再実行

  return (
    <div className="p-6 rounded-2xl bg-main shadow-lg overflow-y-auto max-h-[calc(100vh-100px)]">
      <h3 className="text-2xl font-bold mb-4 text-main-text border-b border-main-text">目次</h3>
      {headings.length > 0 ? (
        <nav>
          <ul className="list-none pl-0"> {/* デフォルトのリストスタイルを解除 */}
            {headings.map((heading) => (
              <li
                key={heading.id}
                // タグの種類に応じてマージンを適用し、インデントを表現
                className={`${heading.tag === 'h2' ? 'ml-4' : ''} ${heading.tag === 'h3' ? 'ml-8' : ''} mb-1`}
              >
                <a
                  href={`#${heading.id}`}
                  // アクティブな見出しのスタイル変更
                  className={`block py-1 px-2 rounded-md text-brand-primary hover:bg-gray-100 hover:text-brand-dark transition-colors duration-200
                    ${activeId === heading.id ? 'font-bold text-accent-2 bg-brand-primary bg-opacity-10' : 'text-sub-text'}`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : (
        <p className="text-sub-text text-sm">目次はありません。</p>
      )}
    </div>
  );
}