import * as React from "react";
import { 
  Platform, 
  Switch as RNSwitch, 
  type SwitchProps as RNSwitchProps,
  Pressable,
  View,
  type PressableProps 
} from "react-native";
import { cn } from "./utils/cn";
import { useColorScheme } from "./utils/use-color-scheme";

interface SwitchProps extends Omit<PressableProps, "onPress"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const Switch = React.forwardRef<
  any,
  SwitchProps
>(({ className, checked = false, onCheckedChange, disabled, children, ...props }, ref) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Use native Switch on Android, custom on Web
  if (Platform.OS === "android") {
    // Extract only valid Switch props
    const { style, ...validSwitchProps } = props as any;
    return (
      <RNSwitch
        ref={ref}
        value={checked}
        onValueChange={onCheckedChange}
        disabled={disabled}
        trackColor={{
          false: isDark ? "#374151" : "#e5e7eb",
          true: isDark ? "#6366f1" : "#4f46e5",
        }}
        thumbColor={checked ? (isDark ? "#f3f4f6" : "#ffffff") : (isDark ? "#9ca3af" : "#d1d5db")}
        style={style}
      />
    );
  }

  // Web implementation
  const handlePress = React.useCallback(() => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(!checked);
    }
  }, [checked, onCheckedChange, disabled]);

  return (
    <Pressable
      ref={ref}
      className={cn(
        "flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        disabled && "cursor-not-allowed opacity-50",
        checked ? "bg-primary" : "bg-input",
        className
      )}
      onPress={handlePress}
      accessible={true}
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled }}
      {...props}
    >
      <View
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-sm transition-transform",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </Pressable>
  );
});
Switch.displayName = "Switch";

export { Switch };