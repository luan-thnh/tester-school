import { useState, useEffect, useCallback } from 'react';

// Define types for sort configuration and sort directions
type SortDirection = 'asc' | 'desc';

interface SortConfig {
    [tableId: string]: Array<{
        key: string;
        direction: SortDirection;
    }>;
}
const getInitialSortConfig = (): SortConfig => {
    try {
        if (typeof window !== "undefined") {
            const savedSortConfig = localStorage.getItem('sortConfig');
            if (savedSortConfig) {
                const parsedConfig = JSON.parse(savedSortConfig);
                if (parsedConfig && typeof parsedConfig === 'object') {
                    // Ensure the parsedConfig matches the SortConfig type
                    return Object.keys(parsedConfig).reduce((acc, key) => {
                        if (Array.isArray(parsedConfig[key])) {
                            acc[key] = parsedConfig[key].filter((item: any) =>
                                typeof item.key === 'string' &&
                                (item.direction === 'asc' || item.direction === 'desc')
                            );
                        }
                        return acc;
                    }, {} as SortConfig);
                }
            }
        }
    } catch (error) {
        console.error('Failed to parse sort configuration from local storage:', error);
    }
    return {};
};
export function useTableSorting(initialSortConfig: SortConfig = {}) {

    const [sortConfig, setSortConfig] = useState<SortConfig>(() => {
        const initialConfig = getInitialSortConfig();
        return Object.keys(initialSortConfig).length > 0 ? initialSortConfig : initialConfig;
    });
    useEffect(() => {
        try {
            const savedSortConfig = localStorage.getItem('sortConfig');
            if (savedSortConfig) {
                const parsedConfig = JSON.parse(savedSortConfig);
                if (parsedConfig && typeof parsedConfig === 'object') {
                    setSortConfig(parsedConfig);
                }
            }
        } catch (error) {
            console.error('Failed to parse sort configuration from local storage:', error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('sortConfig', JSON.stringify(sortConfig));
        } catch (error) {
            console.error('Failed to save sort configuration to local storage:', error);
        }
    }, [sortConfig]);

    const handleSort = useCallback((tableId: string, key: string) => {
        setSortConfig(prevConfig => {
            const existingSorts = prevConfig[tableId] || [];
            const index = existingSorts.findIndex(sort => sort.key === key);
            const newDirection: SortDirection =
                index !== -1 && existingSorts[index].direction === 'asc' ? 'desc' : 'asc';

            const updatedSorts = index !== -1
                ? [...existingSorts.slice(0, index), ...existingSorts.slice(index + 1)]
                : [...existingSorts];

            updatedSorts.unshift({ key, direction: newDirection });

            return {
                ...prevConfig,
                [tableId]: updatedSorts,
            };
        });
    }, []);

    const getSortedData = (tableId: string, data: any[]) => {
        const sorts = sortConfig[tableId] || [];
        return [...data].sort((a, b) => {
            for (const { key, direction } of sorts) {
                let aValue = a[key];
                let bValue = b[key];
                if (typeof aValue === 'object' && aValue !== null && 'title' in aValue) {
                    aValue = aValue.title;
                }
                if (typeof bValue === 'object' && bValue !== null && 'title' in bValue) {
                    bValue = bValue.title;
                }
                if (aValue === undefined) aValue = '';
                if (bValue === undefined) bValue = '';
                if (typeof aValue === "string" && typeof bValue === "string") {
                    const comparison = direction === 'asc'
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);

                    if (comparison !== 0) return comparison;
                } else if (typeof aValue === "number" && typeof bValue === "number") {
                    const comparison = direction === 'asc'
                        ? aValue - bValue
                        : bValue - aValue;
                    if (comparison !== 0) return comparison;
                }
            }
            return 0;
        });
    };

    return {
        sortConfig,
        handleSort,
        getSortedData,
    };
}
