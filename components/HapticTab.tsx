import type { ComponentProps } from 'react';
import { PlatformPressable } from 'expo-router/react-navigation';
import * as Haptics from 'expo-haptics';

type HapticTabProps = ComponentProps<typeof PlatformPressable>;

export function HapticTab(props: HapticTabProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}
