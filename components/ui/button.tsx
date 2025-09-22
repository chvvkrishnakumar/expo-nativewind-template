import * as React from "react";
import { Pressable, type PressableProps, Platform } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils/cn";
import { TextClassContext } from "./utils/text-context";

/**
 * Button Component
 * 
 * A versatile button component with multiple variants and sizes.
 * Automatically adapts to iOS (TouchableOpacity behavior) and Android (Ripple effect).
 * 
 * @example
 * ```tsx
 * // Default button
 * <Button onPress={handlePress}>
 *   <Text>Click me</Text>
 * </Button>
 * 
 * // With variant
 * <Button variant="destructive" size="lg">
 *   <Text>Delete</Text>
 * </Button>
 * 
 * // With icon
 * <Button variant="outline" size="icon">
 *   <SettingsIcon className="h-5 w-5" />
 * </Button>
 * ```
 */

const buttonVariants = cva(
  "web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 group flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default:
          "web:hover:opacity-90 bg-primary active:opacity-90",
        destructive:
          "web:hover:opacity-90 bg-destructive active:opacity-90",
        outline:
          "web:hover:bg-accent web:hover:text-accent-foreground border border-input bg-background",
        secondary:
          "web:hover:opacity-80 bg-secondary active:opacity-80",
        ghost:
          "web:hover:bg-accent web:hover:text-accent-foreground",
        link: "web:underline-offset-4 web:hover:underline web:focus:underline",
      },
      size: {
        default: "native:h-12 native:px-5 native:py-3 h-10 px-4 py-2",
        sm: "native:h-10 native:px-4 native:py-2 h-9 rounded-md px-3",
        lg: "native:h-14 native:px-8 native:py-4 h-11 rounded-md px-8",
        icon: "native:h-12 native:w-12 h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const buttonTextVariants = cva("web:transition-colors text-sm font-medium", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      destructive: "text-destructive-foreground",
      outline: "group-active:text-accent-foreground text-foreground",
      secondary: "text-secondary-foreground",
      ghost: "group-active:text-accent-foreground text-foreground",
      link: "text-primary group-active:underline",
    },
    size: {
      default: "",
      sm: "",
      lg: "native:text-base",
      icon: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ButtonProps
  extends PressableProps,
    VariantProps<typeof buttonVariants> {
  textClass?: string;
}

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ className, textClass, variant, size, ...props }, ref) => {
  // Platform-specific feedback
  const androidRipple = Platform.select({
    android: {
      android_ripple: {
        color: variant === "destructive" ? "rgba(239, 68, 68, 0.3)" : "rgba(99, 102, 241, 0.3)",
        borderless: false,
      },
    },
    default: {},
  });

  return (
    <TextClassContext.Provider
      value={cn(
        buttonTextVariants({ variant, size }),
        textClass
      )}
    >
      <Pressable
        className={cn(
          props.disabled && "opacity-50 web:pointer-events-none",
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        role="button"
        {...androidRipple}
        style={({ pressed }) => [
          Platform.OS === "ios" && pressed && { opacity: 0.7 },
        ]}
        {...props}
      />
    </TextClassContext.Provider>
  );
});
Button.displayName = "Button";

export { Button, buttonVariants, buttonTextVariants };
export type { ButtonProps };