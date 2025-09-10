import * as React from "react";
import { Pressable, View, type PressableProps, Platform } from "react-native";
import { cn } from "./utils/cn";
import { CheckIcon } from "./lib/icons";

interface CheckboxProps extends Omit<PressableProps, "onPress"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  CheckboxProps
>(({ className, checked = false, onCheckedChange, disabled, ...props }, ref) => {
  const handlePress = React.useCallback(() => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(!checked);
    }
  }, [checked, onCheckedChange, disabled]);

  // Android ripple effect
  const androidRipple = Platform.select({
    android: {
      android_ripple: {
        color: "rgba(99, 102, 241, 0.3)",
        borderless: false,
      },
    },
    default: {},
  });

  return (
    <Pressable
      ref={ref}
      className={cn(
        "native:h-6 native:w-6 h-4 w-4 shrink-0 rounded-sm border-2 ring-offset-background",
        "web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
        disabled && "cursor-not-allowed opacity-50",
        checked ? "bg-primary border-primary" : "border-input bg-background",
        className
      )}
      onPress={handlePress}
      accessible={true}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      {...androidRipple}
      style={({ pressed }) => [
        Platform.OS === "ios" && pressed && { opacity: 0.7 },
      ]}
      {...props}
    >
      {checked && (
        <View className="flex items-center justify-center">
          <CheckIcon className="h-4 w-4 text-primary-foreground" />
        </View>
      )}
    </Pressable>
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };