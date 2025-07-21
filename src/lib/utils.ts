// src/lib/utils.ts

/**
 * 日付文字列を「yyyy年mm月dd日」形式にフォーマットする関数
 * @param dateString - 日付文字列 (ISO 8601形式など)
 * @returns フォーマットされた日付文字列
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()は0から始まるため+1する
  const day = date.getDate();
  return `${year}/${month}/${day}`;
};

/**
 * 文字列をURLフレンドリーなスラグに変換する関数
 * (日本語のスラグ生成は複雑なため、ここではシンプルな例を示します。
 * 実際にはより堅牢なライブラリの使用を検討してください。)
 * @param title - 記事タイトル
 * @returns スラグ文字列
 */
export const slugify = (title: string): string => {
  // 簡単なスラグ化の例: スペースをハイフンに、特殊文字を除去
  return title
    .toLowerCase()
    .replace(/\s+/g, "-") // スペースをハイフンに
    .replace(/[^\w-]+/g, "") // 英数字、ハイフン以外を除去
    .replace(/--+/g, "-") // 連続するハイフンを一つに
    .replace(/^-+|-+$/g, ""); // 先頭と末尾のハイフンを除去
};
