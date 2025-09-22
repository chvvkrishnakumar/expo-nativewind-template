import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={22} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="menu-demo"
        options={{
          title: "Menu",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={22} name="menucard" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="permissions-demo"
        options={{
          title: "Permissions",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={22} name="checkmark.shield.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="error-demo"
        options={{
          title: "Errors",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={22} name="exclamationmark.triangle.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
