import ActionButton from "@/components/ui/ActionButton";
import CardRow from "@/components/ui/CardRow";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

import { router } from "expo-router";
import { TITLES, useMovies } from "../../../context/movies";

type RowMovie = { id: number | string; title: string; poster: string };

const IMG = "https://image.tmdb.org/t/p/w342";
const API = "https://api.themoviedb.org/3";

export default function HomeScreen() {
  const { list, setList } = useMovies();
  const [items, setItems] = useState<RowMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.EXPO_PUBLIC_TMDB_KEY;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const url = `${API}/movie/${list}?language=es-ES&page=1&region=AR&api_key=${apiKey}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`TMDB ${res.status}`);
        const json = await res.json();

        if (!cancelled) {
          const mapped: RowMovie[] = (json?.results ?? [])
            .filter((m: any) => !!m.poster_path)
            .map((m: any) => ({
              id: m.id,
              title: m.title ?? m.name ?? "",
              poster: `${IMG}${m.poster_path}`,
            }));

          setItems(mapped);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (!apiKey) {
      setError("Falta EXPO_PUBLIC_TMDB_KEY");
      setItems([]);
      return;
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [list, apiKey]);

  const isActive = (t: typeof list) => list === t;

  return (
    <LinearGradient
      colors={["#EF4444", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", marginTop: 24 }}>
          <Image
            source={require("@/assets/hero.png")}
            style={{ width: 280, height: 280 }}
            resizeMode="contain"
          />
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
          <View
            style={{
              borderRadius: 16,
              overflow: "hidden",
              padding: 6,
            }}
          >
            <View style={{ flexDirection: "row", gap: 12, marginBottom: 12 }}>
              <View
                style={{ flex: 1, opacity: isActive("popular") ? 1 : 0.85 }}
              >
                <ActionButton
                  label="Populares"
                  icon={
                    <MaterialIcons name="grid-view" size={20} color="#fff" />
                  }
                  onPress={() => setList("popular")}
                />
              </View>

              <View
                style={{ flex: 1, opacity: isActive("top_rated") ? 1 : 0.85 }}
              >
                <ActionButton
                  label="Mejores calificadas"
                  icon={<Feather name="thumbs-up" size={20} color="#fff" />}
                  onPress={() => setList("top_rated")}
                />
              </View>
            </View>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <View
                style={{ flex: 1, opacity: isActive("upcoming") ? 1 : 0.85 }}
              >
                <ActionButton
                  label="Próximamente en cines"
                  icon={
                    <MaterialCommunityIcons
                      name="calendar-month-outline"
                      size={20}
                      color="#fff"
                    />
                  }
                  onPress={() => setList("upcoming")}
                />
              </View>

              <View
                style={{ flex: 1, opacity: isActive("now_playing") ? 1 : 0.85 }}
              >
                <ActionButton
                  label="Todas las películas"
                  icon={
                    <MaterialCommunityIcons
                      name="ticket-outline"
                      size={20}
                      color="#fff"
                    />
                  }
                  onPress={() => router.push("/(drawer)/all-movies")}
                />
              </View>
            </View>
          </View>
        </View>

        {error ? (
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <Text style={{ color: "#fff" }}>{error}</Text>
          </View>
        ) : loading ? (
          <View style={{ paddingVertical: 24 }}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <View style={{ marginTop: 24, paddingBottom: 24 }}>
            <CardRow
              title={TITLES[list]}
              data={items}
              onPressItem={(m) =>
                router.push({
                  pathname: "/(drawer)/movie/[id]",
                  params: { id: String(m.id) },
                })
              }
            />
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}
