import React, { Component, ReactNode } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { AlertCircleIcon, RefreshCwIcon, HomeIcon } from "@/components/ui/lib/icons";
import { router } from "expo-router";

interface Props {
  children: ReactNode;
  fallback?: (error: Error, resetError: () => void) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReload = () => {
    this.resetError();
    router.replace("/");
  };

  handleGoHome = () => {
    this.resetError();
    router.replace("/");
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error!, this.resetError);
      }

      return (
        <SafeAreaView className="flex-1 bg-background">
          <ScrollView 
            contentContainerClassName="flex-1 p-6"
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-1 items-center justify-center">
              <AlertCircleIcon className="w-20 h-20 text-destructive mb-6" />
              
              <Text variant="h2" className="text-center mb-4">
                Oops! Something went wrong
              </Text>
              
              <Text variant="p" className="text-center text-muted-foreground mb-8 max-w-xs">
                We encountered an unexpected error. Don&apos;t worry, you can try reloading the app or go back to home.
              </Text>

              <View className="gap-3 w-full max-w-xs">
                <Button
                  onPress={this.handleReload}
                  size="lg"
                  className="w-full"
                >
                  <RefreshCwIcon className="w-4 h-4 mr-2" />
                  <Text>Reload App</Text>
                </Button>

                <Button
                  onPress={this.handleGoHome}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  <HomeIcon className="w-4 h-4 mr-2" />
                  <Text>Go to Home</Text>
                </Button>
              </View>

              {__DEV__ && this.state.error && (
                <Pressable className="mt-8 p-4 bg-muted rounded-lg w-full max-w-sm">
                  <Text variant="small" className="font-semibold mb-2">
                    Error Details (Dev Only):
                  </Text>
                  <Text variant="code" className="text-xs text-destructive">
                    {this.state.error.message}
                  </Text>
                  {this.state.errorInfo && (
                    <Text variant="code" className="text-xs text-muted-foreground mt-2">
                      {this.state.errorInfo.componentStack?.slice(0, 200)}...
                    </Text>
                  )}
                </Pressable>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}