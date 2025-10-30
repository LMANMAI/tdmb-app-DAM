import { router } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";
import MovieCard from "./MovieCard";

type Movie = {
  id: string | number;
  title: string;
  poster: any;
};

type Props = {
  title: string;
  data: Movie[];
  onPressItem?: (m: Movie) => void;
  titleVariant?: "dark" | "light";
  itemSpacing?: number;
};

export default function CardRow({
  title,
  data,
  onPressItem,
  titleVariant = "dark",
  itemSpacing = 12,
}: Props) {
  const titleClass =
    titleVariant === "light"
      ? "text-white text-2xl font-extrabold mb-3 px-4"
      : "text-base font-semibold text-neutral-900 mb-3 px-4";

  const handlePress =
    onPressItem ??
    ((m: Movie) =>
      router.push({
        pathname: "/(drawer)/movie/[id]",
        params: { id: String(m.id) },
      }));

  return (
    <View className="mt-6">
      <Text className={titleClass}>{title}</Text>

      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => String(item.id)}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <MovieCard movie={item} onPress={handlePress} />
        )}
        ItemSeparatorComponent={() => <View style={{ width: itemSpacing }} />}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ListEmptyComponent={
          <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
            <Text
              style={{
                color: titleVariant === "light" ? "#fff" : "#111827",
                opacity: 0.8,
              }}
            >
              Sin resultados para esta categoría.
            </Text>
          </View>
        }
        decelerationRate="fast"
      />
    </View>
  );
}
