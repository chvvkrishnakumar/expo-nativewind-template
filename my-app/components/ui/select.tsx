import * as React from "react";
import { Modal, Platform } from "react-native";
import { ChevronDownIcon, CheckIcon } from "./lib/icons";
import { Text } from "./text";
import { ScrollView } from "./scroll-view";
import { View } from "./view";
import { Pressable } from "./pressable";
import { cn } from "./utils/cn";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  value?: SelectOption;
  onValueChange?: (option: SelectOption | undefined) => void;
  options?: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({ 
  value, 
  onValueChange, 
  options = [], 
  placeholder = "Select...",
  disabled = false,
  className 
}: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownPosition, setDropdownPosition] = React.useState({ top: 0, left: 0, width: 0 });
  const triggerRef = React.useRef<View>(null);

  const handleSelect = (option: SelectOption) => {
    onValueChange?.(option);
    setIsOpen(false);
  };

  const handleOpen = () => {
    if (disabled || !triggerRef.current) return;
    
    triggerRef.current.measure((x, y, width, height, pageX, pageY) => {
      setDropdownPosition({
        top: pageY + height + 2,
        left: pageX,
        width: Math.max(width, 120),
      });
      setIsOpen(true);
    });
  };

  return (
    <View className={className}>
      <Pressable
        ref={triggerRef}
        onPress={handleOpen}
        className={cn(
          "flex-row items-center justify-between rounded-md border border-input bg-background px-2 py-1",
          disabled && "opacity-50"
        )}
      >
        <Text variant="small" className={cn(!value && "text-muted-foreground", "mr-1")}>
          {value?.label || placeholder}
        </Text>
        <ChevronDownIcon className="h-3 w-3 opacity-50" />
      </Pressable>

      {isOpen && (
        <Modal
          transparent
          visible={isOpen}
          onRequestClose={() => setIsOpen(false)}
          animationType="fade"
        >
          <Pressable
            className="flex-1"
            style={{ backgroundColor: 'transparent' }}
            onPress={() => setIsOpen(false)}
          >
            <View 
              className="absolute bg-popover rounded-md border border-border shadow-lg overflow-hidden"
              style={{
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                width: dropdownPosition.width,
                maxHeight: 200,
              }}
            >
              <ScrollView>
                {options.map((option) => (
                  <Pressable
                    key={option.value}
                    onPress={() => handleSelect(option)}
                    className="flex-row items-center px-2 py-1.5 active:bg-accent"
                  >
                    <View className="w-4 mr-1">
                      {value?.value === option.value && (
                        <CheckIcon className="h-3 w-3" />
                      )}
                    </View>
                    <Text variant="small">{option.label}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
}

// Compatibility exports for DataTable
export const SelectTrigger = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <View className={className}>{children}</View>;
};

export const SelectContent = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const SelectValue = ({ placeholder }: { placeholder?: string }) => {
  return null;
};

export const SelectItem = ({ 
  value, 
  label, 
  children 
}: { 
  value: string; 
  label: string; 
  children: React.ReactNode;
}) => {
  return null;
};