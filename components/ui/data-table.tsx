import * as React from "react";
import { type ListRenderItem, type ViewStyle, View as RNView } from "react-native";
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, ChevronUpIcon, ArrowUpDownIcon } from "./lib/icons";
import { Text } from "./text";
import { Checkbox } from "./checkbox";
import { ScrollView } from "./scroll-view";
import { Select } from "./select";
import { View, type ViewProps } from "./view";
import { FlatList } from "./flat-list";
import { Pressable } from "./pressable";
import { Spinner } from "./spinner";
import { cn } from "./utils/cn";

/**
 * DataTable Component
 * 
 * A comprehensive data table component with MUI DataGrid-style API.
 * Features pagination, sorting, selection, and custom cell rendering.
 * 
 * @example
 * ```tsx
 * // Simple usage
 * <DataTable 
 *   rows={users} 
 *   columns={[
 *     { field: 'id', headerName: 'ID', width: 70 },
 *     { field: 'name', headerName: 'Name', flex: 1 },
 *     { field: 'email', headerName: 'Email', width: 200 }
 *   ]}
 * />
 * 
 * // With controlled pagination
 * <DataTable 
 *   rows={data}
 *   columns={columns}
 *   page={page}
 *   pageSize={pageSize}
 *   onPageChange={setPage}
 *   onPageSizeChange={setPageSize}
 *   totalRows={1000}
 * />
 * ```
 */

export interface DataTableColumn<T> {
  field: Extract<keyof T, string>;
  headerName: string;
  width?: number;
  flex?: number;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  renderCell?: (params: { value: T[keyof T]; row: T }) => React.ReactNode;
}

export interface DataTableProps<T> extends Omit<ViewProps, "children"> {
  rows: T[];
  columns: DataTableColumn<T>[];
  
  // Pagination
  page?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  totalRows?: number;
  
  // Selection
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  
  // Other
  loading?: boolean;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  getRowId?: (row: T) => string | number;
  variant?: "default" | "striped";
}

function DataTableInner<T extends Record<string, any>>(
  props: DataTableProps<T> & { forwardedRef?: React.Ref<RNView> }
) {
  const {
    rows,
    columns,
    page = 0,
    pageSize = 10,
    pageSizeOptions = [5, 10, 20],
    onPageChange,
    onPageSizeChange,
    totalRows,
    selectable = false,
    onSelectionChange,
    loading = false,
    onRowClick,
    emptyMessage = "No data available",
    getRowId = (row: T) => (row as any).id as string | number,
    variant = "default",
    className,
    style,
    forwardedRef,
    ...viewProps
  } = props;

  // State
  const [selectedRows, setSelectedRows] = React.useState<Set<string | number>>(new Set());
  const [sortColumn, setSortColumn] = React.useState<Extract<keyof T, string> | null>(null);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");

  // Computed values
  const totalPages = Math.ceil((totalRows ?? rows.length) / pageSize);
  const displayRows = React.useMemo(() => {
    let processedRows = [...rows];

    // Apply sorting
    if (sortColumn) {
      processedRows.sort((a, b) => {
        const aValue = (a as any)[sortColumn];
        const bValue = (b as any)[sortColumn];

        if (aValue === bValue) return 0;
        if (aValue == null) return 1;
        if (bValue == null) return -1;

        if (sortDirection === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    // Apply pagination (if totalRows is not provided, we're doing client-side pagination)
    if (!totalRows) {
      const start = page * pageSize;
      const end = start + pageSize;
      processedRows = processedRows.slice(start, end);
    }

    return processedRows;
  }, [rows, sortColumn, sortDirection, page, pageSize, totalRows]);

  // Handlers
  const handleSort = React.useCallback((field: Extract<keyof T, string>) => {
    if (sortColumn === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(field);
      setSortDirection("asc");
    }
  }, [sortColumn]);

  const handleSelectAll = React.useCallback(() => {
    if (selectedRows.size === displayRows.length) {
      setSelectedRows(new Set());
    } else {
      const allIds = displayRows.map(row => getRowId(row));
      setSelectedRows(new Set(allIds));
    }
  }, [selectedRows.size, displayRows, getRowId]);

  const handleRowSelect = React.useCallback((rowId: string | number) => {
    setSelectedRows(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(rowId)) {
        newSelection.delete(rowId);
      } else {
        newSelection.add(rowId);
      }
      return newSelection;
    });
  }, []);

  // Effects
  React.useEffect(() => {
    if (onSelectionChange) {
      const selectedItems = rows.filter(row => selectedRows.has(getRowId(row)));
      onSelectionChange(selectedItems);
    }
  }, [selectedRows, rows, onSelectionChange, getRowId]);

  // Calculate column widths
  const calculateColumnStyle = React.useCallback((column: DataTableColumn<T>, index: number): ViewStyle => {
    const isLastColumn = index === columns.length - 1;
    
    // Fixed width column
    if (column.width) {
      return { 
        width: column.width, 
        minWidth: column.width,
        maxWidth: column.width 
      };
    }
    
    // Flex column (only last column can be flexible)
    if (column.flex) {
      if (isLastColumn) {
        return { 
          flex: column.flex, 
          minWidth: 120
        };
      } else {
        // Non-last flex columns become fixed width
        return {
          width: 200,
          minWidth: 120
        };
      }
    }
    
    // Default: last column is flexible, others are fixed
    if (isLastColumn) {
      return { 
        flex: 1,
        minWidth: 120
      };
    }
    return { 
      width: 150,
      minWidth: 120
    };
  }, [columns.length]);

  // Header component
  const renderHeader = React.useCallback(() => {
    return (
      <View className="flex-row border-b border-border bg-muted/40">
        {selectable && (
          <View className="w-12 items-center justify-center p-2">
            <Checkbox
              checked={selectedRows.size === displayRows.length && displayRows.length > 0}
              onCheckedChange={handleSelectAll}
            />
          </View>
        )}
        {columns.map((column, index) => {
          const columnStyle = calculateColumnStyle(column, index);
          const textAlign = column.align || "left";

          return (
            <Pressable
              key={column.field as string}
              style={columnStyle}
              className="flex-row items-center p-3"
              onPress={() => column.sortable && handleSort(column.field)}
            >
              <Text
                variant="small"
                className={cn(
                  "font-semibold flex-1",
                  textAlign === "center" && "text-center",
                  textAlign === "right" && "text-right"
                )}
                numberOfLines={1}
              >
                {column.headerName}
              </Text>
              {column.sortable && (
                <View className="ml-1">
                  {sortColumn === column.field ? (
                    sortDirection === "asc" ? (
                      <ChevronUpIcon className="w-3 h-3 text-foreground" />
                    ) : (
                      <ChevronDownIcon className="w-3 h-3 text-foreground" />
                    )
                  ) : (
                    <ArrowUpDownIcon className="w-3 h-3 text-muted-foreground" />
                  )}
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    );
  }, [selectable, columns, selectedRows.size, displayRows.length, handleSelectAll, handleSort, sortColumn, sortDirection, calculateColumnStyle]);

  // Render cell content
  const renderCellContent = React.useCallback((column: DataTableColumn<T>, row: T) => {
    const value = row[column.field];
    
    if (column.renderCell) {
      return column.renderCell({ value, row });
    }

    return (
      <Text
        variant="small"
        className={cn(
          column.align === "center" && "text-center",
          column.align === "right" && "text-right"
        )}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {String(value ?? "")}
      </Text>
    );
  }, []);

  // Render row
  const renderRow: ListRenderItem<T> = React.useCallback(({ item, index }: { item: T; index: number }) => {
    const rowId = getRowId(item);
    const isSelected = selectedRows.has(rowId);
    const isStriped = variant === "striped" && index % 2 === 1;

    return (
      <Pressable
        onPress={() => onRowClick?.(item)}
        className={cn(
          "flex-row border-b border-border",
          isStriped && "bg-muted/20",
          onRowClick && "active:opacity-70"
        )}
      >
        {selectable && (
          <Pressable
            onPress={() => handleRowSelect(rowId)}
            className="w-12 items-center justify-center p-2"
          >
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => handleRowSelect(rowId)}
            />
          </Pressable>
        )}
        {columns.map((column, index) => {
          const columnStyle = calculateColumnStyle(column, index);
          return (
            <View key={column.field as string} style={columnStyle} className="p-3">
              {renderCellContent(column, item)}
            </View>
          );
        })}
      </Pressable>
    );
  }, [selectedRows, selectable, onRowClick, variant, columns, getRowId, handleRowSelect, renderCellContent, calculateColumnStyle]);

  // Pagination component
  const renderPagination = React.useCallback(() => {
    if (!onPageChange && !onPageSizeChange) return null;

    return (
      <View className="flex-row items-center justify-between p-3 border-t border-border">
        <View className="flex-row items-center gap-3">
          <Text variant="small" className="text-muted-foreground">
            Rows per page:
          </Text>
          <Select
            value={{ value: String(pageSize), label: String(pageSize) }}
            onValueChange={(option) => option && onPageSizeChange?.(Number(option.value))}
            options={pageSizeOptions.map(size => ({ 
              value: String(size), 
              label: String(size) 
            }))}
            className="w-20"
          />
        </View>

        <View className="flex-row items-center gap-2">
          <Text variant="small" className="text-muted-foreground">
            {page * pageSize + 1}-{Math.min((page + 1) * pageSize, totalRows ?? rows.length)} of{" "}
            {totalRows ?? rows.length}
          </Text>
          <View className="flex-row gap-1">
            <Pressable
              onPress={() => onPageChange?.(page - 1)}
              disabled={page === 0}
              className="p-1 rounded active:bg-muted"
            >
              <ChevronLeftIcon
                className={cn(
                  "w-4 h-4",
                  page === 0 ? "text-muted-foreground/30" : "text-foreground"
                )}
              />
            </Pressable>
            <Pressable
              onPress={() => onPageChange?.(page + 1)}
              disabled={page >= totalPages - 1}
              className="p-1 rounded active:bg-muted"
            >
              <ChevronRightIcon
                className={cn(
                  "w-4 h-4",
                  page >= totalPages - 1 ? "text-muted-foreground/30" : "text-foreground"
                )}
              />
            </Pressable>
          </View>
        </View>
      </View>
    );
  }, [onPageChange, onPageSizeChange, page, pageSize, pageSizeOptions, totalRows, rows.length, totalPages]);

  // Loading state
  if (loading) {
    return (
      <View
        ref={forwardedRef}
        className={cn("flex-1 items-center justify-center p-8", className)}
        style={style}
        {...viewProps}
      >
        <Spinner size="large" />
        <Text variant="muted" className="mt-2">
          Loading...
        </Text>
      </View>
    );
  }

  // Empty state
  if (rows.length === 0) {
    return (
      <View
        ref={forwardedRef}
        className={cn("flex-1 items-center justify-center p-8", className)}
        style={style}
        {...viewProps}
      >
        <Text variant="muted">{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <View
      ref={forwardedRef}
      className={cn("flex-1 border border-border rounded-lg overflow-hidden", className)}
      style={style}
      {...viewProps}
    >
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ minWidth: '100%' }}>
          {renderHeader()}
          <FlatList
            data={displayRows}
            renderItem={renderRow}
            keyExtractor={(item) => String(getRowId(item))}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center p-8">
                <Text variant="muted">{emptyMessage}</Text>
              </View>
            }
            removeClippedSubviews={true}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={10}
          />
        </View>
      </ScrollView>
      {renderPagination()}
    </View>
  );
}

// Export with proper typing
const DataTableComponent = React.forwardRef<RNView, DataTableProps<any>>(
  (props, ref) => <DataTableInner {...props} forwardedRef={ref} />
);

DataTableComponent.displayName = "DataTable";

export const DataTable = DataTableComponent as <T extends Record<string, any>>(
  props: DataTableProps<T> & React.RefAttributes<RNView>
) => React.ReactElement;