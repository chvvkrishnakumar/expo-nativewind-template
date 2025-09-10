import type { LucideIcon } from "lucide-react-native";
import React from "react";

export function iconWithClassName(Icon: LucideIcon) {
  const IconComponent = (props: React.ComponentPropsWithoutRef<LucideIcon>) => {
    return <Icon {...props} />;
  };
  IconComponent.displayName = `IconWithClassName(${Icon.displayName || Icon.name || 'Icon'})`;
  return IconComponent;
}

iconWithClassName.displayName = "IconWithClassName";