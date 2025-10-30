import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

type MovieDetail = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
  genres?: { id: number; name: string }[];
  budget?: number;
};

const API = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p/w500";

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const apiKey = process.env.EXPO_PUBLIC_TMDB_KEY;

  const [data, setData] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        if (!apiKey) throw new Error("Falta EXPO_PUBLIC_TMDB_KEY");
        const res = await fetch(
          `${API}/movie/${id}?language=es-ES&api_key=${apiKey}`
        );
        if (!res.ok) throw new Error(`TMDB ${res.status}`);
        const json = (await res.json()) as MovieDetail;
        if (!cancel) setData(json);
      } catch (e: any) {
        if (!cancel) setErr(e?.message ?? "Error");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, [id, apiKey]);

  const genres =
    data?.genres && data.genres.length > 0
      ? data.genres.map((g) => g.name).join(", ")
      : "-";

  const rating =
    typeof data?.vote_average === "number" ? data.vote_average.toFixed(3) : "-";

  const budget =
    typeof data?.budget === "number"
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(data.budget)
      : "US$0.00";
  const posterSource = data?.poster_path
    ? { uri: `${IMG}${data.poster_path}` }
    : require("@/assets/hero.png");

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Pressable
        onPress={() => router.back()}
        style={{
          position: "absolute",
          zIndex: 10,
          top: 16,
          left: 12,
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: "rgba(255,255,255,0.9)",
          alignItems: "center",
          justifyContent: "center",
          elevation: 2,
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
        }}
      >
        <Ionicons name="arrow-back" size={20} color="#111" />
      </Pressable>

      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : err ? (
        <View style={{ padding: 16 }}>
          <Text>{err}</Text>
        </View>
      ) : !data ? (
        <View style={{ padding: 16 }}>
          <Text>Sin datos.</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          {/* Poster grande */}
          <Image
            source={posterSource}
            resizeMode="cover"
            style={{
              width: "100%",
              height: 420,
            }}
          />

          {/* Tarjeta blanca con info (superpuesta sutil al poster) */}
          <View
            style={{
              marginTop: -16,
              backgroundColor: "#fff",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              paddingHorizontal: 16,
              paddingTop: 16,
            }}
          >
            {/* Títulos */}
            <Text
              style={{
                color: "#6b7280",
                fontSize: 13,
                marginBottom: 4,
              }}
              numberOfLines={2}
            >
              {data.original_title}
            </Text>

            <Text
              style={{
                color: "#111827",
                fontSize: 20,
                fontWeight: "700",
                marginBottom: 12,
              }}
              numberOfLines={3}
            >
              {data.title}
            </Text>

            {/* Calificación */}
            <Text style={{ color: "#111827", marginBottom: 8 }}>
              <Text style={{ fontWeight: "600" }}>Calificación:</Text> {rating}
            </Text>

            {/* Género */}
            <Text style={{ color: "#111827", marginBottom: 8 }}>
              <Text style={{ fontWeight: "600" }}>Género:</Text> {genres}
            </Text>

            {/* Sinopsis */}
            <Text style={{ color: "#111827", marginTop: 8, marginBottom: 12 }}>
              <Text style={{ fontWeight: "600" }}>Sinopsis</Text>
              {"\n"}
              {data.overview || "-"}
            </Text>

            {/* Presupuesto */}
            <Text style={{ color: "#111827", marginTop: 4 }}>
              <Text style={{ fontWeight: "700" }}>Presupuesto: </Text>
              {budget}
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
