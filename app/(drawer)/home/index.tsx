import ActionButton from "@/components/ui/ActionButton";
import CardRow from "@/components/ui/CardRow";
import { TITLES, useMovies } from "@/context/movies";
import { useMoviesList } from "@/hooks/useTMDB";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  const { list, setList } = useMovies();
  const { data, isLoading, error } = useMoviesList(list);

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
        <View style={{ alignItems: "center", marginTop: 24 }}>
          <Image
            source={require("@/assets/hero.png")}
            style={{ width: 280, height: 280 }}
            resizeMode="contain"
          />
        </View>

        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
          <View
            style={{
              backgroundColor: "rgba(255,192,203,0.25)",
              borderRadius: 16,
              padding: 12,
            }}
          >
            <View style={{ flexDirection: "row", gap: 12, marginBottom: 12 }}>
              <ActionButton
                label="Populares"
                icon={<MaterialIcons name="grid-view" size={20} color="#fff" />}
                onPress={() => setList("popular")}
              />
              <ActionButton
                label="Mejores calificadas"
                icon={<Feather name="thumbs-up" size={20} color="#fff" />}
                onPress={() => setList("top_rated")}
              />
            </View>
            <View style={{ flexDirection: "row", gap: 12 }}>
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

        <View style={{ marginTop: 12, paddingHorizontal: 16 }}>
          <Text
            style={{
              color: "#fff",
              fontSize: 22,
              fontWeight: "800",
              textAlign: "center",
            }}
          >
            {TITLES[list]}
          </Text>
        </View>

        {error ? (
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <Text style={{ color: "#fff" }}>{String(error)}</Text>
          </View>
        ) : isLoading ? (
          <View style={{ paddingVertical: 24 }}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <View style={{ marginTop: 12 }}>
            <CardRow title="" data={data ?? []} />
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}
