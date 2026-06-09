# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1] - 2025-06-09

### Added
- ✨ **Expo SDK 56 Upgrade**
  - Updated from Expo SDK 54 to SDK 56
  - Latest React Native features and improvements
  - Enhanced performance and stability

### Fixed
- 🐛 **Sheet Component**
  - Fixed issue where Sheet content was not rendering on first open (overlay only)
  - Refactored to use context-based state management
  - Simplified implementation for better reliability
  - Now uses Modal's built-in slide animation

- 🐛 **Drawer Component**
  - Fixed issue where Drawer content was not rendering on first open
  - Removed complex Animated.Value logic
  - Simplified to match Dialog component pattern
  - Now renders consistently on first and subsequent opens

### Changed
- 📝 Both Sheet and Drawer components now follow context-based pattern (same as Dialog)
- Improved component reliability by removing unnecessary animation complexity
- Better modal content rendering lifecycle management

## [0.1.0] - 2025-09-22

### Initial Release

#### Added
- 🎨 **20+ Pre-built UI Components**
  - Layout components (SafeAreaView, ScrollView, KeyboardAvoidingView)
  - Form elements (Input, Button, Checkbox, Switch, Select)
  - Data display (DataTable, FlatList)
  - Feedback (Dialog, Sheet, Spinner, Error Boundaries)
  - Navigation (Drawer, BottomSheet)

- 🛠️ **Modern Tech Stack**
  - Expo SDK 53
  - React Native 0.79.6
  - React 19.0.0
  - TypeScript with strict mode
  - NativeWind v4 (TailwindCSS for React Native)

- 📱 **Features**
  - File-based routing with Expo Router
  - Dark/Light theme support
  - Platform-specific components
  - Permission handling system
  - Network state management
  - Error boundaries with fallback UI

- 📚 **Developer Experience**
  - Comprehensive documentation
  - Demo screens for all components
  - TypeScript path aliases
  - ESLint configuration
  - Semantic color system (no hardcoded colors)

- 🔧 **Configuration**
  - iOS and Android permission descriptions
  - App icons and splash screen
  - Environment-ready structure

### Security
- Proper permission handling for camera, location, contacts, and media library
- No hardcoded sensitive data

[0.1.0]: https://github.com/chvvkrishnakumar/expo-nativewind-template/releases/tag/v0.1.0