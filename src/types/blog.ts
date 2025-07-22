// src/types/blog.ts

import { Tag } from "./tag"; // 新しく定義した Tag 型をインポート

// サムネイルの型定義
type Thumbnail = {
  url: string;
  height: number;
  width: number;
};

// カテゴリの型定義
type Category = {
  id: string;
  name: string;
};

// Blogの型を更新: category と tags を追加
export type Blog = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  thumbnail?: Thumbnail;
  category?: Category;
  tags?: Tag[]; // ★追加: タグの配列
  slug: string;
  summary?: string; // 概要フィールドも追加しておくと良いでしょう
};
