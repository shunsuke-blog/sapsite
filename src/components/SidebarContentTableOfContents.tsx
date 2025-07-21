// src/components/SidebarContentTableOfContents.tsx
'use client'; // クライアントコンポーネント

import React, { useEffect, useState } from 'react';

interface SidebarContentTableOfContentsProps {
  postContentHtml: string; // サニタイズされたHTML文字列
}

export default function SidebarContentTableOfContents({ postContentHtml }: SidebarContentTableOfContentsProps) {
  const [headings, setHeadings] = useState<{ id: string; text: string; tag: string }[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(postContentHtml, 'text/html');
    const headingElements = doc.querySelectorAll('h2, h3, h4'); // 必要に応じてタグを追加

    const extractedHeadings = Array.from(headingElements).map((el) => {
      // IDがなければ生成して付与
      const id = el.id || el.textContent?.trim().replace(/\s+/g, '-').toLowerCase() || `heading-${Math.random().toString(36).substring(7)}`;
      el.id = id; // ページのHTMLに見出しIDを付与 (スクロール追従用)
      return {
        id: id,
        text: el.textContent || '',
        tag: el.tagName.toLowerCase(),
      };
    });
    setHeadings(extractedHeadings);

    // スクロール追従ロジック
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -70% 0px' } // 画面上部から70%のところで交差したと判定
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => {
      headingElements.forEach((el) => observer.unobserve(el));
    };
  }, [postContentHtml]);

  return (
    <div className="sticky top-2 p-6 rounded-2xl bg-main shadow-lg overflow-y-auto max-h-[calc(100vh-100px)]"> {/* stickyとmax-heightでスクロール追従と高さ制限 */}
      <h2 className="text-2xl font-bold mb-4 text-main-text">目次</h2>
      {headings.length > 0 ? (
        <nav>
          <ul className="list-disc pl-5">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={`${heading.tag === 'h3' ? 'ml-4' : ''} ${heading.tag === 'h4' ? 'ml-8' : ''} mb-2`}
              >
                <a
                  href={`#${heading.id}`}
                  className={`block text-brand-primary hover:underline ${activeId === heading.id ? 'font-bold text-accent-2' : ''}`}
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