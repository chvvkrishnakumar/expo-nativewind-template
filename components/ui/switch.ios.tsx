import * as React from "react";
import { Switch as RNSwitch, type SwitchProps as RNSwitchProps } from "react-native";
import { useColorScheme } from "./utils/use-color-scheme";

interface SwitchProps extends Omit<RNSwitchProps, "value" | "onValueChange"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof RNSwitch>,
  SwitchProps
>(({ checked = false, onCheckedChange, disabled, ...props }, ref) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <RNSwitch
      ref={ref}
      value={checked}
      onValueChange={onCheckedChange}
      disabled={disabled}
      // iOS specific colors
      trackColor={{
        false: isDark ? "#374151" : "#e5e7eb",
        true: isDark ? "#4f46e5" : "#6366f1",
      }}
      thumbColor={isDark ? "#f3f4f6" : "#ffffff"}
      ios_backgroundColor={isDark ? "#374151" : "#e5e7eb"}
      {...props}
    />
  );
});
Switch.displayName = "Switch";

export { Switch };