# UI Components Guide

## Overview
All UI components are in `@/components/ui/` and handle platform-specific behavior automatically. Just import and use them!

## Basic Usage

### SafeAreaView - Handles notches and system UI
```tsx
import { SafeAreaView } from "@/components/ui";

// Basic usage (top and bottom safe areas)
<SafeAreaView className="bg-white dark:bg-black">
  {/* Your content */}
</SafeAreaView>

// Custom edges
<SafeAreaView edges={["top"]} className="px-4">
  {/* Content */}
</SafeAreaView>
```

### ScrollView - Platform-optimized scrolling
```tsx
import { ScrollView } from "@/components/ui";

// Basic scrolling
<ScrollView className="flex-1">
  {/* Content */}
</ScrollView>

// With pull-to-refresh
<ScrollView
  refreshing={isRefreshing}
  onRefresh={handleRefresh}
  className="bg-background"
>
  {/* Content */}
</ScrollView>
```

### KeyboardAvoidingView - Form handling
```tsx
import { KeyboardAvoidingView, ScrollView, Input } from "@/components/ui";

<KeyboardAvoidingView className="flex-1">
  <ScrollView className="px-4">
    <Input placeholder="Email" className="mb-4" />
    <Input placeholder="Password" secureTextEntry className="mb-4" />
    <Button onPress={handleSubmit}>
      <Text>Submit</Text>
    </Button>
  </ScrollView>
</KeyboardAvoidingView>
```

## Component Styling with NativeWind

### Text Variants
```tsx
<Text variant="h1">Heading 1</Text>
<Text variant="p" className="text-muted-foreground">Paragraph</Text>
<Text variant="small" className="text-destructive">Error text</Text>
```

### Button Variants & Sizes
```tsx
// Variants
<Button variant="default"><Text>Primary</Text></Button>
<Button variant="secondary"><Text>Secondary</Text></Button>
<Button variant="destructive"><Text>Delete</Text></Button>
<Button variant="outline"><Text>Outline</Text></Button>
<Button variant="ghost"><Text>Ghost</Text></Button>

// Sizes
<Button size="sm"><Text>Small</Text></Button>
<Button size="default"><Text>Default</Text></Button>
<Button size="lg"><Text>Large</Text></Button>

// Custom styling
<Button className="bg-green-500 w-full"><Text>Custom</Text></Button>
```

### Card Component
```tsx
<Card className="m-4">
  <CardHeader>
    <CardTitle><Text>Title</Text></CardTitle>
    <CardDescription><Text>Description</Text></CardDescription>
  </CardHeader>
  <CardContent>
    <Text>Card content</Text>
  </CardContent>
  <CardFooter className="gap-2">
    <Button variant="outline" className="flex-1">
      <Text>Cancel</Text>
    </Button>
    <Button className="flex-1">
      <Text>Confirm</Text>
    </Button>
  </CardFooter>
</Card>
```

### Form Components
```tsx
// Input with label
<View className="gap-2">
  <Label><Text>Email</Text></Label>
  <Input 
    placeholder="Enter email"
    keyboardType="email-address"
    className="mb-4"
  />
</View>

// Switch
<View className="flex-row items-center justify-between p-4">
  <Label><Text>Enable notifications</Text></Label>
  <Switch checked={enabled} onCheckedChange={setEnabled} />
</View>

// Checkbox
<View className="flex-row items-center gap-2 p-4">
  <Checkbox checked={agreed} onCheckedChange={setAgreed} />
  <Label onPress={() => setAgreed(!agreed)}>
    <Text>I agree to terms</Text>
  </Label>
</View>
```

### Badge Component
```tsx
<Badge><Text>New</Text></Badge>
<Badge variant="secondary"><Text>Featured</Text></Badge>
<Badge variant="destructive"><Text>Urgent</Text></Badge>
<Badge variant="outline" className="ml-2"><Text>v2.0</Text></Badge>
```

## Complete Screen Example
```tsx
import {
  SafeAreaView,
  ScrollView,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Text,
  Input,
  Label,
} from "@/components/ui";

export default function MyScreen() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <ScrollView className="flex-1 p-4">
        <Text variant="h1" className="mb-6">Welcome</Text>
        
        <Card className="mb-4">
          <CardHeader>
            <CardTitle><Text>Login</Text></CardTitle>
          </CardHeader>
          <CardContent className="gap-4">
            <View>
              <Label><Text>Email</Text></Label>
              <Input placeholder="email@example.com" />
            </View>
            <View>
              <Label><Text>Password</Text></Label>
              <Input placeholder="••••••••" secureTextEntry />
            </View>
            <Button className="w-full">
              <Text>Sign In</Text>
            </Button>
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
```

## Navigation Configuration

Edit `/config/navigation.config.ts` to add/remove tabs:

```ts
export const navigationConfig = {
  tabs: {
    enabled: true,
    items: [
      {
        name: "home",      // File name in (tabs) folder
        title: "Home",     // Tab label
        icon: "house.fill", // SF Symbol name
      },
      // Add more tabs here
    ],
  },
};
```

## Platform-Specific Features

Components automatically handle:
- **iOS**: Native feedback, rounded inputs, SF Symbols
- **Android**: Ripple effects, Material Design styling
- **Web**: Hover states, focus rings, keyboard navigation

## Color Classes

Use theme-aware colors:
- `text-foreground` / `bg-background` - Main colors
- `text-primary` / `bg-primary` - Brand colors  
- `text-muted-foreground` / `bg-muted` - Subtle text/backgrounds
- `text-destructive` / `bg-destructive` - Error/danger states
- `border-input` - Input borders
- `bg-card` - Card backgrounds

All colors work in dark mode automatically!

## Dialog Component

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui";

const [open, setOpen] = useState(false);

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button><Text>Open Dialog</Text></Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle><Text variant="h4">Title</Text></DialogTitle>
      <DialogDescription>
        <Text variant="muted">Description text here</Text>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline" onPress={() => setOpen(false)}>
        <Text>Cancel</Text>
      </Button>
      <Button onPress={() => setOpen(false)}>
        <Text>Confirm</Text>
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Bottom Sheet Component

```tsx
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui";

const [open, setOpen] = useState(false);

<Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger asChild>
    <Button><Text>Open Sheet</Text></Button>
  </SheetTrigger>
  <SheetContent snapPoints={["25%", "50%", "90%"]}>
    <SheetHeader>
      <SheetTitle><Text variant="h4">Options</Text></SheetTitle>
    </SheetHeader>
    {/* Sheet content */}
  </SheetContent>
</Sheet>
```

## Drawer Component

```tsx
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerItem } from "@/components/ui";

const [open, setOpen] = useState(false);

<Drawer open={open} onOpenChange={setOpen}>
  <DrawerTrigger>
    <MenuIcon className="h-6 w-6" />
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle><Text variant="h4">Menu</Text></DrawerTitle>
    </DrawerHeader>
    <DrawerItem icon={<HomeIcon className="h-5 w-5" />}>
      <Text>Home</Text>
    </DrawerItem>
    <DrawerSeparator />
    <DrawerItem icon={<SettingsIcon className="h-5 w-5" />}>
      <Text>Settings</Text>
    </DrawerItem>
  </DrawerContent>
</Drawer>
```

## Hamburger Menu Implementation

There are two ways to add a hamburger menu:

### Option 1: Fixed Position (Floats over content)
```tsx
import { HamburgerMenu } from "@/components/ui";

<View className="relative flex-1">
  <HamburgerMenu 
    position="top-left"  // or "top-right"
    onPress={() => setDrawerOpen(true)}
  />
  
  <SafeAreaView>
    <ScrollView>
      {/* Add spacer to prevent content hiding */}
      <View className="h-16" />
      {/* Your content */}
    </ScrollView>
  </SafeAreaView>
</View>
```

### Option 2: Header Bar (Recommended)
```tsx
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui";
import { Menu } from "lucide-react-native";

<SafeAreaView className="flex-1">
  {/* Header */}
  <View className="flex-row items-center justify-between p-4 border-b border-border">
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Pressable className="p-2">
          <Menu className="h-6 w-6 text-foreground" />
        </Pressable>
      </DrawerTrigger>
      <DrawerContent>{/* Menu items */}</DrawerContent>
    </Drawer>
    
    <Text variant="h6">My App</Text>
    <View className="w-10" /> {/* Spacer for balance */}
  </View>
  
  {/* Content */}
  <ScrollView className="flex-1">
    {/* Your content - no spacing needed */}
  </ScrollView>
</SafeAreaView>
```

## Permission Requester

Handle permissions elegantly with automatic iOS settings redirect:

```tsx
import { PermissionRequester, usePermission } from "@/components/ui";

// Component approach
<PermissionRequester
  permission="camera" // "camera" | "location" | "notifications" etc.
  onPermissionGranted={() => console.log("Granted!")}
  onPermissionDenied={() => console.log("Denied")}
>
  {({ status, requestPermission }) => (
    <Button onPress={requestPermission}>
      <Text>
        {status === "granted" ? "✓ Camera Enabled" : "Enable Camera"}
      </Text>
    </Button>
  )}
</PermissionRequester>

// Hook approach
const MyComponent = () => {
  const { status, request, check } = usePermission("camera");
  
  const handleTakePhoto = async () => {
    if (status !== "granted") {
      const granted = await request();
      if (!granted) {
        alert("Camera permission required");
        return;
      }
    }
    // Take photo...
  };
  
  return <Button onPress={handleTakePhoto}><Text>Take Photo</Text></Button>;
};
```

Available permissions:
- `camera` - Camera access (Note: For camera, use `useCameraPermissions` hook from expo-camera)
- `location` - Background location
- `locationForeground` - Foreground location only  
- `mediaLibrary` - Photo/video library
- `contacts` - Contacts access
- `notifications` - Push notifications

**Camera Permission Example:**
```tsx
import { useCameraPermissions } from "@/components/ui";

function CameraButton() {
  const [permission, requestPermission] = useCameraPermissions();
  
  if (!permission) return null;
  
  if (!permission.granted) {
    return (
      <Button onPress={requestPermission}>
        <Text>Grant Camera Permission</Text>
      </Button>
    );
  }
  
  return <Button><Text>Take Photo</Text></Button>;
}
```

Features:
- Automatically shows iOS settings dialog when permission is denied
- Type-safe permission types
- Handles all permission states
- Works on iOS and Android