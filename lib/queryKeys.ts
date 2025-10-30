import type { ListType } from "./tmdb";
export const qk = {
  list: (t: ListType, page = 1) => ["movies", "list", t, page] as const,
  detail: (id: string | number) => ["movies", "detail", String(id)] as const,
  images: (id: string | number) => ["movies", "images", String(id)] as const,
};
