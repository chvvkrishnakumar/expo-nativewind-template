import React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { AlertCircleIcon, HomeIcon } from "@/components/ui/lib/icons";
import { router } from "expo-router";

interface GeneralErrorProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  onRetry?: () => void;
  retryText?: string;
}

export function GeneralError({ 
  title = "Something went wrong",
  message = "We're having trouble loading this content. Please try again.",
  showHomeButton = true,
  onRetry,
  retryText = "Try Again"
}: GeneralErrorProps) {
  const handleGoHome = () => {
    router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView 
        contentContainerClassName="flex-1 p-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 items-center justify-center">
          <AlertCircleIcon className="w-20 h-20 text-muted-foreground mb-6" />
          
          <Text variant="h2" className="text-center mb-4">
            {title}
          </Text>
          
          <Text variant="p" className="text-center text-muted-foreground mb-8 max-w-xs">
            {message}
          </Text>

          <View className="gap-3 w-full max-w-xs">
            {onRetry && (
              <Button
                onPress={onRetry}
                size="lg"
                className="w-full"
              >
                <Text>{retryText}</Text>
              </Button>
            )}

            {showHomeButton && (
              <Button
                onPress={handleGoHome}
                variant={onRetry ? "outline" : "default"}
                size="lg"
                className="w-full"
              >
                <HomeIcon className="w-4 h-4 mr-2" />
                <Text>Go to Home</Text>
              </Button>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}