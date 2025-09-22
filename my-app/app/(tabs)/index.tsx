import React from "react";
import { View, Pressable, Alert } from "react-native";
import * as Clipboard from "expo-clipboard";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  DataTable,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerItem,
  DrawerSeparator,
  DrawerTitle,
  DrawerTrigger,
  HomeIcon,
  Input,
  KeyboardAvoidingView,
  Label,
  PermissionRequester,
  SafeAreaView,
  ScrollView,
  SettingsIcon,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Switch,
  Text,
  UserIcon,
} from "@/components/ui";

export default function UIShowcase() {
  const [switchValue, setSwitchValue] = React.useState(false);
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [tablePage, setTablePage] = React.useState(0);
  const [tablePageSize, setTablePageSize] = React.useState(5);

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <KeyboardAvoidingView className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerClassName="p-4"
          refreshing={refreshing}
          onRefresh={handleRefresh}
        >
          <Text variant="h1" className="mb-4">
            UI Components Showcase
          </Text>

          {/* Quick Start Guide */}
          <Card className="mb-8 border-primary/20">
            <CardHeader>
              <CardTitle>
                <Text variant="h3">🚀 Quick Start Guide</Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Text variant="p" className="mb-3">
                Welcome! This showcase demonstrates all UI components available
                in your template.
              </Text>
              <View className="gap-2 mb-4">
                <Text variant="small" className="text-muted-foreground">
                  💡 <Text className="font-semibold">Pro tip:</Text> Tap any
                  code block to copy it!
                </Text>
                <Text variant="small" className="text-muted-foreground">
                  🎨 <Text className="font-semibold">Dark mode:</Text> Toggle in
                  your device settings
                </Text>
                <Text variant="small" className="text-muted-foreground">
                  📱 <Text className="font-semibold">Platform:</Text> Components
                  adapt to iOS/Android automatically
                </Text>
              </View>
              <Pressable
                className="bg-muted p-3 rounded-md active:bg-muted/80"
                onPress={async () => {
                  const code = `import { Button, Text } from '@/components/ui';

export default function MyScreen() {
  return (
    <Button onPress={() => alert('Hello!')}>
      <Text>Get Started</Text>
    </Button>
  );
}`;
                  await Clipboard.setStringAsync(code);
                  Alert.alert("Copied!", "Code copied to clipboard");
                }}
              >
                <Text variant="code" className="text-xs">
                  {`import { Button, Text } from '@/components/ui';

export default function MyScreen() {
  return (
    <Button onPress={() => alert('Hello!')}>
      <Text>Get Started</Text>
    </Button>
  );
}`}
                </Text>
              </Pressable>
            </CardContent>
          </Card>

          {/* Buttons Section */}
          <Text variant="h2" className="mb-4">
            Buttons
          </Text>
          <Card className="mb-3">
            <CardContent className="pt-3">
              <Pressable
                onPress={async () => {
                  await Clipboard.setStringAsync(`<Button variant="default" onPress={handlePress}>
  <Text>Click me</Text>
</Button>`);
                  Alert.alert("Copied!", "Button code copied");
                }}
              >
                <Text variant="code" className="text-xs">
                  Tap to copy button code
                </Text>
              </Pressable>
            </CardContent>
          </Card>
          <View className="flex-row flex-wrap gap-2 mb-8">
            <Button
              onPress={() => {
                /* Handle button press */
              }}
            >
              <Text>Default</Text>
            </Button>
            <Button variant="secondary">
              <Text>Secondary</Text>
            </Button>
            <Button variant="destructive">
              <Text>Destructive</Text>
            </Button>
            <Button variant="outline">
              <Text>Outline</Text>
            </Button>
            <Button variant="ghost">
              <Text>Ghost</Text>
            </Button>
            <Button variant="link">
              <Text>Link</Text>
            </Button>
          </View>

          {/* Button Sizes */}
          <Text variant="h3" className="mb-4">
            Button Sizes
          </Text>
          <View className="flex-row flex-wrap gap-2 mb-8">
            <Button size="sm">
              <Text>Small</Text>
            </Button>
            <Button size="default">
              <Text>Default</Text>
            </Button>
            <Button size="lg">
              <Text>Large</Text>
            </Button>
          </View>

          {/* Cards Section */}
          <Text variant="h2" className="mb-4">
            Cards
          </Text>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                <Text>Card Title</Text>
              </CardTitle>
              <CardDescription>
                <Text>
                  Card description goes here. This is a sample card component.
                </Text>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Text>Card content can contain any elements you need.</Text>
            </CardContent>
            <CardFooter>
              <Button>
                <Text>Action</Text>
              </Button>
            </CardFooter>
          </Card>

          {/* Form Elements */}
          <Text variant="h2" className="mb-4">
            Form Elements
          </Text>
          <View className="gap-4 mb-8">
            <View>
              <Label>
                <Text>Input Field</Text>
              </Label>
              <Input placeholder="Enter text here..." />
            </View>

            <View className="flex-row items-center justify-between">
              <Label>
                <Text>Switch</Text>
              </Label>
              <Switch checked={switchValue} onCheckedChange={setSwitchValue} />
            </View>

            <View className="flex-row items-center gap-2">
              <Checkbox
                checked={checkboxValue}
                onCheckedChange={setCheckboxValue}
              />
              <Label onPress={() => setCheckboxValue(!checkboxValue)}>
                <Text>Checkbox Label</Text>
              </Label>
            </View>
          </View>

          {/* Badges */}
          <Text variant="h2" className="mb-4">
            Badges
          </Text>
          <View className="flex-row flex-wrap gap-2 mb-8">
            <Badge>
              <Text>Default</Text>
            </Badge>
            <Badge variant="secondary">
              <Text>Secondary</Text>
            </Badge>
            <Badge variant="destructive">
              <Text>Destructive</Text>
            </Badge>
            <Badge variant="outline">
              <Text>Outline</Text>
            </Badge>
          </View>

          {/* Typography */}
          <Text variant="h2" className="mb-4">
            Typography
          </Text>
          <View className="gap-2 mb-8">
            <Text variant="h1">Heading 1</Text>
            <Text variant="h2">Heading 2</Text>
            <Text variant="h3">Heading 3</Text>
            <Text variant="h4">Heading 4</Text>
            <Text variant="h5">Heading 5</Text>
            <Text variant="h6">Heading 6</Text>
            <Text variant="p">This is a paragraph text.</Text>
            <Text variant="lead">This is lead text.</Text>
            <Text variant="large">This is large text.</Text>
            <Text variant="small">This is small text.</Text>
            <Text variant="muted">This is muted text.</Text>
            <Text variant="code">This is code text.</Text>
          </View>

          {/* Dialog & Sheet Components */}
          <Text variant="h2" className="mb-4">
            Dialogs & Sheets
          </Text>
          <View className="gap-3 mb-8">
            {/* Dialog Example */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Text>Open Dialog</Text>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    <Text variant="h4">Confirm Action</Text>
                  </DialogTitle>
                  <DialogDescription>
                    <Text variant="muted">
                      Are you sure you want to proceed? This action cannot be
                      undone.
                    </Text>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onPress={() => setDialogOpen(false)}
                  >
                    <Text>Cancel</Text>
                  </Button>
                  <Button onPress={() => setDialogOpen(false)}>
                    <Text>Confirm</Text>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Sheet Example */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="secondary">
                  <Text>Open Bottom Sheet</Text>
                </Button>
              </SheetTrigger>
              <SheetContent snapPoints={["25%", "50%", "90%"]}>
                <SheetHeader>
                  <SheetTitle>
                    <Text variant="h4">Bottom Sheet</Text>
                  </SheetTitle>
                  <SheetDescription>
                    <Text variant="muted">
                      Swipe down to dismiss or tap the X button
                    </Text>
                  </SheetDescription>
                </SheetHeader>
                <View className="mt-4">
                  <Text>This is a bottom sheet that can be dragged.</Text>
                  <Text className="mt-2">
                    It supports multiple snap points.
                  </Text>
                </View>
              </SheetContent>
            </Sheet>

            {/* Drawer Example */}
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline">
                  <Text>Open Drawer Menu</Text>
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>
                    <Text variant="h4">Menu</Text>
                  </DrawerTitle>
                </DrawerHeader>
                <DrawerItem
                  icon={<HomeIcon className="h-5 w-5 text-foreground" />}
                >
                  <Text>Home</Text>
                </DrawerItem>
                <DrawerItem
                  icon={<UserIcon className="h-5 w-5 text-foreground" />}
                >
                  <Text>Profile</Text>
                </DrawerItem>
                <DrawerSeparator />
                <DrawerItem
                  icon={<SettingsIcon className="h-5 w-5 text-foreground" />}
                >
                  <Text>Settings</Text>
                </DrawerItem>
              </DrawerContent>
            </Drawer>
          </View>

          {/* DataTable Example */}
          <Text variant="h2" className="mb-4">
            Data Table
          </Text>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                <Text>Interactive DataTable</Text>
              </CardTitle>
              <CardDescription>
                <Text>
                  MUI DataGrid-style table with sorting, pagination & selection
                </Text>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                rows={[
                  {
                    id: 1,
                    name: "John Doe",
                    email: "john@example.com",
                    role: "Admin",
                    status: "Active",
                  },
                  {
                    id: 2,
                    name: "Jane Smith",
                    email: "jane@example.com",
                    role: "User",
                    status: "Active",
                  },
                  {
                    id: 3,
                    name: "Bob Johnson",
                    email: "bob@example.com",
                    role: "User",
                    status: "Inactive",
                  },
                  {
                    id: 4,
                    name: "Alice Brown",
                    email: "alice@example.com",
                    role: "Moderator",
                    status: "Active",
                  },
                  {
                    id: 5,
                    name: "Charlie Wilson",
                    email: "charlie@example.com",
                    role: "User",
                    status: "Active",
                  },
                  {
                    id: 6,
                    name: "Diana Ross",
                    email: "diana@example.com",
                    role: "Admin",
                    status: "Active",
                  },
                  {
                    id: 7,
                    name: "Edward Norton",
                    email: "edward@example.com",
                    role: "User",
                    status: "Inactive",
                  },
                  {
                    id: 8,
                    name: "Fiona Apple",
                    email: "fiona@example.com",
                    role: "Moderator",
                    status: "Active",
                  },
                ]}
                columns={[
                  { field: "id", headerName: "ID", width: 60 },
                  {
                    field: "name",
                    headerName: "Name",
                    width: 120,
                    sortable: true,
                  },
                  {
                    field: "email",
                    headerName: "Email",
                    flex: 1,
                    sortable: true,
                  },
                  { field: "role", headerName: "Role", width: 100 },
                  {
                    field: "status",
                    headerName: "Status",
                    width: 100,
                    renderCell: ({ value }) => (
                      <Badge
                        variant={value === "Active" ? "default" : "secondary"}
                      >
                        <Text>{value}</Text>
                      </Badge>
                    ),
                  },
                ]}
                page={tablePage}
                pageSize={tablePageSize}
                pageSizeOptions={[5, 10, 20]}
                onPageChange={setTablePage}
                onPageSizeChange={setTablePageSize}
                selectable
                variant="striped"
                onRowClick={(row) =>
                  Alert.alert("Row Clicked", `Selected: ${row.name}`)
                }
              />

              <Pressable
                className="bg-muted p-3 rounded-md mt-4"
                onPress={async () => {
                  const code = `<DataTable
  rows={data}
  columns={[
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', flex: 1, sortable: true },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 100,
      renderCell: ({ value }) => <Badge>{value}</Badge>
    },
  ]}
  pageSizeOptions={[5, 10, 25]}
  selectable
  onRowClick={(row) => console.log(row)}
/>`;
                  await Clipboard.setStringAsync(code);
                  Alert.alert("Copied!", "DataTable example copied");
                }}
              >
                <Text variant="code" className="text-xs">
                  Tap to copy DataTable example
                </Text>
              </Pressable>
            </CardContent>
          </Card>

          {/* Permission Examples */}
          <Text variant="h2" className="mb-4">
            Permissions
          </Text>
          <Card className="mb-4">
            <CardContent className="pt-3">
              <Text variant="small" className="mb-2">
                📱 Check the Permissions tab for interactive hook examples
              </Text>
              <Pressable
                className="bg-muted p-3 rounded-md"
                onPress={async () => {
                  const code = `// Camera (special hook)
import { useCameraPermissions } from '@/components/ui';
const [permission, requestPermission] = useCameraPermissions();

// Other permissions
import { usePermission } from '@/components/ui';
const { status, request } = usePermission('location');

// Or use Expo APIs directly
import * as Location from 'expo-location';
const { status } = await Location.requestForegroundPermissionsAsync();`;
                  await Clipboard.setStringAsync(code);
                  Alert.alert("Copied!", "Permission examples copied");
                }}
              >
                <Text variant="code" className="text-xs">
                  Tap for permission hook examples
                </Text>
              </Pressable>
            </CardContent>
          </Card>
          <View className="gap-3 mb-8">
            {/* Use location permission instead of camera for demo */}
            <PermissionRequester
              permission="locationForeground"
              onPermissionGranted={() => {
                /* Handle location permission granted */
              }}
              onPermissionDenied={() => {
                /* Handle location permission denied */
              }}
            >
              {({ status, requestPermission }) => (
                <Button
                  variant={status === "granted" ? "secondary" : "default"}
                  onPress={requestPermission}
                >
                  <Text>
                    {status === "granted"
                      ? "✓ Location Access Granted"
                      : "Request Location Access"}
                  </Text>
                </Button>
              )}
            </PermissionRequester>

            <PermissionRequester
              permission="notifications"
              onPermissionGranted={() => {
                /* Handle notifications permission granted */
              }}
            >
              {({ status, requestPermission }) => (
                <Button
                  variant={status === "granted" ? "secondary" : "outline"}
                  onPress={requestPermission}
                >
                  <Text>
                    {status === "granted"
                      ? "✓ Notifications Enabled"
                      : "Enable Notifications"}
                  </Text>
                </Button>
              )}
            </PermissionRequester>

            <Card>
              <CardContent className="pt-6">
                <Text variant="small" className="mb-2">
                  Permission Hook Example:
                </Text>
                <View className="bg-muted p-3 rounded-md">
                  <Text variant="code" className="text-xs">
                    {`const { status, request } = usePermission("camera");

if (status !== "granted") {
  const granted = await request();
  if (!granted) return;
}
// Use camera...`}
                  </Text>
                </View>
              </CardContent>
            </Card>
          </View>

          {/* Hamburger Menu Demo */}
          <Text variant="h2" className="mb-4">
            Hamburger Menu
          </Text>
          <Card className="mb-8">
            <CardContent className="pt-6">
              <Text variant="muted" className="mb-2">
                Check the Menu tab for a full demo. Add to any screen:
              </Text>
              <View className="bg-muted p-3 rounded-md">
                <Text variant="code" className="text-xs">
                  {`<View className="relative">
  <HamburgerMenu 
    position="top-left"
    onPress={() => setDrawerOpen(true)} 
  />
  {/* Your screen content */}
</View>`}
                </Text>
              </View>
              <Text variant="small" className="mt-3">
                Position options: &quot;top-left&quot; or &quot;top-right&quot;
              </Text>
            </CardContent>
          </Card>

          {/* Safe Area Demo */}
          <Text variant="h2" className="mb-4">
            Layout Info
          </Text>
          <Card className="mb-8">
            <CardContent className="pt-6">
              <Text variant="small" className="mb-2">
                Pull down to refresh
              </Text>
              <Text variant="muted">This screen uses:</Text>
              <Text variant="small">• SafeAreaView for notch handling</Text>
              <Text variant="small">• KeyboardAvoidingView for forms</Text>
              <Text variant="small">• ScrollView with pull-to-refresh</Text>
            </CardContent>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
