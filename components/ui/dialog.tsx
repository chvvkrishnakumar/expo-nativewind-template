import * as React from "react";
import { 
  Modal,
  View,
  Pressable,
  type ModalProps,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { cn } from "./utils/cn";
import { X } from "lucide-react-native";
import { iconWithClassName } from "./lib/icons/icon-with-classname";

const XIcon = iconWithClassName(X);

interface DialogProps extends Omit<ModalProps, "visible"> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DialogContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>({
  open: false,
  onOpenChange: () => {},
});

const Dialog = ({ children, open = false, onOpenChange = () => {} }: { 
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
};

const DialogTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    asChild?: boolean;
  }
>(({ onPress, asChild, children, ...props }, ref) => {
  const { onOpenChange } = React.useContext(DialogContext);
  
  const handlePress = React.useCallback((e?: any) => {
    onPress?.(e);
    onOpenChange(true);
  }, [onPress, onOpenChange]);
  
  // If asChild, clone the child element and add onPress
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as any, {
      onPress: handlePress,
    });
  }
  
  return (
    <Pressable
      ref={ref}
      onPress={handlePress}
      {...props}
    >
      {children}
    </Pressable>
  );
});
DialogTrigger.displayName = "DialogTrigger";

const DialogContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    hideCloseButton?: boolean;
  }
>(({ className, children, hideCloseButton, ...props }, ref) => {
  const { open, onOpenChange } = React.useContext(DialogContext);

  return (
    <Modal
      visible={open}
      transparent
      animationType={Platform.select({ ios: "slide", android: "fade" })}
      statusBarTranslucent
      onRequestClose={() => onOpenChange(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <Pressable 
          className="flex-1 justify-center items-center bg-foreground/50 p-4"
          onPress={() => onOpenChange(false)}
        >
          <Pressable
            ref={ref}
            className={cn(
              "bg-background rounded-lg p-6 w-full max-w-sm",
              "shadow-lg",
              Platform.select({
                ios: "shadow-foreground/25",
                android: "elevation-24",
              }),
              className
            )}
            onPress={(e) => e.stopPropagation()}
            {...props}
          >
            {!hideCloseButton && (
              <Pressable
                onPress={() => onOpenChange(false)}
                className="absolute right-4 top-4 rounded-sm opacity-70 web:hover:opacity-100"
              >
                <XIcon className="h-4 w-4 text-foreground" />
              </Pressable>
            )}
            {children}
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
});
DialogContent.displayName = "DialogContent";

const DialogHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("flex flex-col gap-1.5 text-center", className)}
    {...props}
  />
));
DialogHeader.displayName = "DialogHeader";

const DialogFooter = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("flex flex-col gap-2 mt-6", className)}
    {...props}
  />
));
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};