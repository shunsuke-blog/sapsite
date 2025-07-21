// src/components/sidebar-cards/CardTableOfContents.tsx
'use client'; // DOM操作のためクライアントコンポーネント

import React, { useEffect, useState } from 'react';
// ... (他のインポート)

interface CardTableOfContentsProps {
  postContentHtml: string; // 目次生成元のHTML
}

export default function CardTableOfContents({ postContentHtml }: CardTableOfContentsProps) {
  const [headings, setHeadings] = useState<{ id: string; text: string; tag: string }[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    // ... 目次生成ロジックと IntersectionObserver ロジック
    // （以前の SidebarContentTableOfContents.tsx の内容をそのまま移植）
    const parser = new DOMParser();
    const doc = parser.parseFromString(postContentHtml, 'text/html');
    const headingElements = doc.querySelectorAll('h1, h2, h3, h4'); // h1も含む

    const extractedHeadings = Array.from(headingElements).map((el) => {
      const id = el.id || el.textContent?.trim().replace(/\s+/g, '-').toLowerCase() || `heading-${Math.random().toString(36).substring(7)}`;
      el.id = id;
      return { id, text: el.textContent || '', tag: el.tagName.toLowerCase() };
    });
    setHeadings(extractedHeadings);

    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setActiveId(entry.target.id); }); },
      { rootMargin: '0px 0px -70% 0px' }
    );
    headingElements.forEach((el) => observer.observe(el));
    return () => { headingElements.forEach((el) => observer.unobserve(el)); };
  }, [postContentHtml]);

  return (
    <div className="sticky top-20 p-6 rounded-2xl bg-main shadow-lg overflow-y-auto max-h-[calc(100vh-100px)]">
      <h3 className="text-2xl font-bold mb-4 text-main-text">目次</h3>
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