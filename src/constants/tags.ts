// src/constants/tag.ts

//小分類のマッピング
export const TAG_SLUG_MAP: { [key: string]: string } = {
  intro: "SAP入門",
  dev: "SAP開発",
  func: "SAP機能",
  ope: "SAP運用",
  case: "SAP事例",
};

// 表示名からスラッグを取得する関数
export function getSlugFromDisplayTagName(
  displayName: string
): string | undefined {
  // CATEGORY_SLUG_MAP の値を検索し、一致するキー（スラッグ）を返す
  for (const slug in TAG_SLUG_MAP) {
    if (TAG_SLUG_MAP[slug] === displayName) {
      return slug;
    }
  }
  return undefined; // 見つからなかった場合
}

export type Tag = {
  id: string;
  name: string;
};
