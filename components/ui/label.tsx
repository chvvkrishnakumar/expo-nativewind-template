import * as React from "react";
import { Pressable, type PressableProps } from "react-native";
import { TextClassContext } from "./utils/text-context";
import { cn } from "./utils/cn";

interface LabelProps extends PressableProps {
  textClass?: string;
}

const Label = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  LabelProps
>(({ className, textClass, ...props }, ref) => (
  <TextClassContext.Provider
    value={cn(
      "native:text-base text-sm font-medium text-foreground leading-none web:peer-disabled:cursor-not-allowed web:peer-disabled:opacity-70",
      textClass
    )}
  >
    <Pressable
      ref={ref}
      className={cn("disabled:cursor-not-allowed", className)}
      accessible={true}
      accessibilityRole="text"
      {...props}
    />
  </TextClassContext.Provider>
));
Label.displayName = "Label";

export { Label };