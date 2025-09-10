import * as React from "react";
import { Platform, Linking } from "react-native";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import * as Contacts from "expo-contacts";
import * as Notifications from "expo-notifications";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./dialog";
import { Button } from "./button";
import { Text } from "./text";
import { AlertCircle, Camera as CameraIcon, MapPin, Image, Users, Bell } from "lucide-react-native";
import { iconWithClassName } from "./lib/icons/icon-with-classname";

const AlertCircleIcon = iconWithClassName(AlertCircle);
const CameraIconStyled = iconWithClassName(CameraIcon);
const MapPinIcon = iconWithClassName(MapPin);
const ImageIcon = iconWithClassName(Image);
const UsersIcon = iconWithClassName(Users);
const BellIcon = iconWithClassName(Bell);

export type PermissionType = 
  | "camera"
  | "location" 
  | "locationForeground"
  | "mediaLibrary"
  | "contacts"
  | "notifications";

interface PermissionInfo {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const permissionInfoMap: Record<PermissionType, PermissionInfo> = {
  camera: {
    title: "Camera Access",
    description: "Allow the app to take photos and record videos",
    icon: <CameraIconStyled className="h-12 w-12 text-primary" />,
  },
  location: {
    title: "Location Access",
    description: "Allow the app to access your location",
    icon: <MapPinIcon className="h-12 w-12 text-primary" />,
  },
  locationForeground: {
    title: "Location Access",
    description: "Allow the app to access your location while using the app",
    icon: <MapPinIcon className="h-12 w-12 text-primary" />,
  },
  mediaLibrary: {
    title: "Photo Library Access",
    description: "Allow the app to access your photos and videos",
    icon: <ImageIcon className="h-12 w-12 text-primary" />,
  },
  contacts: {
    title: "Contacts Access",
    description: "Allow the app to access your contacts",
    icon: <UsersIcon className="h-12 w-12 text-primary" />,
  },
  notifications: {
    title: "Notification Access",
    description: "Allow the app to send you notifications",
    icon: <BellIcon className="h-12 w-12 text-primary" />,
  },
};

interface PermissionRequesterProps {
  permission: PermissionType;
  children: (props: {
    status: "undetermined" | "granted" | "denied";
    requestPermission: () => Promise<void>;
  }) => React.ReactNode;
  onPermissionGranted?: () => void;
  onPermissionDenied?: () => void;
}

export function PermissionRequester({
  permission,
  children,
  onPermissionGranted,
  onPermissionDenied,
}: PermissionRequesterProps) {
  const [status, setStatus] = React.useState<"undetermined" | "granted" | "denied">("undetermined");
  const [showDialog, setShowDialog] = React.useState(false);
  const permissionInfo = permissionInfoMap[permission];

  const checkPermission = React.useCallback(async () => {
    try {
      let permissionStatus;
      
      // For now, we'll skip camera permission check due to API changes
      // You can implement expo-camera hooks separately
      if (permission === "camera") {
        // Skip checking for camera in this example
        return;
      } else if (permission === "location") {
        permissionStatus = await Location.getBackgroundPermissionsAsync();
      } else if (permission === "locationForeground") {
        permissionStatus = await Location.getForegroundPermissionsAsync();
      } else if (permission === "mediaLibrary") {
        permissionStatus = await MediaLibrary.getPermissionsAsync();
      } else if (permission === "contacts") {
        permissionStatus = await Contacts.getPermissionsAsync();
      } else if (permission === "notifications") {
        permissionStatus = await Notifications.getPermissionsAsync();
      }
      
      if (permissionStatus) {
        setStatus(permissionStatus.status as "undetermined" | "granted" | "denied");
      }
    } catch (error) {
      console.error("Error checking permission:", error);
    }
  }, [permission]);

  React.useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  const requestPermission = async () => {
    // On iOS, if denied, we need to open settings
    // On Android, we can try requesting again unless user selected "Don't ask again"
    if (status === "denied" && Platform.OS === "ios") {
      setShowDialog(true);
      return;
    }

    try {
      let permissionResult;
      
      // For camera, you'll need to use the useCameraPermissions hook in your component
      if (permission === "camera") {
        // For camera, just simulate granted for demo
        // In real app, use useCameraPermissions hook from expo-camera
        setStatus("granted");
        onPermissionGranted?.();
        return;
      } else if (permission === "location") {
        permissionResult = await Location.requestBackgroundPermissionsAsync();
      } else if (permission === "locationForeground") {
        permissionResult = await Location.requestForegroundPermissionsAsync();
      } else if (permission === "mediaLibrary") {
        permissionResult = await MediaLibrary.requestPermissionsAsync();
      } else if (permission === "contacts") {
        permissionResult = await Contacts.requestPermissionsAsync();
      } else if (permission === "notifications") {
        permissionResult = await Notifications.requestPermissionsAsync();
      }
      
      if (permissionResult) {
        const newStatus = permissionResult.status as "undetermined" | "granted" | "denied";
        setStatus(newStatus);
        
        if (newStatus === "granted") {
          onPermissionGranted?.();
        } else if (newStatus === "denied") {
          onPermissionDenied?.();
        }
      }
    } catch (error) {
      console.error("Error requesting permission:", error);
    }
  };

  const openSettings = () => {
    Linking.openSettings();
    setShowDialog(false);
  };

  return (
    <>
      {children({ status, requestPermission })}
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex-row items-center justify-center mb-4">
              <AlertCircleIcon className="h-8 w-8 text-destructive" />
            </DialogTitle>
            <DialogTitle>
              <Text variant="h4" className="text-center">Permission Required</Text>
            </DialogTitle>
            <DialogDescription>
              <Text variant="muted" className="text-center">
                {permissionInfo.title} has been denied. Please enable it in your device settings to continue.
              </Text>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-2">
            <Button
              variant="outline"
              onPress={() => setShowDialog(false)}
              className="flex-1"
            >
              <Text>Cancel</Text>
            </Button>
            <Button onPress={openSettings} className="flex-1">
              <Text>Open Settings</Text>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Convenience hook for permissions
export function usePermission(permission: PermissionType) {
  const [status, setStatus] = React.useState<"undetermined" | "granted" | "denied">("undetermined");

  const checkPermission = React.useCallback(async () => {
    try {
      let permissionStatus;
      
      if (permission === "camera") {
        // For camera, you need to use useCameraPermissions hook
        return;
      } else if (permission === "location") {
        permissionStatus = await Location.getBackgroundPermissionsAsync();
      } else if (permission === "locationForeground") {
        permissionStatus = await Location.getForegroundPermissionsAsync();
      } else if (permission === "mediaLibrary") {
        permissionStatus = await MediaLibrary.getPermissionsAsync();
      } else if (permission === "contacts") {
        permissionStatus = await Contacts.getPermissionsAsync();
      } else if (permission === "notifications") {
        permissionStatus = await Notifications.getPermissionsAsync();
      }
      
      if (permissionStatus) {
        setStatus(permissionStatus.status as "undetermined" | "granted" | "denied");
      }
    } catch (error) {
      console.error("Error checking permission:", error);
    }
  }, [permission]);

  React.useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  const request = async () => {
    try {
      let permissionResult;
      
      if (permission === "camera") {
        // For camera, return true for demo
        setStatus("granted");
        return true;
      } else if (permission === "location") {
        permissionResult = await Location.requestBackgroundPermissionsAsync();
      } else if (permission === "locationForeground") {
        permissionResult = await Location.requestForegroundPermissionsAsync();
      } else if (permission === "mediaLibrary") {
        permissionResult = await MediaLibrary.requestPermissionsAsync();
      } else if (permission === "contacts") {
        permissionResult = await Contacts.requestPermissionsAsync();
      } else if (permission === "notifications") {
        permissionResult = await Notifications.requestPermissionsAsync();
      }
      
      if (permissionResult) {
        const newStatus = permissionResult.status as "undetermined" | "granted" | "denied";
        setStatus(newStatus);
        return newStatus === "granted";
      }
      
      return false;
    } catch (error) {
      console.error("Error requesting permission:", error);
      return false;
    }
  };

  return { status, request, check: checkPermission };
}

// For camera permissions, export a separate hook that uses expo-camera's hook
export { useCameraPermissions } from "expo-camera";