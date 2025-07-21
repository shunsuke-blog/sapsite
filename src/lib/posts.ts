// src/lib/posts.ts

import { client } from "@/lib/microcms"; // microCMSクライアントをインポート
import { MicroCMSListResponse, MicroCMSBlogContent, Post } from "@/types/post";
import { slugify } from "@/lib/utils"; // スラグ生成ユーティリティをインポート

// microCMSから取得したデータをアプリケーションのPost型に変換するヘルパー関数
const transformMicroCMSContentToPost = (content: MicroCMSBlogContent): Post => {
  // const slug = slugify(content.title) || content.id;
  const slug = content.id;
  return {
    ...content,
    slug: slug,
    views: Math.floor(Math.random() * 500) + 50, // ダミーのviews数を付与 (実際はmicroCMSのフィールドか、アクセス解析から取得)
  };
};

/**
 * すべてのブログ記事を取得する関数
 * microCMSのAPI制限(limit: 100)に対応するため、複数回APIを呼び出す
 * @returns 全ブログ記事の配列
 */
export async function getAllPosts(): Promise<Post[]> {
  let allContents: MicroCMSBlogContent[] = [];
  let offset = 0;
  const limit = 100; // microCMSの最大取得件数

  try {
    while (true) {
      const data: MicroCMSListResponse<MicroCMSBlogContent> = await client.get({
        endpoint: "blogs",
        queries: {
          offset: offset,
          limit: limit,
          // 必要なフィールドのみを取得することで、記事本文の無駄な取得を防ぐ
          // 個別記事ページではbodyが必要なので、そこではfieldsを指定しないか、別途取得する
          fields:
            "id,title,category,thumbnail,createdAt,updatedAt,publishedAt,revisedAt,summary",
        },
      });

      allContents = allContents.concat(data.contents);

      if (allContents.length >= data.totalCount) {
        break;
      }
      offset += limit;
    }
    return allContents.map(transformMicroCMSContentToPost);
  } catch (error: unknown) {
    // ★ここを 'unknown' に変更
    console.error("Error fetching all posts from microCMS:", error);
    // errorがオブジェクトで、プロパティを持つ可能性があることを確認してからアクセス
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      "message" in error
    ) {
      console.error(
        "Error details:",
        (error as Error).name, // Error型にキャストしてnameとmessageにアクセス
        (error as Error).message
      );
    }
    return [];
  }
}

/**
 * 最新のブログ記事を指定された数だけ取得する関数
 * @param limit - 取得する記事の最大数
 * @returns 最新記事の配列
 */
export async function getLatestPosts(limit: number): Promise<Post[]> {
  const allPosts = await getAllPosts();

  return allPosts
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, limit);
}

/**
 * 人気のブログ記事を指定された数だけ取得する関数
 * @param limit - 取得する記事の最大数
 * @returns 人気記事の配列
 */
export async function getPopularPosts(limit: number): Promise<Post[]> {
  const allPosts = await getAllPosts();

  return allPosts
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, limit);
}

/**
 * 特定のスラグを持つブログ記事を取得する関数
 * @param slug - 記事のスラグ
 * @returns 該当する記事オブジェクト、見つからない場合はundefined
 */
export async function getPostBySlug(slug: string): Promise<Post | undefined> {

  const allPosts = await getAllPosts(); // このgetAllPostsはfieldsでbodyを除外している
  const foundPost = allPosts.find((post) => post.slug === slug);

  // もし個別記事でbodyが必要で、getAllPostsで取得できない場合は、ここで個別にAPIを叩く
  if (foundPost && !foundPost.body) {
    try {
      const data: MicroCMSBlogContent = await client.get({
        endpoint: "blogs",
        contentId: foundPost.id,
        // ここではbodyを含む全てのフィールドを取得
      });
      return transformMicroCMSContentToPost(data);
    } catch (error) {
      console.error(
        `Error fetching single post with ID ${foundPost.id}:`,
        error
      );
      return undefined;
    }
  }
  return foundPost;
}

/**
 * 特定のカテゴリに属する記事を取得する関数
 * @param categoryName - カテゴリ名
 * @returns 該当する記事の配列
 */
export async function getPostsByCategory(
  categoryName: string
): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.category?.name === categoryName);
}
