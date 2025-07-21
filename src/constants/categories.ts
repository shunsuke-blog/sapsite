// src/constants/categories.ts

//大分類のマッピング
export const CATEGORY_SLUG_MAP: { [key: string]: string } = {
  intro: "SAP入門",
  dev: "SAP開発",
  func: "SAP機能",
  ope: "SAP運用",
  case: "SAP事例",
};

// 必要であれば、カテゴリのスラッグの配列もエクスポートしておくと便利です
export const CATEGORY_SLUGS = Object.keys(CATEGORY_SLUG_MAP);

// カテゴリ名の配列も
export const CATEGORY_NAMES = Object.values(CATEGORY_SLUG_MAP);

// 表示名からスラッグを取得する関数
export function getSlugFromDisplayName(
  displayName: string
): string | undefined {
  // CATEGORY_SLUG_MAP の値を検索し、一致するキー（スラッグ）を返す
  for (const slug in CATEGORY_SLUG_MAP) {
    if (CATEGORY_SLUG_MAP[slug] === displayName) {
      return slug;
    }
  }
  return undefined; // 見つからなかった場合
}
