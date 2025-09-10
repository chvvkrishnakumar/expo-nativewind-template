import * as React from "react";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { View, Pressable, useWindowDimensions, Modal, Platform } from "react-native";
import { cn } from "./utils/cn";
import { X } from "lucide-react-native";
import { iconWithClassName } from "./lib/icons/icon-with-classname";

const XIcon = iconWithClassName(X);

interface SheetProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Sheet = ({ children, open = false, onOpenChange = () => {} }: { 
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  React.useEffect(() => {
    if (open) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [open]);

  const handleSheetChanges = React.useCallback((index: number) => {
    if (index === -1) {
      onOpenChange(false);
    }
  }, [onOpenChange]);

  // Extract trigger and content
  let trigger: React.ReactNode = null;
  let content: React.ReactNode = null;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === SheetTrigger) {
        const triggerProps = child.props as any;
        if (triggerProps.asChild && React.isValidElement(triggerProps.children)) {
          // Clone the child element with onPress
          const childProps = (triggerProps.children as React.ReactElement<any>).props || {};
          trigger = React.cloneElement(triggerProps.children as React.ReactElement<any>, {
            ...childProps,
            onPress: () => onOpenChange(true),
          });
        } else {
          const childProps = child.props || {};
          trigger = React.cloneElement(child as React.ReactElement<any>, {
            ...childProps,
            onPress: () => onOpenChange(true),
          });
        }
      } else if (child.type === SheetContent) {
        const childProps = child.props || {};
        content = React.cloneElement(child as React.ReactElement<any>, {
          ...childProps,
          ref: bottomSheetModalRef,
          onChange: handleSheetChanges,
          onOpenChange,
        });
      }
    }
  });

  return (
    <>
      {trigger}
      {content}
    </>
  );
};

const SheetTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    asChild?: boolean;
  }
>(({ asChild, children, onPress, ...props }, ref) => {
  // Don't render anything here, the Sheet component will handle it
  if (asChild && React.isValidElement(children)) {
    return children;
  }
  
  return (
    <Pressable ref={ref} onPress={onPress} {...props}>
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
  onChange?: (index: number) => void;
  onOpenChange?: (open: boolean) => void;
}

const SheetContent = React.forwardRef<
  BottomSheetModal,
  SheetContentProps
>(({ children, className, hideCloseButton, snapPoints = ["25%", "50%", "90%"], onChange, onOpenChange }, ref) => {
  const { height } = useWindowDimensions();

  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={onChange}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.5}
          onPress={() => onOpenChange?.(false)}
        />
      )}
      backgroundStyle={{
        backgroundColor: Platform.OS === "ios" ? "transparent" : undefined,
      }}
      handleIndicatorStyle={{
        backgroundColor: "#9ca3af",
        width: 36,
        height: 4,
      }}
    >
      <BottomSheetView 
        className={cn(
          "flex-1 bg-background rounded-t-3xl px-4",
          className
        )}
        style={{ minHeight: height * 0.9 }}
      >
        {!hideCloseButton && (
          <Pressable
            onPress={() => onOpenChange?.(false)}
            className="absolute right-4 top-4 z-10 rounded-sm opacity-70"
          >
            <XIcon className="h-5 w-5 text-foreground" />
          </Pressable>
        )}
        <View className="pt-4">
          {children}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
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