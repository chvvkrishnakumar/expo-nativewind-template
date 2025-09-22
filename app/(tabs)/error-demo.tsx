import React, { useState } from "react";
import { View } from "react-native";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  SafeAreaView,
  ScrollView,
  Text,
} from "@/components/ui";
import { NetworkError, GeneralError } from "@/components/error-boundary";
import { useNetworkConnection } from "@/hooks/useNetworkConnection";

export default function ErrorDemo() {
  const [showNetworkError, setShowNetworkError] = useState(false);
  const [showGeneralError, setShowGeneralError] = useState(false);
  const [throwError, setThrowError] = useState(false);
  const { isConnected, isInternetReachable, type, checkConnection } =
    useNetworkConnection();

  if (throwError) {
    throw new Error("This is a test error to demonstrate the Error Boundary!");
  }

  if (showNetworkError) {
    return (
      <NetworkError
        onRetry={() => setShowNetworkError(false)}
        message="This is a demo of the network error screen. In a real app, this would show when there's no internet connection."
      />
    );
  }

  if (showGeneralError) {
    return (
      <GeneralError
        title="Demo Error"
        message="This is a demo of a general error screen. You can customize the title and message."
        onRetry={() => setShowGeneralError(false)}
        retryText="Close Error"
      />
    );
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <ScrollView className="flex-1" contentContainerClassName="p-4">
        <Text variant="h1" className="mb-4">
          Error Handling Demo
        </Text>

        {/* Network Status Card */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>
              <Text variant="h3">Network Status</Text>
            </CardTitle>
            <CardDescription>
              <Text>Monitor your connection status</Text>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <View className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text>Connection Status:</Text>
                <View className="flex-row items-center gap-2">
                  <View
                    className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}
                  />
                  <Text
                    className={isConnected ? "text-green-600" : "text-red-600"}
                  >
                    {isConnected ? "Connected" : "Disconnected"}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center justify-between">
                <Text>Internet Access:</Text>
                <View className="flex-row items-center gap-2">
                  <View
                    className={`w-3 h-3 rounded-full ${isInternetReachable ? "bg-green-500" : "bg-orange-500"}`}
                  />
                  <Text
                    className={
                      isInternetReachable ? "text-green-600" : "text-orange-600"
                    }
                  >
                    {isInternetReachable ? "Available" : "No Internet"}
                  </Text>
                </View>
              </View>
              {type && (
                <View className="flex-row items-center justify-between">
                  <Text>Network Type:</Text>
                  <Text className="text-muted-foreground">{type}</Text>
                </View>
              )}
              <Button
                onPress={async () => {
                  await checkConnection();
                }}
                variant="outline"
                size="sm"
              >
                <Text>Refresh Status</Text>
              </Button>
            </View>
          </CardContent>
        </Card>

        {/* Error Demos */}
        <Text variant="h2" className="mb-4">
          Error Screens
        </Text>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>
              <Text variant="h3">Network Error Demo</Text>
            </CardTitle>
            <CardDescription>
              <Text>Shows when there&apos;s no internet connection</Text>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onPress={() => setShowNetworkError(true)}>
              <Text>Show Network Error</Text>
            </Button>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>
              <Text variant="h3">General Error Demo</Text>
            </CardTitle>
            <CardDescription>
              <Text>Shows for generic application errors</Text>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onPress={() => setShowGeneralError(true)}
              variant="secondary"
            >
              <Text>Show General Error</Text>
            </Button>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>
              <Text variant="h3">Error Boundary Demo</Text>
            </CardTitle>
            <CardDescription>
              <Text>Catches JavaScript errors in component tree</Text>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Text variant="small" className="mb-4 text-destructive">
              ⚠️ This will crash the screen and show the error boundary
            </Text>
            <Button onPress={() => setThrowError(true)} variant="destructive">
              <Text>Trigger Error Boundary</Text>
            </Button>
          </CardContent>
        </Card>

        {/* Usage Examples */}
        <Text variant="h2" className="mb-4">
          Usage Examples
        </Text>

        <Card>
          <CardHeader>
            <CardTitle>
              <Text variant="h3">Implementation Guide</Text>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text variant="small" className="mb-3">
              <Text className="font-semibold">
                1. Error Boundary (Already integrated in root):
              </Text>
            </Text>
            <View className="bg-muted p-3 rounded-md mb-4">
              <Text variant="code" className="text-xs">
                {`// Automatically catches all errors
// Already wrapped in app/_layout.tsx
<ErrorBoundary>
  <YourApp />
</ErrorBoundary>`}
              </Text>
            </View>

            <Text variant="small" className="mb-3">
              <Text className="font-semibold">2. Network Error Handling:</Text>
            </Text>
            <View className="bg-muted p-3 rounded-md mb-4">
              <Text variant="code" className="text-xs">
                {`import { useIsOnline } from '@/hooks/useNetworkConnection';
import { NetworkError } from '@/components/error-boundary';

function MyScreen() {
  const isOnline = useIsOnline();
  
  if (!isOnline) {
    return <NetworkError onRetry={refetch} />;
  }
  
  return <YourContent />;
}`}
              </Text>
            </View>

            <Text variant="small" className="mb-3">
              <Text className="font-semibold">3. Custom Error States:</Text>
            </Text>
            <View className="bg-muted p-3 rounded-md">
              <Text variant="code" className="text-xs">
                {`import { GeneralError } from '@/components/error-boundary';

if (error) {
  return (
    <GeneralError
      title="Failed to load data"
      message={error.message}
      onRetry={handleRetry}
    />
  );
}`}
              </Text>
            </View>
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
