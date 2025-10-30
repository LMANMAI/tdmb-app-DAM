import React from "react";
import { Image, Pressable, Text, View } from "react-native";

type Movie = {
  id: string | number;
  title: string;
  poster: string;
};

type Props = {
  movie: Movie;
  onPress?: (m: Movie) => void;
};

export default function MovieCard({ movie, onPress }: Props) {
  return (
    <Pressable
      onPress={() => onPress?.(movie)}
      className="w-36 mr-4"
      style={{ overflow: "hidden" }}
    >
      <Image
        source={
          typeof movie.poster === "string"
            ? { uri: movie.poster }
            : movie.poster
        }
        className="w-36 h-56 rounded-2xl"
        resizeMode="cover"
      />
      <View className="mt-2">
        <Text
          numberOfLines={1}
          className="text-sm font-medium text-neutral-800"
        >
          {movie.title}
        </Text>
      </View>
    </Pressable>
  );
}
