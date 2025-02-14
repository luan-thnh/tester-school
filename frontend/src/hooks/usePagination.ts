import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface UsePaginationProps {
    initialPage?: number;
    totalPages: number;
}

const usePagination = ({ initialPage = 1, totalPages }: UsePaginationProps) => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const router = useRouter();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const pageParam = Number(urlParams.get('page'));
        if(urlParams.size == 0){
            router.push(``);
        }
        else if (!isNaN(pageParam) && pageParam >= 1 && pageParam <= totalPages) {
            setCurrentPage(pageParam);
            router.push(`?page=${pageParam}`);

        } else {
            router.push('/404');
            setCurrentPage(initialPage);
        }
    }, [initialPage, totalPages]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            router.push(`?page=${page}`);
        }
    };

    return {
        currentPage,
        handlePageChange,
    };
};

export default usePagination;
