import { TableConfig } from '@/interfaces/table';
import { useState, useEffect, useCallback } from 'react';

interface PaginationState {
    currentPage: number;
    recordsPerPage: number;
}

const getStoredPaginationState = (tableId: string, tables: { [key: string]: TableConfig }, arrRecordsPerPage: number[]): PaginationState => {
    if (typeof window !== "undefined") {
        const stored = localStorage.getItem(`paginationState-${tableId}`);
        if (stored) {
            const parsed = JSON.parse(stored);
            const defaultRecordsPerPage = arrRecordsPerPage[0];
            return {
                currentPage: parsed.currentPage || 1,
                recordsPerPage: arrRecordsPerPage.includes(parsed.recordsPerPage) ? parsed.recordsPerPage : defaultRecordsPerPage,
            };
        }
    }

    const defaultRecordsPerPage = tables[tableId].arrRecordsPerPage?.[0] || arrRecordsPerPage[0];
    return { currentPage: 1, recordsPerPage: defaultRecordsPerPage };
};

const useTablePagination = (tables: { [key: string]: TableConfig }) => {
    const arrRecordsPerPage = Array.from(
        new Set(
            Object.values(tables)
                .flatMap(table => table.arrRecordsPerPage?.[0] ? [table.arrRecordsPerPage[0]] : [10]) // Use the first element or default to [10]
        )
    );

    const [paginationStates, setPaginationStates] = useState<{ [key: string]: PaginationState }>(
        Object.fromEntries(
            Object.keys(tables).map(tableId => [tableId, getStoredPaginationState(tableId, tables, arrRecordsPerPage)])
        )
    );

    useEffect(() => {
        Object.keys(paginationStates).forEach(tableId => {
            localStorage.setItem(`paginationState-${tableId}`, JSON.stringify(paginationStates[tableId]));
        });
    }, [paginationStates]);

    const handlePageChange = useCallback((tableId: string, newPage: number) => {
        setPaginationStates(prev => ({
            ...prev,
            [tableId]: { ...prev[tableId], currentPage: newPage }
        }));
    }, []);

    const handleRecordsPerPageChange = useCallback((tableId: string, newRecordsPerPage: number) => {
        setPaginationStates(prev => ({
            ...prev,
            [tableId]: { currentPage: 1, recordsPerPage: newRecordsPerPage } // Reset currentPage to 1
        }));
    }, []);

    const paginatedData = (tableId: string, data: any[]) => {
        const { currentPage, recordsPerPage } = paginationStates[tableId];
        const start = (currentPage - 1) * recordsPerPage;
        const end = start + recordsPerPage;
        return data.slice(start, end);
    };

    const totalPages = useCallback((tableId: string) => {
        const { totalRecords } = tables[tableId];
        const { recordsPerPage } = paginationStates[tableId];
        return Math.ceil(totalRecords / recordsPerPage);
    }, [paginationStates, tables]);

    const handlePreviousPage = useCallback((tableId: string) => {
        setPaginationStates(prev => {
            const { currentPage } = prev[tableId];
            const newPage = Math.max(1, currentPage - 1);
            handlePageChange(tableId, newPage);
            return prev;
        });
    }, [handlePageChange]);

    const handleNextPage = useCallback((tableId: string) => {
        setPaginationStates(prev => {
            const { currentPage } = prev[tableId];
            const newPage = Math.min(totalPages(tableId), currentPage + 1);
            handlePageChange(tableId, newPage);
            return prev;
        });
    }, [handlePageChange, totalPages]);

    const handleRecordsPerPage = useCallback((tableId: string, event: React.ChangeEvent<HTMLSelectElement>) => {
        handleRecordsPerPageChange(tableId, Number(event.target.value));
    }, [handleRecordsPerPageChange]);

    return {
        paginationStates,
        totalPages,
        handlePageChange,
        handleRecordsPerPageChange,
        paginatedData,
        handlePreviousPage,
        handleNextPage,
        handleRecordsPerPage
    };
};

export default useTablePagination;
