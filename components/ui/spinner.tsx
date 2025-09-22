import * as React from "react";
import { ActivityIndicator, type ActivityIndicatorProps } from "react-native";
import { cn } from "./utils/cn";

export interface SpinnerProps extends ActivityIndicatorProps {
  className?: string;
  size?: "small" | "large";
}

const Spinner = React.forwardRef<ActivityIndicator, SpinnerProps>(
  ({ className, size = "large", color, ...props }, ref) => {
    return (
      <ActivityIndicator
        ref={ref}
        size={size}
        color={color}
        className={cn("text-primary", className)}
        {...props}
      />
    );
  }
);

Spinner.displayName = "Spinner";

export { Spinner };