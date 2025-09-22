import React from "react";
import { View, Platform, Linking } from "react-native";
import {
  SafeAreaView,
  ScrollView,
  Text,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  useCameraPermissions,
  usePermission,
} from "@/components/ui";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import * as Contacts from "expo-contacts";
import * as Notifications from "expo-notifications";
import * as Clipboard from 'expo-clipboard';
import { Camera, MapPin, Image, Users, Bell } from "lucide-react-native";
import { iconWithClassName } from "@/components/ui/lib/icons/icon-with-classname";
import { Alert, Pressable } from "react-native";

const CameraIcon = iconWithClassName(Camera);
const MapPinIcon = iconWithClassName(MapPin);
const ImageIcon = iconWithClassName(Image);
const UsersIcon = iconWithClassName(Users);
const BellIcon = iconWithClassName(Bell);

export default function PermissionsDemo() {
  // Camera permission using special hook
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  
  // Other permissions using the general hook
  const locationPermission = usePermission("locationForeground");
  const mediaLibraryPermission = usePermission("mediaLibrary");
  const contactsPermission = usePermission("contacts");
  const notificationsPermission = usePermission("notifications");

  const handleCameraRequest = async () => {
    // Check if we need to open settings
    if (cameraPermission?.status === 'denied' && 
        (Platform.OS === 'ios' || !cameraPermission.canAskAgain)) {
      Alert.alert(
        "Camera Access Required",
        "Please enable camera access in your device settings.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() }
        ]
      );
      return;
    }

    const result = await requestCameraPermission();
    if (result.granted) {
      Alert.alert("Success", "Camera permission granted!");
    }
  };

  const copyHookExample = async (example: string) => {
    await Clipboard.setStringAsync(example);
    Alert.alert('Copied!', 'Code example copied to clipboard');
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <ScrollView className="flex-1" contentContainerClassName="p-4">
        <Text variant="h1" className="mb-2">Permission Hooks Demo</Text>
        <Text variant="muted" className="mb-6">
          Learn how to use permission hooks directly in your components
        </Text>

        {/* Camera Permission Example */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex-row items-center gap-2">
              <CameraIcon className="h-5 w-5 text-foreground" />
              <Text variant="h4">Camera Permission</Text>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text variant="small" className="mb-3">
              Camera uses a special hook from expo-camera:
            </Text>
            
            <Pressable 
              className="bg-muted p-3 rounded-md mb-4"
              onPress={() => copyHookExample(`import { useCameraPermissions } from '@/components/ui';

const [permission, requestPermission] = useCameraPermissions();

// Check status
if (permission?.status === 'denied') {
  // Handle denied state
}

// Request permission
const result = await requestPermission();
if (result.granted) {
  // Camera is ready to use
}`)}
            >
              <Text variant="code" className="text-xs">Tap to copy example</Text>
            </Pressable>

            <View className="flex-row items-center justify-between">
              <Badge variant={
                cameraPermission?.granted ? "secondary" : 
                cameraPermission?.status === 'denied' ? "destructive" : "default"
              }>
                <Text variant="small">
                  {cameraPermission?.granted ? "✓ Granted" : 
                   cameraPermission?.status === 'denied' ? "✗ Denied" : "- Not Set"}
                </Text>
              </Badge>
              <Button 
                size="sm" 
                onPress={handleCameraRequest}
                disabled={cameraPermission?.granted}
              >
                <Text>Request Camera</Text>
              </Button>
            </View>
          </CardContent>
        </Card>

        {/* Location Permission Example */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex-row items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-foreground" />
              <Text variant="h4">Location Permission</Text>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text variant="small" className="mb-3">
              Using the general usePermission hook:
            </Text>
            
            <Pressable 
              className="bg-muted p-3 rounded-md mb-4"
              onPress={() => copyHookExample(`import { usePermission } from '@/components/ui';

const { status, request, check } = usePermission('locationForeground');

// Request permission
const granted = await request();
if (granted) {
  // Get location
  const location = await Location.getCurrentPositionAsync({});
}`)}
            >
              <Text variant="code" className="text-xs">Tap to copy example</Text>
            </Pressable>

            <View className="flex-row items-center justify-between">
              <Badge variant={
                locationPermission.status === "granted" ? "secondary" : 
                locationPermission.status === "denied" ? "destructive" : "default"
              }>
                <Text variant="small">
                  {locationPermission.status === "granted" ? "✓ Granted" : 
                   locationPermission.status === "denied" ? "✗ Denied" : "- Not Set"}
                </Text>
              </Badge>
              <Button 
                size="sm" 
                onPress={async () => {
                  if (locationPermission.status === "denied" && Platform.OS === "ios") {
                    Alert.alert(
                      "Location Access Required",
                      "Please enable location access in your device settings.",
                      [
                        { text: "Cancel", style: "cancel" },
                        { text: "Open Settings", onPress: () => Linking.openSettings() }
                      ]
                    );
                    return;
                  }
                  const granted = await locationPermission.request();
                  if (granted) {
                    Alert.alert("Success", "Location permission granted!");
                  }
                }}
                disabled={locationPermission.status === "granted"}
              >
                <Text>Request Location</Text>
              </Button>
            </View>
          </CardContent>
        </Card>

        {/* Direct API Examples */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              <Text variant="h4">Direct API Usage</Text>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text variant="small" className="mb-3">
              You can also use Expo APIs directly without hooks:
            </Text>
            
            <Pressable 
              className="bg-muted p-3 rounded-md mb-4"
              onPress={() => copyHookExample(`// Media Library
const { status } = await MediaLibrary.requestPermissionsAsync();

// Notifications
const { status } = await Notifications.requestPermissionsAsync();

// Contacts
const { status } = await Contacts.requestPermissionsAsync();

// Location
const { status } = await Location.requestForegroundPermissionsAsync();`)}
            >
              <Text variant="code" className="text-xs">Tap to copy examples</Text>
            </Pressable>

            <View className="gap-3">
              <Button
                variant="outline"
                size="sm"
                onPress={async () => {
                  const { status } = await MediaLibrary.requestPermissionsAsync();
                  Alert.alert("Media Library", `Status: ${status}`);
                }}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                <Text>Test Media Library</Text>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onPress={async () => {
                  const { status } = await Notifications.requestPermissionsAsync();
                  Alert.alert("Notifications", `Status: ${status}`);
                }}
              >
                <BellIcon className="h-4 w-4 mr-2" />
                <Text>Test Notifications</Text>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onPress={async () => {
                  const { status } = await Contacts.requestPermissionsAsync();
                  Alert.alert("Contacts", `Status: ${status}`);
                }}
              >
                <UsersIcon className="h-4 w-4 mr-2" />
                <Text>Test Contacts</Text>
              </Button>
            </View>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Text variant="h4">💡 Best Practices</Text>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <View className="gap-2">
              <Text variant="small">
                • <Text className="font-semibold">Always check status first</Text> before requesting
              </Text>
              <Text variant="small">
                • <Text className="font-semibold">Handle iOS settings</Text> - denied permissions need settings redirect
              </Text>
              <Text variant="small">
                • <Text className="font-semibold">Explain why</Text> - show dialog before requesting permission
              </Text>
              <Text variant="small">
                • <Text className="font-semibold">Handle rejection gracefully</Text> - provide alternatives
              </Text>
              <Text variant="small">
                • <Text className="font-semibold">Test on real devices</Text> - simulators may behave differently
              </Text>
            </View>
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}