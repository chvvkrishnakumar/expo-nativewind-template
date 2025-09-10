import { Link, Stack } from "expo-router";
import { View } from "react-native";
import { Text, Button, SafeAreaView } from "@/components/ui";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center p-5">
          <Text variant="h1" className="mb-4">404</Text>
          <Text variant="h3" className="mb-2">Page not found</Text>
          <Text variant="muted" className="text-center mb-8">
            This screen does not exist.
          </Text>
          <Link href="/" asChild>
            <Button variant="default">
              <Text>Go to home screen</Text>
            </Button>
          </Link>
        </View>
      </SafeAreaView>
    </>
  );
}