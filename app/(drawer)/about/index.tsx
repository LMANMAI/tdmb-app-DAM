import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Platform, ScrollView, Text, View } from "react-native";

export default function AboutScreen() {
  const osName = Platform.OS === "ios" ? "iOS" : "Android";
  const version =
    Constants?.expoConfig?.version ||
    process.env.EXPO_PUBLIC_APP_VERSION ||
    "10.0.5";

  return (
    <LinearGradient
      colors={["#EF4444", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 24,
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: "center", marginTop: 24 }}>
          <Image
            source={require("@/assets/hero.png")}
            style={{ width: 260, height: 260 }}
            resizeMode="contain"
          />
        </View>

        <Text
          style={{
            color: "#000",
            fontSize: 22,
            fontWeight: "500",
            marginTop: -8,
          }}
        >
          Joyts
        </Text>
        <Text
          style={{
            color: "#000",
            fontSize: 18,
            marginTop: 4,
          }}
        >
          Portal de Películas
        </Text>

        <View
          style={{ marginTop: 24, alignItems: "center", paddingHorizontal: 24 }}
        >
          <Text
            style={{
              color: "#111",
              opacity: 0.9,
              fontSize: 14,
              marginBottom: 8,
            }}
          >
            Joyts para {osName}
          </Text>

          <Text
            style={{
              color: "#111",
              opacity: 0.9,
              fontSize: 14,
              marginBottom: 16,
            }}
          >
            {version}
          </Text>

          <Text
            style={{
              color: "#111",
              opacity: 0.9,
              fontSize: 13,
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            Copyright © 2025 · Joyts Inc.
          </Text>

          <Text
            style={{
              color: "#111",
              opacity: 0.9,
              fontSize: 13,
              textAlign: "center",
            }}
          >
            Av. Caseros 3069, Piso 3
          </Text>
          <Text
            style={{
              color: "#111",
              opacity: 0.9,
              fontSize: 13,
              textAlign: "center",
              marginTop: 4,
            }}
          >
            CP 1264, Parque Patricios, CABA, Argentina
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
