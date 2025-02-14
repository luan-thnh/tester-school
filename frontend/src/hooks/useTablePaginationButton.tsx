import { useState } from "react";

export function useTablePaginationButton(initialPage: number, totalPages: number) {
    const [currentPage, setCurrentPage] = useState<number>(initialPage)
    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    return {
        currentPage,
        goToPage,
    };
}
