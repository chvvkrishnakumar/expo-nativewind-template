import * as React from "react";
import {
  Modal,
  Pressable,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { X } from "lucide-react-native";
import { iconWithClassName } from "./lib/icons/icon-with-classname";
import { cn } from "./utils/cn";

const XIcon = iconWithClassName(X);

interface SheetContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextType>({
  open: false,
  onOpenChange: () => {},
});

interface SheetProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Sheet = ({ children, open = false, onOpenChange = () => {} }: SheetProps) => {
  return (
    <SheetContext.Provider value={{ open, onOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
};

const SheetTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    asChild?: boolean;
  }
>(({ onPress, asChild, children, ...props }, ref) => {
  const { onOpenChange } = React.useContext(SheetContext);

  if (asChild && React.isValidElement(children)) {
    const childProps = children.props as any || {};
    return React.cloneElement(children, {
      ...childProps,
      onPress: (e: any) => {
        childProps?.onPress?.(e);
        onPress?.(e);
        onOpenChange(true);
      },
    } as any);
  }

  return (
    <Pressable
      ref={ref}
      onPress={(e) => {
        onPress?.(e);
        onOpenChange(true);
      }}
      {...props}
    >
      {children}
    </Pressable>
  );
});
SheetTrigger.displayName = "SheetTrigger";

interface SheetContentProps {
  children: React.ReactNode;
  className?: string;
  hideCloseButton?: boolean;
  snapPoints?: (string | number)[];
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof View>,
  SheetContentProps
>(({ children, className, hideCloseButton }, ref) => {
  const { open, onOpenChange } = React.useContext(SheetContext);
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={open}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={() => onOpenChange(false)}
    >
      <View className="flex-1 justify-end">
        <Pressable
          className="absolute inset-0 bg-foreground/50"
          onPress={() => onOpenChange(false)}
        />
        <View
          ref={ref}
          className={cn(
            "rounded-t-3xl border border-border bg-background px-4 pb-6 pt-4",
            className
          )}
          style={{
            maxHeight: height * 0.9,
            paddingBottom: insets.bottom,
          }}
        >
          <View className="mx-auto mb-4 h-1 w-9 rounded-full bg-muted-foreground" />
          {!hideCloseButton && (
            <Pressable
              onPress={() => onOpenChange(false)}
              className="absolute right-4 top-4 z-10 rounded-sm opacity-70"
            >
              <XIcon className="h-5 w-5 text-foreground" />
            </Pressable>
          )}
          {children}
        </View>
      </View>
    </Modal>
  );
});
SheetContent.displayName = "SheetContent";

const SheetHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("flex flex-col gap-1.5 pb-4", className)}
    {...props}
  />
));
SheetHeader.displayName = "SheetHeader";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = "SheetTitle";

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = "SheetDescription";

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
};
