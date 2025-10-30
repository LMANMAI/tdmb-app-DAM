import { qk } from "@/lib/queryKeys";
import { tmdb, type ListType } from "@/lib/tmdb";
import { useQuery } from "@tanstack/react-query";

export function useMoviesList(type: ListType) {
  return useQuery({
    queryKey: qk.list(type, 1),
    queryFn: () => tmdb.list(type),
    select: (json) =>
      (json?.results ?? [])
        .filter((m: any) => m.poster_path)
        .map((m: any) => ({
          id: m.id,
          title: m.title ?? m.name ?? "",
          poster: tmdb.img("w342", m.poster_path),
        })),
  });
}

export function useMovieDetail(id?: string) {
  return useQuery({
    queryKey: id ? qk.detail(id) : ["noop"],
    queryFn: () => tmdb.detail(id!),
    enabled: !!id,
  });
}

export function useMovieImages(id?: string) {
  return useQuery({
    queryKey: id ? qk.images(id) : ["noop"],
    queryFn: () => tmdb.images(id!),
    enabled: !!id,
    select: (img) => {
      const backs = (img?.backdrops ?? [])
        .filter((b: any) => b.file_path)
        .sort((a: any, b: any) => (b.width || 0) - (a.width || 0))
        .slice(0, 8)
        .map((b: any) => tmdb.img("w780", b.file_path));
      const posts = (img?.posters ?? [])
        .filter((p: any) => p.file_path)
        .slice(0, 6)
        .map((p: any) => tmdb.img("w500", p.file_path));
      return backs.length ? backs : posts;
    },
  });
}
