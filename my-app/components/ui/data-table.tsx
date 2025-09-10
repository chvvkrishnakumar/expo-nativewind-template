import * as React from "react";
import {
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
  type ViewProps,
  type ListRenderItem,
} from "react-native";
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, ChevronUpIcon, ArrowUpDownIcon } from "./lib/icons";
import { Text } from "./text";
import { Checkbox } from "./checkbox";
import { ScrollView } from "./scroll-view";
import { cn } from "./utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

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

export interface DataTableColumn {
  field: string;
  headerName: string;
  width?: number;
  flex?: number;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  renderCell?: (params: { value: any; row: any }) => React.ReactNode;
}

export interface DataTableProps extends Omit<ViewProps, "children"> {
  rows: any[];
  columns: DataTableColumn[];
  
  // Pagination
  page?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  totalRows?: number;
  
  // Selection
  selectable?: boolean;
  onSelectionChange?: (selectedRows: any[]) => void;
  
  // Other
  loading?: boolean;
  onRowClick?: (row: any) => void;
  emptyMessage?: string;
  getRowId?: (row: any) => string | number;
  variant?: "default" | "striped";
}

const tableVariants = cva("", {
  variants: {
    variant: {
      default: "",
      striped: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const DataTable = React.forwardRef<
  React.ElementRef<typeof View>,
  DataTableProps
>(
  (
    {
      rows,
      columns,
      page: controlledPage,
      pageSize: controlledPageSize,
      pageSizeOptions = [10, 25, 50],
      onPageChange,
      onPageSizeChange,
      totalRows,
      selectable = false,
      onSelectionChange,
      loading = false,
      onRowClick,
      emptyMessage = "No data available",
      getRowId = (row) => row.id,
      variant = "default",
      className,
      ...props
    },
    ref
  ) => {
    // Internal state for uncontrolled mode
    const [internalPage, setInternalPage] = React.useState(0);
    const [internalPageSize, setInternalPageSize] = React.useState(
      pageSizeOptions[0] || 10
    );
    const [selectedRows, setSelectedRows] = React.useState<Set<string | number>>(
      new Set()
    );
    const [sortColumn, setSortColumn] = React.useState<string | null>(null);
    const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");
    const [showPageSizeDropdown, setShowPageSizeDropdown] = React.useState(false);

    // Use controlled values if provided, otherwise use internal state
    const currentPage = controlledPage ?? internalPage;
    const currentPageSize = controlledPageSize ?? internalPageSize;
    const totalRowCount = totalRows ?? rows.length;

    // Handle page changes
    const handlePageChange = (newPage: number) => {
      if (controlledPage === undefined) {
        setInternalPage(newPage);
      }
      onPageChange?.(newPage);
    };

    // Handle page size changes
    const handlePageSizeChange = (newSize: number) => {
      if (controlledPageSize === undefined) {
        setInternalPageSize(newSize);
        // Reset to first page when page size changes
        setInternalPage(0);
      }
      onPageSizeChange?.(newSize);
      if (controlledPage === undefined) {
        onPageChange?.(0);
      }
      setShowPageSizeDropdown(false);
    };

    // Handle sorting
    const handleSort = (field: string) => {
      if (sortColumn === field) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortColumn(field);
        setSortDirection("asc");
      }
    };

    // Sort rows
    const sortedRows = React.useMemo(() => {
      if (!sortColumn) return rows;
      
      return [...rows].sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        
        if (aVal === bVal) return 0;
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        
        const comparison = aVal < bVal ? -1 : 1;
        return sortDirection === "asc" ? comparison : -comparison;
      });
    }, [rows, sortColumn, sortDirection]);

    // Paginate rows
    const paginatedRows = React.useMemo(() => {
      const start = currentPage * currentPageSize;
      const end = start + currentPageSize;
      return sortedRows.slice(start, end);
    }, [sortedRows, currentPage, currentPageSize]);

    // Handle row selection
    const handleRowSelect = (rowId: string | number) => {
      const newSelected = new Set(selectedRows);
      if (newSelected.has(rowId)) {
        newSelected.delete(rowId);
      } else {
        newSelected.add(rowId);
      }
      setSelectedRows(newSelected);
      
      if (onSelectionChange) {
        const selectedRowData = rows.filter((row) =>
          newSelected.has(getRowId(row))
        );
        onSelectionChange(selectedRowData);
      }
    };

    // Handle select all
    const handleSelectAll = () => {
      if (selectedRows.size === paginatedRows.length) {
        setSelectedRows(new Set());
        onSelectionChange?.([]);
      } else {
        const newSelected = new Set(paginatedRows.map((row) => getRowId(row)));
        setSelectedRows(newSelected);
        onSelectionChange?.(paginatedRows);
      }
    };

    const isAllSelected =
      paginatedRows.length > 0 && selectedRows.size === paginatedRows.length;

    // Calculate column widths
    const totalFixedWidth = columns.reduce(
      (sum, col) => sum + (col.width || 0),
      0
    );
    const flexColumns = columns.filter((col) => col.flex);
    const flexUnit = flexColumns.length > 0 ? 1 / flexColumns.length : 0;

    // Render header
    const renderHeader = () => (
      <View className="flex-row border-b border-border bg-muted/50">
        {selectable && (
          <Pressable
            onPress={handleSelectAll}
            className="w-12 px-3 py-3 items-center justify-center"
          >
            <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} />
          </Pressable>
        )}
        {columns.map((column) => {
          const width = column.width || (column.flex ? `${column.flex * flexUnit * 100}%` : 100);
          const alignClass = column.align === "center" ? "items-center" : column.align === "right" ? "items-end" : "items-start";
          
          return (
            <Pressable
              key={column.field}
              onPress={() => column.sortable && handleSort(column.field)}
              className={cn(
                "px-3 py-3 flex-row",
                alignClass,
                column.sortable && "active:opacity-70"
              )}
              style={{ width }}
            >
              <Text variant="small" className="font-medium">
                {column.headerName}
              </Text>
              {column.sortable && (
                <View className="ml-1">
                  {sortColumn === column.field ? (
                    sortDirection === "asc" ? (
                      <ChevronUpIcon className="h-4 w-4 text-foreground" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4 text-foreground" />
                    )
                  ) : (
                    <ArrowUpDownIcon className="h-4 w-4 text-muted-foreground" />
                  )}
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    );

    // Render row
    const renderRow: ListRenderItem<any> = ({ item, index }) => {
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
              className="w-12 px-3 py-3 items-center justify-center"
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => handleRowSelect(rowId)}
              />
            </Pressable>
          )}
          {columns.map((column) => {
            const value = item[column.field];
            const width = column.width || (column.flex ? `${column.flex * flexUnit * 100}%` : 100);
            const alignClass = column.align === "center" ? "items-center" : column.align === "right" ? "items-end" : "items-start";

            return (
              <View
                key={column.field}
                className={cn("px-3 py-3", alignClass)}
                style={{ width }}
              >
                {column.renderCell ? (
                  column.renderCell({ value, row: item })
                ) : (
                  <Text variant="small" numberOfLines={1}>
                    {value?.toString() || ""}
                  </Text>
                )}
              </View>
            );
          })}
        </Pressable>
      );
    };

    // Calculate pagination info
    const totalPages = Math.ceil(totalRowCount / currentPageSize);
    const startRow = currentPage * currentPageSize + 1;
    const endRow = Math.min((currentPage + 1) * currentPageSize, totalRowCount);

    if (loading) {
      return (
        <View
          ref={ref}
          className={cn("flex-1 items-center justify-center p-8", className)}
          {...props}
        >
          <ActivityIndicator size="large" />
          <Text variant="muted" className="mt-2">
            Loading...
          </Text>
        </View>
      );
    }

    return (
      <View
        ref={ref}
        className={cn("flex-1 border border-border rounded-lg", className)}
        {...props}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ minWidth: "100%" }}>
            {renderHeader()}
            <FlatList
              data={paginatedRows}
              renderItem={renderRow}
              keyExtractor={(item) => getRowId(item).toString()}
              scrollEnabled={false}
              ListEmptyComponent={
                <View className="p-8 items-center">
                  <Text variant="muted">{emptyMessage}</Text>
                </View>
              }
            />
          </View>
        </ScrollView>

        {/* Pagination controls */}
        <View className="flex-row items-center justify-between p-3 border-t border-border bg-muted/30">
          <View className="flex-row items-center gap-3">
            <Text variant="small" className="text-muted-foreground">
              Rows per page:
            </Text>
            
            <View className="relative">
              <Pressable
                onPress={() => setShowPageSizeDropdown(!showPageSizeDropdown)}
                className="flex-row items-center gap-1 px-3 py-1.5 bg-background border border-border rounded-md"
              >
                <Text variant="small">{currentPageSize}</Text>
                <ChevronDownIcon className="h-4 w-4" />
              </Pressable>
              
              {showPageSizeDropdown && (
                <View className="absolute bottom-full mb-1 right-0 bg-background border border-border rounded-md shadow-lg z-10">
                  {pageSizeOptions.map((size) => (
                    <Pressable
                      key={size}
                      onPress={() => handlePageSizeChange(size)}
                      className={cn(
                        "px-4 py-2",
                        size === currentPageSize && "bg-muted"
                      )}
                    >
                      <Text variant="small">{size}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          </View>

          <View className="flex-row items-center gap-3">
            <Text variant="small" className="text-muted-foreground">
              {startRow}-{endRow} of {totalRowCount}
            </Text>
            
            <View className="flex-row items-center gap-1">
              <Pressable
                onPress={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className={cn(
                  "p-2 rounded-md bg-background border border-border",
                  currentPage === 0 ? "opacity-50" : "active:bg-muted"
                )}
              >
                <ChevronLeftIcon className="h-5 w-5 text-foreground" />
              </Pressable>
              
              <Pressable
                onPress={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                className={cn(
                  "p-2 rounded-md bg-background border border-border",
                  currentPage >= totalPages - 1 ? "opacity-50" : "active:bg-muted"
                )}
              >
                <ChevronRightIcon className="h-5 w-5 text-foreground" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  }
);

DataTable.displayName = "DataTable";