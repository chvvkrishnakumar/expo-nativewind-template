import * as React from "react";
import { Pressable as RNPressable, type PressableProps as RNPressableProps } from "react-native";
import { cn } from "./utils/cn";

export interface PressableProps extends RNPressableProps {
  className?: string;
}

const Pressable = React.forwardRef<RNPressable, PressableProps>(
  ({ className, style, ...props }, ref) => {
    return (
      <RNPressable
        ref={ref}
        className={cn(className)}
        style={style}
        {...props}
      />
    );
  }
);

Pressable.displayName = "Pressable";

export { Pressable };