import CardRow from "@/components/ui/CardRow";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ListType = "now_playing" | "popular" | "top_rated" | "upcoming";
type RowMovie = { id: number | string; title: string; poster: string };

const API = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p/w342";

const SECTIONS: { type: ListType; title: string }[] = [
  { type: "now_playing", title: "Ahora en cines" },
  { type: "popular", title: "Populares" },
  { type: "top_rated", title: "Mejores calificadas" },
  { type: "upcoming", title: "Próximamente en cines" },
];

export default function AllMoviesScreen() {
  const [data, setData] = useState<Partial<Record<ListType, RowMovie[]>>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.EXPO_PUBLIC_TMDB_KEY;

  useEffect(() => {
    let cancel = false;

    async function fetchList(t: ListType): Promise<RowMovie[]> {
      const url = `${API}/movie/${t}?language=es-ES&page=1&region=AR&api_key=${apiKey}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`TMDB ${res.status}`);
      const json = await res.json();
      return (json?.results ?? [])
        .filter((m: any) => !!m.poster_path)
        .map((m: any) => ({
          id: m.id,
          title: m.title ?? m.name ?? "",
          poster: `${IMG}${m.poster_path}`,
        }));
    }

    (async () => {
      try {
        if (!apiKey) throw new Error("Falta EXPO_PUBLIC_TMDB_KEY");
        setLoading(true);
        const results = await Promise.all(
          SECTIONS.map((s) => fetchList(s.type))
        );
        if (cancel) return;
        const acc: Partial<Record<ListType, RowMovie[]>> = {};
        SECTIONS.forEach((s, i) => (acc[s.type] = results[i]));
        setData(acc);
      } catch (e: any) {
        if (!cancel) setError(e?.message ?? "Error");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();

    return () => {
      cancel = true;
    };
  }, [apiKey]);

  return (
    <LinearGradient
      colors={["#EF4444", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {error ? (
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <Text style={{ color: "#fff" }}>{error}</Text>
          </View>
        ) : loading ? (
          <View style={{ paddingVertical: 28 }}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <SafeAreaView>
            {SECTIONS.map((s) =>
              (data[s.type]?.length ?? 0) > 0 ? (
                <View key={s.type} style={{ marginTop: 16 }}>
                  <CardRow
                    title={s.title}
                    data={data[s.type]!}
                    onPressItem={(m) =>
                      router.push({
                        pathname: "/(drawer)/movie/[id]",
                        params: { id: String(m.id) },
                      })
                    }
                  />
                </View>
              ) : null
            )}
          </SafeAreaView>
        )}
      </ScrollView>
    </LinearGradient>
  );
}
