import { queryClient } from "@/lib/queryClient";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  type DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { QueryClientProvider } from "@tanstack/react-query";
import { Drawer } from "expo-router/drawer";
import { Pressable, Text, View } from "react-native";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { MoviesProvider, useMovies, type ListType } from "../../context/movies";

function NavItem({
  label,
  icon,
  active,
  onPress,
}: {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        borderRadius: 999,
        marginVertical: 6,
        marginHorizontal: 12,
        paddingVertical: 12,
        paddingHorizontal: 14,
        backgroundColor: active ? "#FEE2E2" : "transparent",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
      }}
    >
      <View
        style={{
          width: 22,
          alignItems: "center",
        }}
      >
        {icon}
      </View>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "600",
          color: active ? "#EF4444" : "#6B7280",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { navigation, state } = props;
  const { list, setList } = useMovies();

  const current = state.routeNames[state.index];
  const goHome = () => {
    navigation.navigate("home/index" as never);
    navigation.closeDrawer();
  };
  const goAbout = () => {
    navigation.navigate("about/index" as never);
    navigation.closeDrawer();
  };

  const go = (route: "home/index" | "all-movies/index" | "about/index") => {
    navigation.navigate(route as never);
    navigation.closeDrawer();
  };

  const setAndGo = (t: ListType) => {
    setList(t);
    goHome();
  };

  return (
    <DrawerContentScrollView
      {...(props as any)}
      contentContainerStyle={{ paddingTop: 0 }}
    >
      <SafeAreaView edges={["top", "left", "right"]}>
        <View
          style={{
            backgroundColor: "#FFE4E6",
            marginHorizontal: 12,
            marginTop: 12,
            marginBottom: 6,
            padding: 16,
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: 56,
              height: 56,
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="videocam" size={28} color="#EF4444" />
          </View>
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#EF4444" }}>
            Joyts
          </Text>
        </View>
      </SafeAreaView>

      <NavItem
        label="Inicio"
        icon={
          <Ionicons
            name="home-outline"
            size={20}
            color={current === "home/index" ? "#EF4444" : "#6B7280"}
          />
        }
        active={current === "home/index"}
        onPress={goHome}
      />
      <NavItem
        label="Populares"
        icon={
          <MaterialIcons
            name="grid-view"
            size={20}
            color={
              current === "home/index" && list === "popular"
                ? "#EF4444"
                : "#6B7280"
            }
          />
        }
        active={current === "home/index" && list === "popular"}
        onPress={() => setAndGo("popular")}
      />
      <NavItem
        label="Mejores calificadas"
        icon={
          <Feather
            name="thumbs-up"
            size={20}
            color={
              current === "home/index" && list === "top_rated"
                ? "#EF4444"
                : "#6B7280"
            }
          />
        }
        active={current === "home/index" && list === "top_rated"}
        onPress={() => setAndGo("top_rated")}
      />
      <NavItem
        label="Próximamente en cines"
        icon={
          <MaterialCommunityIcons
            name="calendar-month-outline"
            size={20}
            color={
              current === "home/index" && list === "upcoming"
                ? "#EF4444"
                : "#6B7280"
            }
          />
        }
        active={current === "home/index" && list === "upcoming"}
        onPress={() => setAndGo("upcoming")}
      />
      <NavItem
        label="Todas las películas"
        icon={
          <MaterialCommunityIcons
            name="ticket-outline"
            size={20}
            color={current === "all-movies/index" ? "#EF4444" : "#6B7280"}
          />
        }
        active={current === "all-movies/index"}
        onPress={() => go("all-movies/index")}
      />
      <NavItem
        label="Acerca de Joyts"
        icon={
          <Ionicons
            name="information-circle-outline"
            size={20}
            color={current === "about/index" ? "#EF4444" : "#6B7280"}
          />
        }
        active={current === "about/index"}
        onPress={goAbout}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <MoviesProvider>
        <Drawer
          screenOptions={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "transparent" },

            drawerType: "front",
            overlayColor: "rgba(0,0,0,0.25)",
            drawerStyle: {
              width: 300,
              backgroundColor: "#fff",
              borderTopRightRadius: 28,
              borderBottomRightRadius: 28,
            },
          }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="home/index"
            options={{
              title: "Inicio",
              drawerItemStyle: { display: "none" },
            }}
          />
          <Drawer.Screen
            name="about/index"
            options={{
              title: "Acerca de Joyts",
              drawerItemStyle: { display: "none" },
            }}
          />
          <Drawer.Screen
            name="all-movies/index"
            options={{
              title: "Todas las películas",
              drawerItemStyle: { display: "none" },
            }}
          />
          <Drawer.Screen
            name="movie/[id]"
            options={{
              headerShown: false,
              drawerItemStyle: { display: "none" },
            }}
          />
        </Drawer>
      </MoviesProvider>
    </QueryClientProvider>
  );
}
