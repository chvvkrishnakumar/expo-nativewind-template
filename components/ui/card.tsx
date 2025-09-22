import * as React from "react";
import { View, type ViewProps } from "react-native";
import { TextClassContext } from "./utils/text-context";
import { cn } from "./utils/cn";

/**
 * Card Components
 * 
 * A set of components to create cards with header, content, and footer sections.
 * Perfect for displaying grouped information, forms, or any content that needs visual separation.
 * 
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>
 *       <Text>Card Title</Text>
 *     </CardTitle>
 *     <CardDescription>
 *       <Text>Card description goes here</Text>
 *     </CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <Text>Your main content here</Text>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>
 *       <Text>Action</Text>
 *     </Button>
 *   </CardFooter>
 * </Card>
 * ```
 */

interface CardProps extends ViewProps {}

const Card = React.forwardRef<React.ElementRef<typeof View>, CardProps>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn(
        "rounded-lg border border-border bg-card shadow-sm",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const cardTitleTextClass = "text-2xl font-semibold leading-none tracking-tight";

const CardTitle = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps
>(({ className, ...props }, ref) => (
  <TextClassContext.Provider value={cardTitleTextClass}>
    <View
      role="heading"
      aria-level={3}
      ref={ref}
      className={cn(className)}
      {...props}
    />
  </TextClassContext.Provider>
));
CardTitle.displayName = "CardTitle";

const cardDescriptionTextClass = "text-sm text-muted-foreground";

const CardDescription = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps
>(({ className, ...props }, ref) => (
  <TextClassContext.Provider value={cardDescriptionTextClass}>
    <View
      ref={ref}
      className={cn(className)}
      {...props}
    />
  </TextClassContext.Provider>
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("flex flex-row items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
export type { CardProps };