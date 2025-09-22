import React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { WifiOffIcon, RefreshCwIcon } from "@/components/ui/lib/icons";

interface NetworkErrorProps {
  onRetry?: () => void;
  message?: string;
}

export function NetworkError({ onRetry, message }: NetworkErrorProps) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView 
        contentContainerClassName="flex-1 p-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 items-center justify-center">
          <WifiOffIcon className="w-20 h-20 text-muted-foreground mb-6" />
          
          <Text variant="h2" className="text-center mb-4">
            No Internet Connection
          </Text>
          
          <Text variant="p" className="text-center text-muted-foreground mb-8 max-w-xs">
            {message || "Please check your internet connection and try again. Make sure you're connected to WiFi or mobile data."}
          </Text>

          {onRetry && (
            <Button
              onPress={onRetry}
              size="lg"
              className="w-full max-w-xs"
            >
              <RefreshCwIcon className="w-4 h-4 mr-2" />
              <Text>Try Again</Text>
            </Button>
          )}

          <View className="mt-12 p-4 bg-muted rounded-lg w-full max-w-xs">
            <Text variant="small" className="font-semibold mb-2">
              Troubleshooting Tips:
            </Text>
            <View className="gap-2">
              <Text variant="small" className="text-muted-foreground">
                • Check if airplane mode is off
              </Text>
              <Text variant="small" className="text-muted-foreground">
                • Verify WiFi or mobile data is enabled
              </Text>
              <Text variant="small" className="text-muted-foreground">
                • Try restarting your device
              </Text>
              <Text variant="small" className="text-muted-foreground">
                • Move closer to your router
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}