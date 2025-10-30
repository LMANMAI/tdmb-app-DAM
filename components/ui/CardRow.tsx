import { router } from "expo-router";
import React, { useMemo } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import MovieCard from "./MovieCard";

type Movie = { id: string | number; title: string; poster: any };
type Props = {
  title: string;
  data: Movie[];
  onPressItem?: (m: Movie) => void;
  titleVariant?: "dark" | "light";
  itemSpacing?: number;
  useCarousel?: boolean;
};

const RATIO = 224 / 144;

export default function CardRow({
  title,
  data,
  onPressItem,
  titleVariant = "dark",
  itemSpacing = 12,
  useCarousel = true,
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

  const { width: winW } = useWindowDimensions();
  const H_PADDING = 16;
  const GAP = itemSpacing;
  const usableW = winW - H_PADDING * 2;

  const PER_PAGE = winW >= 768 ? 3 : 2;

  const ITEM_W = Math.floor((usableW - GAP * (PER_PAGE - 1)) / PER_PAGE);
  const ITEM_H = Math.round(ITEM_W * RATIO);

  const pages = useMemo(() => {
    const out: Movie[][] = [];
    for (let i = 0; i < data.length; i += PER_PAGE) {
      out.push(data.slice(i, i + PER_PAGE));
    }
    return out;
  }, [data, PER_PAGE]);

  return (
    <View className="mt-6">
      <Text
        className={titleClass}
        style={{
          color: "#fff",
          fontSize: 22,
          fontWeight: "800",
          textAlign: "center",
          textShadowColor: "rgba(0,0,0,0.18)",
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 2,
        }}
      >
        {title}
      </Text>

      {useCarousel ? (
        <Carousel
          width={winW}
          height={ITEM_H + 40}
          data={pages}
          loop={false}
          pagingEnabled
          style={{ width: winW }}
          renderItem={({ item: page }) => (
            <View
              style={{
                width: winW,
                paddingHorizontal: H_PADDING,
                flexDirection: "row",
              }}
            >
              {page.map((m, i) => (
                <View
                  key={String(m.id)}
                  style={{
                    width: ITEM_W,
                    marginRight: i < page.length - 1 ? GAP : 0,
                  }}
                >
                  <MovieCard
                    movie={m}
                    onPress={handlePress}
                    width={ITEM_W}
                    height={ITEM_H}
                  />
                </View>
              ))}
            </View>
          )}
        />
      ) : (
        <View />
      )}
    </View>
  );
}
