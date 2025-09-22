import React from "react";
import { View, Pressable, Alert } from "react-native";
import * as Clipboard from "expo-clipboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerItem,
  DrawerSeparator,
  DrawerTitle,
  DrawerTrigger,
  HomeIcon,
  SafeAreaView,
  ScrollView,
  SettingsIcon,
  Text,
  UserIcon,
  BellIcon,
} from "@/components/ui";
import { Menu } from "lucide-react-native";
import { iconWithClassName } from "@/components/ui/lib/icons/icon-with-classname";
import { useRouter } from "expo-router";

const MenuIcon = iconWithClassName(Menu);

export default function MenuDemo() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [position, setPosition] = React.useState<"left" | "right">("left");
  const router = useRouter();

  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      {/* Header with Hamburger Menu */}
      <View className="flex-row items-center justify-between p-4 border-b border-border bg-background">
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} side={position}>
          <DrawerTrigger asChild>
            <Pressable className="p-2">
              <MenuIcon className="h-6 w-6 text-foreground" />
            </Pressable>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                <Text variant="h4">Navigation Menu</Text>
              </DrawerTitle>
            </DrawerHeader>

            <DrawerItem
              icon={<HomeIcon className="h-5 w-5 text-foreground" />}
              onPress={() => router.push("/")}
            >
              <Text>Home</Text>
            </DrawerItem>

            <DrawerItem
              icon={<UserIcon className="h-5 w-5 text-foreground" />}
              onPress={() => {
                /* Navigate to profile */
              }}
            >
              <Text>Profile</Text>
            </DrawerItem>

            <DrawerItem
              icon={<BellIcon className="h-5 w-5 text-foreground" />}
              onPress={() => {
                /* Navigate to notifications */
              }}
            >
              <Text>Notifications</Text>
            </DrawerItem>

            <DrawerSeparator />

            <DrawerItem
              icon={<SettingsIcon className="h-5 w-5 text-foreground" />}
              onPress={() => {
                /* Navigate to settings */
              }}
            >
              <Text>Settings</Text>
            </DrawerItem>
          </DrawerContent>
        </Drawer>

        <Text variant="h6" className="font-semibold">
          Menu Demo
        </Text>

        {/* Spacer for balance */}
        <View className="w-10" />
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1 p-4">
        <Text variant="h1" className="mb-8 text-center">
          Hamburger Menu Demo
        </Text>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              <Text variant="h3">How it works</Text>
            </CardTitle>
            <CardDescription>
              <Text variant="muted">
                The hamburger menu is positioned absolutely and won&apos;t
                interfere with your layout
              </Text>
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-3">
            <Text>• Tap the hamburger icon to open the menu</Text>
            <Text>• Swipe from the edge or tap outside to close</Text>
            <Text>• Menu items navigate or trigger actions</Text>
            <Text>• Can be positioned top-left or top-right</Text>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              <Text variant="h3">Position Options</Text>
            </CardTitle>
          </CardHeader>
          <CardContent className="gap-4">
            <View className="flex-row gap-4">
              <Pressable
                className={`flex-1 p-4 rounded-lg border-2 ${position === "left" ? "border-primary bg-primary/10" : "border-muted"}`}
                onPress={() => setPosition("left")}
              >
                <Text className="text-center font-medium">Left Side</Text>
              </Pressable>
              <Pressable
                className={`flex-1 p-4 rounded-lg border-2 ${position === "right" ? "border-primary bg-primary/10" : "border-muted"}`}
                onPress={() => setPosition("right")}
              >
                <Text className="text-center font-medium">Right Side</Text>
              </Pressable>
            </View>
            <Text
              variant="small"
              className="text-center mt-2 text-muted-foreground"
            >
              Drawer opens from: {position}
            </Text>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Text variant="h3">Implementation</Text>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Pressable
              className="bg-muted p-4 rounded-lg"
              onPress={async () => {
                const code = `import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui";
import { Menu } from "lucide-react-native";

<SafeAreaView className="flex-1">
  {/* Header */}
  <View className="flex-row items-center justify-between p-4 border-b border-border">
    <Drawer open={open} onOpenChange={setOpen} side="${position}">
      <DrawerTrigger asChild>
        <Pressable className="p-2">
          <Menu className="h-6 w-6 text-foreground" />
        </Pressable>
      </DrawerTrigger>
      <DrawerContent>
        {/* Menu items */}
      </DrawerContent>
    </Drawer>
    
    <Text variant="h6">My App</Text>
    <View className="w-10" />
  </View>
  
  {/* Your content */}
  <ScrollView className="flex-1">
    {/* Content */}
  </ScrollView>
</SafeAreaView>`;
                await Clipboard.setStringAsync(code);
                Alert.alert("Copied!", "Code example copied to clipboard");
              }}
            >
              <Text variant="code" className="text-xs">
                Tap to copy example
              </Text>
            </Pressable>
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
