// hooks/useTableSelection.ts
import { useState, useCallback } from 'react';

// Define the type for table data
type TableData = { id: string }[];

interface TablesType {
    [key: string]: {
        id: string;
        data: TableData;
    };
}

interface UseTableSelectionResult {
    selectedItems: Record<string, string[]>;
    isAllSelected: (tableId: string) => boolean;
    handleSelectAll: (tableId: string) => void;
    handleCheckboxChange: (tableId: string, id: string) => void;
}

const useTableSelection = (initialTables: TablesType): UseTableSelectionResult => {
    const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>({});

    const isAllSelected = useCallback((tableId: string): boolean => {
        const table = initialTables[tableId];
        if (table && Array.isArray(table.data)) {
            const selectedIds = selectedItems[tableId] || [];
            return table.data.every((item) => selectedIds.includes(item.id));
        }
        console.error("Table data is not an array or tableId is incorrect:", table);
        return false;
    }, [selectedItems, initialTables]);

    const handleSelectAll = useCallback((tableId: string) => {
        const table = initialTables[tableId];
        if (table && Array.isArray(table.data)) {
            const allIds = table.data.map((item) => item.id);
            const isCurrentlySelected = isAllSelected(tableId);
            setSelectedItems((prev) => ({
                ...prev,
                [tableId]: isCurrentlySelected ? [] : allIds
            }));
        } else {
            console.error("Table data is not an array or tableId is incorrect:", table);
        }
    }, [isAllSelected, initialTables]);

    const handleCheckboxChange = useCallback((tableId: string, id: string) => {
        setSelectedItems((prev) => {
            const currentSelection = prev[tableId] || [];
            const isSelected = currentSelection.includes(id);
            const updatedSelection = isSelected
                ? currentSelection.filter((item) => item !== id)
                : [...currentSelection, id];
            return {
                ...prev,
                [tableId]: updatedSelection
            };
        });
    }, []);

    return {
        selectedItems,
        isAllSelected,
        handleSelectAll,
        handleCheckboxChange
    };
};

export default useTableSelection;
