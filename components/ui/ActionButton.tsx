import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
};

export default function ActionButton({ label, icon, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 bg-[#EF4444]/70 rounded-full h-14 items-center justify-center padd"
      android_ripple={{ color: "#fff2" }}
      style={{ overflow: "hidden", flexDirection: "column", marginVertical: 5 }}
    >
      <View
        className="flex-column items-center"
        style={{ paddingVertical: 10 }}
      >
        {icon}
        <Text className="text-white font-semibold">{label}</Text>
      </View>
    </Pressable>
  );
}
