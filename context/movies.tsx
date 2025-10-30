import React, { createContext, useContext, useState } from "react";
export type ListType = "popular" | "top_rated" | "upcoming" | "now_playing";
export const TITLES: Record<ListType, string> = {
  popular: "Populares",
  top_rated: "Mejores Calificadas",
  upcoming: "Próximamente en cines",
  now_playing: "Todas las películas",
};
const Ctx = createContext<{
  list: ListType;
  setList: (t: ListType) => void;
} | null>(null);
export function MoviesProvider({ children }: { children: React.ReactNode }) {
  const [list, setList] = useState<ListType>("popular");
  return <Ctx.Provider value={{ list, setList }}>{children}</Ctx.Provider>;
}
export function useMovies() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useMovies must be used within MoviesProvider");
  return c;
}
