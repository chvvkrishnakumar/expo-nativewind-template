import { Platform } from "react-native";

export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";
export const isWeb = Platform.OS === "web";

export const select = Platform.select;

export const platformStyles = {
  shadow: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    android: {
      elevation: 4,
    },
    default: {},
  }),
  
  smallShadow: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 1,
    },
    android: {
      elevation: 2,
    },
    default: {},
  }),
};