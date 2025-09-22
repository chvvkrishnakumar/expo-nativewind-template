import * as React from "react";
import { 
  SafeAreaView as RNSafeAreaView,
  type SafeAreaViewProps as RNSafeAreaViewProps 
} from "react-native-safe-area-context";
import { cn } from "./utils/cn";

interface SafeAreaViewProps extends RNSafeAreaViewProps {
  className?: string;
}

const SafeAreaView = React.forwardRef<
  React.ElementRef<typeof RNSafeAreaView>,
  SafeAreaViewProps
>(({ className, edges = ["top", "bottom"], mode = "padding", ...props }, ref) => {
  return (
    <RNSafeAreaView
      ref={ref}
      edges={edges}
      mode={mode}
      className={cn("flex-1 bg-background", className)}
      {...props}
    />
  );
});
SafeAreaView.displayName = "SafeAreaView";

export { SafeAreaView };
export type { SafeAreaViewProps };