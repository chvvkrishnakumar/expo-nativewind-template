import * as React from "react";
import { Pressable, View, type PressableProps } from "react-native";
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

  return (
    <Pressable
      ref={ref}
      className={cn(
        "h-5 w-5 shrink-0 rounded border-2 ring-offset-background",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        disabled && "cursor-not-allowed opacity-50",
        checked ? "bg-primary border-primary" : "border-muted-foreground bg-background",
        className
      )}
      onPress={handlePress}
      accessible={true}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      style={({ pressed }) => [
        pressed && { opacity: 0.7 }
      ]}
      {...props}
    >
      {checked && (
        <View className="flex items-center justify-center">
          <CheckIcon className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={3} />
        </View>
      )}
    </Pressable>
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };