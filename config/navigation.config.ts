/**
 * Navigation Config (Optional)
 * 
 * NOTE: For tabs, Expo Router automatically creates navigation items
 * for any file in the (tabs) folder. You don't need this config for basic tabs.
 * 
 * This config file is useful for:
 * 1. Drawer menu items configuration
 * 2. Dynamic navigation based on user roles/permissions
 * 3. Centralized navigation management for complex apps
 * 4. Navigation items that come from an API
 */

export type DrawerConfig = {
  divider: true;
  name?: never;
  title?: never;
  icon?: never;
  route?: never;
} | {
  divider?: false;
  name: string;
  title: string;
  icon?: string;
  route?: string;
}

export interface NavigationConfig {
  drawer: {
    items: DrawerConfig[];
  };
}

export const navigationConfig: NavigationConfig = {
  drawer: {
    items: [
      {
        name: "home",
        title: "Home",
        icon: "home",
        route: "/",
      },
      {
        name: "profile",
        title: "Profile", 
        icon: "person",
        route: "/profile",
      },
      {
        divider: true,
      },
      {
        name: "settings",
        title: "Settings",
        icon: "settings",
        route: "/settings",
      },
      // Add more drawer items here
    ],
  },
};
