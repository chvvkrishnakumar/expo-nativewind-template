import * as React from "react";
import { 
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  type KeyboardAvoidingViewProps as RNKeyboardAvoidingViewProps,
  Platform
} from "react-native";
import { cn } from "./utils/cn";

interface KeyboardAvoidingViewProps extends Omit<RNKeyboardAvoidingViewProps, "behavior"> {
  behavior?: RNKeyboardAvoidingViewProps["behavior"];
}

const KeyboardAvoidingView = React.forwardRef<
  React.ElementRef<typeof RNKeyboardAvoidingView>,
  KeyboardAvoidingViewProps
>(({ className, behavior, ...props }, ref) => {
  // Platform-specific behavior
  const defaultBehavior = behavior || Platform.select({
    ios: "padding",
    android: "height",
    default: "padding",
  });

  return (
    <RNKeyboardAvoidingView
      ref={ref}
      behavior={defaultBehavior}
      className={cn("flex-1", className)}
      {...props}
    />
  );
});
KeyboardAvoidingView.displayName = "KeyboardAvoidingView";

export { KeyboardAvoidingView };
export type { KeyboardAvoidingViewProps };