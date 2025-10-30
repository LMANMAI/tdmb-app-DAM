const API = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p";
const KEY = process.env.EXPO_PUBLIC_TMDB_KEY!;

const fetchJSON = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB ${res.status}`);
  return res.json();
};

export type ListType = "popular" | "top_rated" | "upcoming" | "now_playing";

export const tmdb = {
  list: (t: ListType, page = 1, lang = "es-ES", region = "AR") =>
    fetchJSON(
      `${API}/movie/${t}?language=${lang}&region=${region}&page=${page}&api_key=${KEY}`
    ),
  detail: (id: string | number, lang = "es-ES") =>
    fetchJSON(`${API}/movie/${id}?language=${lang}&api_key=${KEY}`),
  images: (id: string | number) =>
    fetchJSON(
      `${API}/movie/${id}/images?include_image_language=es,en,null&api_key=${KEY}`
    ),
  img: (w: "w342" | "w500" | "w780", path: string) => `${IMG}/${w}${path}`,
};
