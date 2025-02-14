import React from "react";

interface DataTableProps {
    tableId: string;
    children: React.ReactNode;
    className?: string;
}

const DataTable: React.FC<DataTableProps> = ({
    tableId,
    children,
    className
}) => {
    return (
        <table
            id={tableId}
            className={` text-xs table-fixed mt-4 ${className}`}>
            {children}
        </table>
    );
};

export default DataTable;
