// src/lib/microcms.ts
import { createClient } from "microcms-js-sdk";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

// 環境変数が存在するかチェックし、存在しない場合はエラーをスロー
if (!serviceDomain || !apiKey) {
  throw new Error(
    "microCMS serviceDomain and apiKey are required. Please check your .env.local file and restart the server."
  );
}

export const client = createClient({
  serviceDomain: serviceDomain,
  apiKey: apiKey,
});
