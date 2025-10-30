import React from "react";
import { Image, Pressable, View } from "react-native";

type Movie = { id: string | number; title: string; poster: string };
type Props = {
  movie: Movie;
  onPress?: (m: Movie) => void;
  width?: number;
  height?: number;
};

export default function MovieCard({
  movie,
  onPress,
  width = 144,
  height = 224,
}: Props) {
  return (
    <Pressable
      onPress={() => onPress?.(movie)}
      style={{ width, overflow: "hidden" }}
    >
      <Image
        source={
          typeof movie.poster === "string"
            ? { uri: movie.poster }
            : (movie.poster as any)
        }
        style={{ width, height, borderRadius: 16 }}
        resizeMode="cover"
      />
      <View style={{ marginTop: 8 }}>
        {/* <Text
          numberOfLines={1}
          style={{ fontSize: 14, fontWeight: "600", color: "#1f2937" }}
        >
          {movie.title}
        </Text> */}
      </View>
    </Pressable>
  );
}
