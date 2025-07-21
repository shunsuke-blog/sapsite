// microCMSのサムネイル画像の型定義
export type Thumbnail = {
  url: string;
  height: number;
  width: number;
};

// microCMSのブログ記事の基本型
// microCMSから取得するフィールドに合わせて定義します
export type MicroCMSBlogContent = {
  id: string;
  title: string;
  body: string; // 記事本文
  category?: {
    // カテゴリはオブジェクトとして取得されることを想定
    id: string;
    name: string;
  };
  thumbnail?: Thumbnail;
  createdAt: string; // 作成日
  updatedAt: string; // 更新日
  publishedAt: string; // 公開日
  revisedAt: string; // 改訂日
};

// アプリケーション内で使用するブログ記事の型
// MicroCMSBlogContentに加えて、必要に応じて追加のプロパティを定義します
export type Post = MicroCMSBlogContent & {
  // 例: 人気記事のためにviews数を追加 (microCMSにviewsフィールドがない場合、
  // 取得後にアプリケーション側で計算・付与するか、モックデータで対応します)
  views?: number;
  // slug はIDまたはカスタムフィールドから生成されることを想定
  slug: string; // ★更新: URLパスや詳細ページ取得に使用する、記事のユニークID（content.idと同一）
};

// microCMSのAPI応答の型
export type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};
