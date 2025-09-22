# 📱 Expo NativeWind Template

> 🚀 **Production-Ready Expo Starter Kit** - Mobile app template with 20+ pre-built UI components, TypeScript, NativeWind (Tailwind CSS), and platform-specific behaviors for iOS/Android.

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/chvvkrishnakumar/expo-nativewind-template/releases)
[![Expo](https://img.shields.io/badge/Expo-SDK_53-000.svg?style=flat&logo=expo)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.79.6-61DAFB.svg?style=flat&logo=react)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![NativeWind](https://img.shields.io/badge/NativeWind-v4-38B2AC.svg?style=flat)](https://www.nativewind.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<p align="center">
  <img src="https://your-demo-gif.gif" alt="Demo" width="300" />
</p>

## 🎯 Why This Template?

Stop building UI components from scratch! This Expo starter template comes with:

- ✅ **20+ Pre-built Components** - Buttons, Cards, Dialogs, Bottom Sheets, and more
- ✅ **Platform-Specific UI** - Automatic iOS/Android adaptations
- ✅ **Dark Mode Ready** - System-aware theme switching
- ✅ **Permission Management** - Unified API for all device permissions
- ✅ **TypeScript First** - Full type safety out of the box
- ✅ **Production Ready** - Best practices and scalable architecture

## 🌟 Perfect For

- 📱 **Mobile App MVPs** - Launch faster with pre-built components
- 🏢 **Enterprise Apps** - Scalable architecture and TypeScript safety
- 🎨 **Design Systems** - Consistent UI across iOS and Android
- 🚀 **Startups** - Focus on your business logic, not UI implementation

## 🚀 Core Features

- **🎨 Complete UI Component Library** - 20+ pre-built components with iOS/Android platform-specific behaviors
- **🎯 TypeScript** - Full type safety and IntelliSense support
- **💨 NativeWind** - Tailwind CSS for React Native with dark mode support
- **📍 Expo Router** - File-based routing with typed navigation
- **🔒 Permission Management** - Unified permission handling for camera, location, notifications, etc.
- **📱 Platform-Specific Components** - Automatic iOS/Android adaptations
- **🌙 Dark Mode** - Built-in theme support with automatic system detection
- **♿ Accessibility** - WCAG compliant components with proper ARIA labels

## 📦 What's Included

### UI Components

- **Layout**: SafeAreaView, ScrollView, KeyboardAvoidingView
- **Typography**: Text with variants (h1-h6, p, lead, muted, code)
- **Buttons**: Multiple variants (primary, secondary, destructive, outline, ghost, link)
- **Forms**: Input, Label, Switch, Checkbox
- **Feedback**: Dialog, Sheet (Bottom Sheet), Drawer
- **Display**: Card, Badge
- **Navigation**: Hamburger Menu, Tab Navigation
- **Utilities**: Permission Requester, Theme Provider

### Demo Screens

1. **UI Showcase** (`/app/(tabs)/index.tsx`) - Interactive component gallery
2. **Menu Demo** (`/app/(tabs)/menu-demo.tsx`) - Hamburger menu implementation
3. **Permissions Demo** (`/app/(tabs)/permissions-demo.tsx`) - Permission management UI

## 🏗️ Project Structure

```
├── app/                    # 📱 Expo Router screens
│   ├── (tabs)/            # 📊 Tab navigation
│   │   ├── index.tsx      # Component showcase
│   │   ├── menu-demo.tsx  # Menu examples
│   │   └── permissions-demo.tsx # Permission examples
│   └── _layout.tsx        # 🎨 Root layout
├── components/            
│   ├── ui/                # 🎨 UI component library (20+ components)
│   └── error-boundary/    # Error handling components
├── hooks/                 # 🪝 Custom React hooks
├── constants/             # 📌 App constants & colors
├── config/                # ⚙️ App configuration
├── assets/                # 🖼️ Images, fonts, etc.
```

## ⚠️ Important Notes

### Expo Go Limitations
Some features require a development build instead of Expo Go:
- **Push Notifications** - Requires development build (SDK 53+)
- **Camera** - May have limited functionality
- **Other native modules** - Some features work better in dev builds

To create a development build:
```bash
npx eas build --profile development --platform ios
npx eas build --profile development --platform android
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- iOS Simulator (Mac only) or Android Studio
- Expo Go app on your physical device (optional)

### Installation

1. **Clone the template**
   ```bash
   git clone https://github.com/yourusername/expo-starter-template.git my-app
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your device**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app

## 📁 Project Structure

```
expo-nativewind-template/
├── app/                    # App routes (Expo Router)
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── _layout.tsx    # Tab layout configuration
│   │   ├── index.tsx      # UI component showcase
│   │   ├── menu-demo.tsx  # Hamburger menu demo
│   │   └── permissions-demo.tsx # Permissions demo
│   ├── _layout.tsx        # Root layout with providers
│   └── +not-found.tsx     # 404 screen
├── components/            
│   └── ui/                # UI component library
│       ├── button.tsx     
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── sheet.tsx
│       ├── theme.tsx      # Theme provider
│       └── ...            # Other components
├── assets/                # Images, fonts, etc.
├── hooks/                 # Custom React hooks
├── constants/             # App constants
└── package.json
```

## 🎨 Using Components

### Basic Example

```tsx
import { Button, Text, Card, SafeAreaView } from '@/components/ui';

export default function MyScreen() {
  return (
    <SafeAreaView className="flex-1 p-4">
      <Card>
        <Text variant="h2">Welcome!</Text>
        <Button onPress={() => console.log('Pressed')}>
          <Text>Get Started</Text>
        </Button>
      </Card>
    </SafeAreaView>
  );
}
```

### Platform-Specific Components

Components automatically adapt to the platform:

```tsx
// Button uses TouchableOpacity on iOS, Pressable with ripple on Android
<Button onPress={handlePress}>
  <Text>Platform Adaptive Button</Text>
</Button>

// Dialog animations differ by platform
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    {/* iOS: slide animation, Android: fade animation */}
  </DialogContent>
</Dialog>
```

### Permission Handling

```tsx
import { PermissionRequester, useCameraPermissions } from '@/components/ui';

// Using the component
<PermissionRequester permission="location">
  {({ status, requestPermission }) => (
    <Button onPress={requestPermission}>
      <Text>{status === 'granted' ? 'Access Granted' : 'Request Access'}</Text>
    </Button>
  )}
</PermissionRequester>

// Using the hook for camera (special case)
const [permission, requestPermission] = useCameraPermissions();
```

## 🎨 Styling with NativeWind

This template uses NativeWind (Tailwind for React Native):

```tsx
// Using className for styling
<View className="flex-1 bg-background p-4">
  <Text className="text-lg font-bold text-primary">Hello World</Text>
  <Button className="mt-4" variant="secondary">
    <Text>Click me</Text>
  </Button>
</View>

// Dark mode is automatic
<Text className="text-foreground">Adapts to dark/light mode</Text>
```

## 🔧 Customization

### Theme Colors

Edit `global.css` to customize your theme:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    /* ... other colors */
  }
  
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... dark mode colors */
  }
}
```

### Adding New Components

1. Create component in `/components/ui/`
2. Export from `/components/ui/index.ts`
3. Follow existing patterns for platform-specific behavior

## 📱 Platform-Specific Files

For platform-specific implementations:

```
components/ui/
├── button.tsx          # Shared logic
├── button.ios.tsx      # iOS specific (optional)
└── button.android.tsx  # Android specific (optional)
```

## 🚀 Building for Production

### Development Build
```bash
# iOS
eas build --platform ios --profile development

# Android  
eas build --platform android --profile development
```

### Production Build
```bash
# iOS
eas build --platform ios --profile production

# Android
eas build --platform android --profile production
```

## 📚 Tech Stack & Resources

### Core Libraries

| Library | Version | Description | Documentation |
|---------|---------|-------------|--------------|
| [Expo SDK](https://expo.dev) | ~53.0.0 | React Native framework | [Docs](https://docs.expo.dev/) |
| [React Native](https://reactnative.dev) | 0.74.5 | Mobile framework | [Docs](https://reactnative.dev/docs/getting-started) |
| [TypeScript](https://www.typescriptlang.org) | ^5.3.3 | Type safety | [Docs](https://www.typescriptlang.org/docs/) |
| [Expo Router](https://expo.github.io/router) | ~3.5.23 | File-based routing | [Docs](https://docs.expo.dev/router/introduction/) |
| [NativeWind](https://www.nativewind.dev) | ^4.0.0 | Tailwind for RN | [Docs](https://www.nativewind.dev/v4/overview) |

### UI Libraries

| Library | Purpose | Documentation |
|---------|---------|---------------|
| [@gorhom/bottom-sheet](https://github.com/gorhom/react-native-bottom-sheet) | Bottom sheets | [Docs](https://gorhom.dev/react-native-bottom-sheet/) |
| [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler) | Gesture handling | [Docs](https://docs.swmansion.com/react-native-gesture-handler/) |
| [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) | Animations | [Docs](https://docs.swmansion.com/react-native-reanimated/) |
| [lucide-react-native](https://lucide.dev) | Icon library | [Icons](https://lucide.dev/icons/) |
| [class-variance-authority](https://cva.style) | Component variants | [Docs](https://cva.style/docs) |

### Permission Libraries

| Library | Purpose | Documentation |
|---------|---------|---------------|
| [expo-camera](https://docs.expo.dev/versions/latest/sdk/camera/) | Camera access | [API](https://docs.expo.dev/versions/latest/sdk/camera/) |
| [expo-location](https://docs.expo.dev/versions/latest/sdk/location/) | Location services | [API](https://docs.expo.dev/versions/latest/sdk/location/) |
| [expo-media-library](https://docs.expo.dev/versions/latest/sdk/media-library/) | Photo library | [API](https://docs.expo.dev/versions/latest/sdk/media-library/) |
| [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) | Push notifications | [API](https://docs.expo.dev/versions/latest/sdk/notifications/) |
| [expo-contacts](https://docs.expo.dev/versions/latest/sdk/contacts/) | Contacts access | [API](https://docs.expo.dev/versions/latest/sdk/contacts/) |

## 🔍 SEO Keywords

`expo starter template`, `expo ui components`, `react native starter kit`, `expo typescript template`, `react native ui kit`, `expo tailwind template`, `nativewind starter`, `expo component library`, `react native boilerplate`, `expo production template`, `mobile app starter`, `cross-platform ui components`

## 🤔 Frequently Asked Questions

<details>
<summary><b>Can I use this template for commercial projects?</b></summary>

Yes! This template is MIT licensed, meaning you can use it for commercial projects, modify it, and distribute it.
</details>

<details>
<summary><b>How do I add custom colors to the theme?</b></summary>

Edit the `global.css` file and add your custom colors to the `:root` and `.dark` selectors. NativeWind will automatically generate the utility classes.
</details>

<details>
<summary><b>Do the components support iPad/tablets?</b></summary>

Yes, the components are responsive and work on tablets. You may want to adjust some layouts for larger screens using responsive utilities.
</details>

<details>
<summary><b>Can I use this with React Native CLI instead of Expo?</b></summary>

While this template is optimized for Expo, most components will work with React Native CLI. You'll need to replace Expo-specific packages with their React Native equivalents.
</details>

## 🌟 Show Your Support

If this template helps you build your app faster, please consider:

- ⭐ Starring the repository
- 🐦 Sharing it on Twitter
- 💬 Leaving feedback in Issues
- 🤝 Contributing improvements

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Contributing Guidelines

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏷️ Version

Current version: **0.1.0** - See [CHANGELOG.md](CHANGELOG.md) for version history.

## 🙏 Acknowledgments

- [Expo Team](https://expo.dev) for the amazing framework
- [NativeWind Team](https://nativewind.dev) for bringing Tailwind to React Native
- [Gorhom](https://gorhom.dev) for the bottom sheet library
- [Software Mansion](https://swmansion.com) for gesture handler and reanimated
- All contributors who help improve this template

---

<p align="center">
  <b>Built with ❤️ for the React Native community</b>
  <br>
  <sub>If you found this helpful, please ⭐ the repository!</sub>
</p>

<p align="center">
  <a href="#-expo-react-native-starter-template-with-ui-components">Back to top ⬆️</a>
</p>