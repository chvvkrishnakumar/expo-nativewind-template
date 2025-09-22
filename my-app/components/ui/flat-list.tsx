import * as React from "react";
import { FlatList as RNFlatList, type FlatListProps as RNFlatListProps } from "react-native";
import { cn } from "./utils/cn";

export interface FlatListProps<ItemT> extends RNFlatListProps<ItemT> {
  className?: string;
  contentContainerClassName?: string;
}

// Using a function component instead of forwardRef due to generic constraints
function FlatListInner<ItemT>(
  props: FlatListProps<ItemT> & { forwardedRef?: React.Ref<RNFlatList<ItemT>> }
) {
  const { 
    className, 
    contentContainerClassName,
    contentContainerStyle,
    style,
    forwardedRef,
    ...rest 
  } = props;

  return (
    <RNFlatList
      ref={forwardedRef}
      className={cn(className)}
      contentContainerClassName={cn(contentContainerClassName)}
      contentContainerStyle={contentContainerStyle}
      style={style}
      {...rest}
    />
  );
}

// Export with proper typing for generics
export const FlatList = React.forwardRef(FlatListInner) as <ItemT = any>(
  props: FlatListProps<ItemT> & React.RefAttributes<RNFlatList<ItemT>>
) => React.ReactElement;

(FlatList as any).displayName = "FlatList";