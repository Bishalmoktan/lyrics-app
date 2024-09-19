import { redis } from "./redis";

export const cacheKey = (prefix: string, id: string) =>
  `${prefix}:${id}`;

export const paginatedCacheKey = (
  prefix: string,
  page: number,
  pageSize: number
) => `${prefix}:page:${page}:size:${pageSize}`;

export const deletePaginatedSongCache = async () => {
  try {
    const keys = await redis.keys(`*:page:*`);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.log("Error deleting song cache:", error);
  }
};

export const deleteSongDetail = async () => {
  try {
    const keys = await redis.keys(`song:*`);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.log("Error deleting song cache:", error);
  }
}

