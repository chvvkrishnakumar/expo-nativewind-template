# 🚀 Quick Start Guide

Welcome to your Expo React Native template! This guide will help you get up and running in minutes.

## 📱 First Steps

### 1. Start the Development Server
```bash
npx expo start
```

### 2. Run on Your Device
- Press `i` for iOS Simulator
- Press `a` for Android Emulator  
- Or scan the QR code with Expo Go app

## 🎯 Essential Imports

```tsx
// Most common imports you'll need
import {
  SafeAreaView,
  ScrollView,
  Text,
  Button,
  Card,
  Input,
  // ... and 15+ more components
} from '@/components/ui';
```

## 💡 Common Patterns

### Basic Screen Layout
```tsx
import { SafeAreaView, ScrollView, Text } from '@/components/ui';

export default function MyScreen() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerClassName="p-4">
        <Text variant="h1">My Screen</Text>
        {/* Your content here */}
      </ScrollView>
    </SafeAreaView>
  );
}
```

### Form Example
```tsx
import { Card, Input, Label, Button, Text } from '@/components/ui';

export default function LoginForm() {
  return (
    <Card>
      <CardContent className="gap-4">
        <View>
          <Label><Text>Email</Text></Label>
          <Input 
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>
        
        <Button onPress={handleLogin}>
          <Text>Login</Text>
        </Button>
      </CardContent>
    </Card>
  );
}
```

### Modal/Dialog Example
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui';

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button><Text>Open Dialog</Text></Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle><Text>Title</Text></DialogTitle>
    </DialogHeader>
    {/* Dialog content */}
  </DialogContent>
</Dialog>
```

### Permission Handling
```tsx
import { PermissionRequester, useCameraPermissions } from '@/components/ui';

// For most permissions
<PermissionRequester permission="location">
  {({ status, requestPermission }) => (
    <Button onPress={requestPermission}>
      <Text>{status === 'granted' ? '✓ Granted' : 'Request'}</Text>
    </Button>
  )}
</PermissionRequester>

// For camera (special case)
const [permission, requestPermission] = useCameraPermissions();
```

## 🎨 Styling with NativeWind

### Basic Styling
```tsx
// Flexbox
<View className="flex-1 flex-row items-center justify-between">

// Spacing
<View className="p-4 m-2 gap-4">

// Colors (adapts to dark mode)
<Text className="text-primary">Primary color</Text>
<View className="bg-background border-border">

// Responsive
<View className="w-full md:w-1/2">
```

### Dark Mode
Dark mode is automatic! Components use semantic colors:
- `bg-background` / `text-foreground` - Main colors
- `bg-card` / `text-card-foreground` - Card colors
- `bg-muted` / `text-muted-foreground` - Muted elements

## 📂 Project Structure

```
app/
├── (tabs)/          # Tab screens
│   ├── index.tsx    # Component showcase
│   └── _layout.tsx  # Tab configuration
├── (auth)/          # Auth screens (create this)
└── _layout.tsx      # Root layout

components/ui/       # All UI components
```

## 🔧 Customization

### Theme Colors
Edit `global.css` to change colors:
```css
:root {
  --primary: 221.2 83.2% 53.3%;  /* hsl format */
  --background: 0 0% 100%;
}
```

### Add New Screens
1. Create file in `app/` directory
2. It automatically becomes a route!
3. Add to tabs by creating in `app/(tabs)/`

## 💪 Pro Tips

1. **Platform Detection**
   ```tsx
   import { Platform } from 'react-native';
   Platform.OS === 'ios' ? 'iOS stuff' : 'Android stuff'
   ```

2. **Safe Area Handling**
   ```tsx
   // Always wrap your screens
   <SafeAreaView edges={['top']}> // or ['bottom'] or ['left', 'right']
   ```

3. **Keyboard Handling**
   ```tsx
   <KeyboardAvoidingView behavior="padding">
     {/* Form content */}
   </KeyboardAvoidingView>
   ```

4. **Component Variants**
   ```tsx
   <Button variant="destructive" size="lg">
   <Badge variant="secondary">
   <Text variant="h1"> // h1-h6, p, lead, muted, code
   ```

## 🆘 Need Help?

1. Check the **UI Showcase** tab - interactive examples
2. Look at component files - they have usage comments
3. Read component props - full TypeScript support
4. Check the [NativeWind docs](https://nativewind.dev) for styling

## 🚀 What's Next?

1. Explore the demo screens
2. Modify the components to match your brand
3. Add your screens in the `app/` directory
4. Build something awesome!

Happy coding! 🎉