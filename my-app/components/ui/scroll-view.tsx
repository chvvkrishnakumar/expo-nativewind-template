import * as React from "react";
import { 
  ScrollView as RNScrollView, 
  type ScrollViewProps as RNScrollViewProps,
  RefreshControl,
  Platform
} from "react-native";
import { cn } from "./utils/cn";

interface ScrollViewProps extends RNScrollViewProps {
  refreshing?: boolean;
  onRefresh?: () => void;
}

const ScrollView = React.forwardRef<
  React.ElementRef<typeof RNScrollView>,
  ScrollViewProps
>(({ className, contentContainerClassName, refreshing, onRefresh, ...props }, ref) => {
  // Platform-specific defaults
  const platformDefaults = Platform.select({
    ios: {
      bounces: true,
      showsVerticalScrollIndicator: false,
      overScrollMode: "always" as const,
    },
    android: {
      bounces: false,
      showsVerticalScrollIndicator: true,
      overScrollMode: "auto" as const,
    },
    default: {},
  });

  return (
    <RNScrollView
      ref={ref}
      className={cn("flex-1", className)}
      contentContainerClassName={cn("flex-grow", contentContainerClassName)}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing || false}
            onRefresh={onRefresh}
            tintColor="#6366f1"
            colors={["#6366f1"]} // Android
          />
        ) : undefined
      }
      {...platformDefaults}
      {...props}
    />
  );
});
ScrollView.displayName = "ScrollView";

export { ScrollView };
export type { ScrollViewProps };