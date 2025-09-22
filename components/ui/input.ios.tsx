import * as React from "react";
import { TextInput, type TextInputProps } from "react-native";
import { cn } from "./utils/cn";

interface InputProps extends TextInputProps {}

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  InputProps
>(({ className, placeholderClassName, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      className={cn(
        "native:h-14 h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground",
        "web:flex web:ring-offset-background file:border-0 file:bg-transparent file:font-medium",
        "web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
        props.editable === false && "opacity-50 web:cursor-not-allowed",
        className
      )}
      placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
      placeholderTextColor="#9ca3af"
      selectionColor="#3b82f6"
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
export type { InputProps };