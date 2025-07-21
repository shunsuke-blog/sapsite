// src/constants/categories.ts

//カテゴリ名のマッピング
export const CATEGORY_SLUG_MAP: { [key: string]: string } = {
  sap: "SAP",
  abap: "ABAP",
  fi: "FI",
  // 他のカテゴリがあればここに追加
  // 例: 'web-design': 'Webデザイン',
};

// 必要であれば、カテゴリのスラッグの配列もエクスポートしておくと便利です
export const CATEGORY_SLUGS = Object.keys(CATEGORY_SLUG_MAP);

// カテゴリ名の配列も
export const CATEGORY_NAMES = Object.values(CATEGORY_SLUG_MAP);
