import * as React from "react";
import { TextInput, type TextInputProps, Platform } from "react-native";
import { cn } from "./utils/cn";

interface InputProps extends TextInputProps {}

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  InputProps
>(({ className, placeholderClassName, style, ...props }, ref) => {
  // Android-specific styles
  const androidStyles = Platform.OS === 'android' ? {
    paddingVertical: 8,
    textAlignVertical: 'center' as const,
  } : {};

  return (
    <TextInput
      ref={ref}
      className={cn(
        "native:h-12 h-10 w-full rounded-md border-2 border-input bg-background px-3 text-base text-foreground placeholder:text-muted-foreground",
        "web:flex web:py-2 web:ring-offset-background file:border-0 file:bg-transparent file:font-medium",
        "web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
        "focus:border-primary",
        props.editable === false && "opacity-50 web:cursor-not-allowed",
        className
      )}
      placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
      placeholderTextColor="#9ca3af"
      selectionColor="#6366f1"
      underlineColorAndroid="transparent"
      style={[androidStyles, style]}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
export type { InputProps };