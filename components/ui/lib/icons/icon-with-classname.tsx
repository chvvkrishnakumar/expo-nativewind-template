import type { LucideIcon } from "lucide-react-native";
import { cssInterop } from "nativewind";
import React from "react";

export function iconWithClassName(Icon: LucideIcon) {
  cssInterop(Icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
      },
    },
  });

  const IconComponent = (props: React.ComponentPropsWithoutRef<LucideIcon>) => {
    return <Icon {...props} />;
  };
  IconComponent.displayName = `IconWithClassName(${Icon.displayName || Icon.name || 'Icon'})`;
  return IconComponent;
}

iconWithClassName.displayName = "IconWithClassName";
