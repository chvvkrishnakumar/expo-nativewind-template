import * as React from "react";
import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils/cn";
import { TextClassContext } from "./utils/text-context";

const textVariants = cva("text-base text-foreground", {
  variants: {
    variant: {
      h1: "web:select-text text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "web:select-text text-3xl font-semibold tracking-tight",
      h3: "web:select-text text-2xl font-semibold tracking-tight",
      h4: "web:select-text text-xl font-semibold tracking-tight",
      h5: "web:select-text text-lg font-semibold tracking-tight",
      h6: "web:select-text text-base font-semibold",
      p: "web:select-text leading-7",
      blockquote: "web:select-text mt-6 border-l-2 pl-6 italic",
      code: "web:select-text relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      lead: "web:select-text text-xl text-muted-foreground",
      large: "web:select-text text-lg font-semibold",
      small: "web:select-text text-sm font-medium leading-none",
      muted: "web:select-text text-sm text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

interface TextProps extends RNTextProps, VariantProps<typeof textVariants> {}

const Text = React.forwardRef<React.ElementRef<typeof RNText>, TextProps>(
  ({ className, variant, ...props }, ref) => {
    const textClass = React.useContext(TextClassContext);
    
    return (
      <RNText
        className={cn(textVariants({ variant }), textClass, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

export { Text, textVariants };
export type { TextProps };