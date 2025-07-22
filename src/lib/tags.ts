import { client } from "./microcms"; // microCMSクライアントをインポート
import { MicroCMSListResponse } from "microcms-js-sdk"; // microCMSのリストレスポンス型をインポート
import { Tag } from "@/types/tag"; // 定義した Tag 型をインポート

/**
 * microCMSからすべてのタグを取得する関数
 * @returns {Promise<Tag[]>} すべてのタグの配列
 */
export async function getAllTags(): Promise<Tag[]> {
  const allTags: Tag[] = [];
  let offset = 0;
  const limit = 100; // microCMSのAPIで一度に取得できる最大件数 (通常100)

  while (true) {
    const data: MicroCMSListResponse<Tag> = (await client.get({
      endpoint: "tags", // microCMSで作成したタグのAPI名
      queries: {
        offset: offset,
        limit: limit,
        fields: "id,name,slug", // 必要なフィールドのみを指定 (idとname)
      },
    })) as MicroCMSListResponse<Tag>;

    allTags.push(...data.contents);

    // 取得した件数がlimit未満であれば、もうデータはないのでループを終了
    if (data.contents.length < limit) {
      break;
    }

    offset += limit; // 次のオフセットを設定
  }

  return allTags;
}

/**
 * 特定のIDを持つタグを取得する関数 (必要であれば)
 * @param {string} id - タグのID
 * @returns {Promise<Tag | null>} 指定されたIDのタグ、またはnull
 */
export async function getTagById(id: string): Promise<Tag | null> {
  try {
    const tag: Tag = (await client.get({
      endpoint: "tags",
      contentId: id,
      queries: { fields: "id,name,slug" },
    })) as Tag;
    return tag;
  } catch (error) {
    console.error(`Failed to fetch tag with ID: ${id}`, error);
    return null;
  }
}

/**
 * 特定のスラッグ（名前）を持つタグを取得する関数 (必要であれば)
 * タグ名で検索したい場合に利用
 * @param {string} name - タグの名前
 * @returns {Promise<Tag | null>} 指定された名前のタグ、またはnull
 */
export async function getTagByName(name: string): Promise<Tag | null> {
  try {
    const data: MicroCMSListResponse<Tag> = (await client.get({
      endpoint: "tags",
      queries: {
        filters: `name[equals]${name}`, // タグ名でフィルタリング
        fields: "id,name,slug",
        limit: 1, // 1件のみ取得
      },
    })) as MicroCMSListResponse<Tag>;

    return data.contents.length > 0 ? data.contents[0] : null;
  } catch (error) {
    console.error(`Failed to fetch tag with name: ${name}`, error);
    return null;
  }
}
