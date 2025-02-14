"use client";
import "./style.css";
import LayoutContainer from "@/app/LayoutContainer";
import React, {useState} from "react";
import {
    ProductApprovalsData2,
    ProductApprovalsData3,
    nodes
} from "@/faker/ProductData";
import Input from "@/components/atoms/Input";
import Arrow from "@/assets/svgs/arrow_switch.svg"
import Trash from "@/assets/svgs/trash_larger.svg"
import CartReport from "@/assets/svgs/cart_report.svg"
import Wrench from "@/assets/svgs/wrench.svg"
import Inventory from "@/assets/svgs/inventory.svg"
import PaginationSelect from "@/components/molecules/Pagination/Select";
import Checkbox from "@/components/atoms/Checkbox";
import Sort from "@/assets/svgs/sort_arrow.svg";
import ValidityTime1 from "@/assets/svgs/validity_time_1.svg";
import ValidityTime2 from "@/assets/svgs/validity_time_2.svg";
import ValidityTime3 from "@/assets/svgs/validity_time_3.svg";
import Circle from "@/assets/svgs/circle.svg";
import ValidateServiceTime from "@/components/molecules/ValidateServiceTime";
import ValidateValidityTime from "@/components/molecules/ValidateValidityTime";
import Drawer from "@/components/molecules/Drawer";
import DrawerContent from "@/components/molecules/Drawer/components/DrawerContent";
import DrawerFooter from "@/components/molecules/Drawer/components/DrawerFooter";
import DataTable from "@/components/atoms/Datatable";
import useTableSelection from "@/hooks/useTableSelection";
import {useTableSorting} from "@/hooks/useTableSort";
import useTablePagination from "@/hooks/useTablePagination";
import { FormatTolerances, FormatNumber, FormatIndex, FormatTimeHours } from "@/utils";
import useProcessedData from "@/hooks/useProcessedData";
import {colorStatus} from "@/hooks/useColorStatus";
import {StatusEnum} from "@/enums/StatusNum";
import PropertyPending from "@/components/atoms/PropertyPending";
import StatusPending from "@/components/atoms/StatusPending";
import TimeFill from "@/assets/svgs/time_fill.svg";
import GroupInput from "@/components/molecules/GroupInput";
import TooltipCustom from "@/components/atoms/Tooltip";

const tables = {
    table1: {
        id: "table1",
        data: nodes,
        totalRecords: nodes.length
    },
    table2: {
        id: "table2",
        data: ProductApprovalsData2,
        totalRecords: ProductApprovalsData2.length,
        arrRecordsPerPage: [2, 5, 10]
    },
    table3: {
        id: "table3",
        data: ProductApprovalsData3,
        totalRecords: ProductApprovalsData3.length
    }
};

const Product = () => {
    const {
        selectedItems,
        isAllSelected,
        handleSelectAll,
        handleCheckboxChange
    } = useTableSelection(tables);
    const {handleSort, getSortedData} = useTableSorting();

    const {
        paginationStates,
        handlePageChange,
        handleRecordsPerPageChange,
        paginatedData
    } = useTablePagination(tables);

    const [isInputDisabled, setInputDisabled] = useState<
        Record<string, boolean>
    >({});
    const changeInputDisabled = (rowId: string) => {
        setInputDisabled((prevState) => ({
            ...prevState,
            [rowId]: !prevState[rowId]
        }));
    };
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => {
        setIsOpen(false);
    };
    const {processData} = useProcessedData();
    const processedData2 = processData(tables.table2.data);
    const processedData3 = processData(tables.table3.data);
    const primes = ["1B", "1A", "1", "3"];
    return (
        <LayoutContainer>
            <div className="flex flex-row m-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-primary text-base font-medium">
                        Product
                    </h1>
                    <p className="text-input text-[13px] font-normal">
                        Sales Order Management - Create Sales Order
                    </p>
                </div>
            </div>
            <div className="bg-highlight py-4">
                <DataTable className="w-full text-center table" tableId={""}>
                    <tr className="bg-white">
                        <th className={` w-[55px] border-l-0 `}>No</th>
                        <th className={`w-[55px] `}>Type</th>
                        <th>Specifications</th>
                        <th className={`w-[93px] `}>
                            <div className="flex flex-col">
                                Total coil
                                <span className="text-unit">(PCS)</span>
                            </div>
                        </th>
                        <th className={`w-[119px]`}>
                            <div className="flex flex-col">
                                Total weight
                                <span className="text-unit">(KG)</span>
                            </div>
                        </th>
                        <th className={`w-[113px]`}>Prime</th>
                        <th className={`w-[158px]`}>Preferred tolerances</th>
                        <th className={`w-[120px] `}>
                            <div className="flex flex-col">
                                Unit price
                                <span className="text-unit">(PCS)</span>
                            </div>
                        </th>
                        <th className={`w-[120px]`}>
                            <div className="flex flex-col">
                                Total price
                                <span className="text-unit">(VND)</span>
                            </div>
                        </th>
                        <th className={`w-[64px]`}>Status</th>
                        <th className={`w-[115px]`}>Action</th>
                    </tr>
                    {
                        tables.table1.data.map((item, index) => {
                            index += 1
                            const statusClass = colorStatus[item.status as StatusEnum];
                            const No = FormatIndex(index, tables.table1.data.length)
                            const { value1, value2 } = FormatTolerances(item.preferredTolerances);
                            return (
                                <tr key={item.id} className="odd:bg-white even:bg-highlight">
                                    <td className={` border-l-0`}>{No}</td>
                                    <td >
                                        <div className="flex justify-center">
                                            <CartReport className="size-6" />
                                        </div>
                                    </td>
                                    <td className={`text-start px-2 leading-[15.51px]`}>{item.specifications}</td>
                                    <td colSpan={2}>
                                        <div className="flex flex-row gap-x-[9px] justify-center px-2">
                                            <Input isDisabled={isInputDisabled[item.id]} value={item.totalCoil} className="w-full flex flex-row justify-center" isContentCenter>
                                            </Input>
                                            <div className="flex flex-row justify-center items-center">
                                                <Arrow className="w-4 h-4 text-gray-10 hover:cursor-pointer hover:opacity-80"
                                                    onClick={() => changeInputDisabled(item.id)} />
                                            </div>
                                            <Input isDisabled={!isInputDisabled[item.id]} value={FormatNumber(Number(item.totalWeight))} className=" w-full flex flex-row justify-center" isContentCenter>
                                            </Input>
                                        </div>
                                    </td>
                                    <td >
                                        <div className="flex justify-center items-center px-2">
                                            <Input variant="select" optionSelect={primes} isContentCenter={false} className="min-w-[97px]" ></Input>
                                        </div>
                                    </td>
                                    <td >
                                        <div className="px-2">
                                            <GroupInput value1={value1} value2={value2} >
                                            </GroupInput>
                                        </div>
                                    </td>
                                    <td >
                                        <div className="flex justify-center">
                                            <TooltipCustom
                                                placement="top"
                                                message="Old price information 31,500 VND"
                                            >
                                                <p className="hover:cursor-pointer">{FormatNumber(item.unitPrice)}</p>
                                            </TooltipCustom>
                                        </div>

                                    </td>
                                    <td >  {FormatNumber(item.totalPrice)}</td>
                                    <td >
                                        <div className="flex justify-center">
                                            <Inventory className={`size-5 ${statusClass}`} />
                                        </div>
                                    </td>
                                    <td >
                                        <div className="flex flex-row justify-center gap-2">
                                            {
                                                item.action.includes("delete") && <Trash className="size-6" />
                                            }
                                            {
                                                item.action.includes("edit") && <Wrench className="size-6" />
                                            }
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </DataTable>
            </div>
            <div className="flex flex-row m-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-primary text-base font-medium">
                        Product Approvals
                    </h1>
                </div>
            </div>
            <div className="flex flex-row my-4 bg-highlight p-4 items-center justify-between">
                <div className="flex flex-col gap-1"></div>
                <div className="flex flex-col gap-1">
                    <PaginationSelect
                        tableId={tables.table2.id}
                        currentPage={
                            paginationStates[tables.table2.id].currentPage
                        }
                        totalRecords={tables.table2.totalRecords}
                        recordsPerPage={
                            paginationStates[tables.table2.id].recordsPerPage
                        }
                        arrRecordsPerPage={tables.table2.arrRecordsPerPage}
                        handlePageChange={(tableId, newPage) =>
                            handlePageChange(tableId, newPage)
                        }
                        handleRecordsPerPageChange={(
                            tableId,
                            newRecordsPerPage
                        ) =>
                            handleRecordsPerPageChange(
                                tableId,
                                newRecordsPerPage
                            )
                        }
                    />
                </div>
            </div>
            <div className=" py-4">
                <DataTable className="w-full text-center table2" tableId={""}>
                    <tr className="bg-white">
                        <th className={`w-[40px] border-l-0 `}>
                            <Checkbox
                                description=""
                                id="allIds"
                                className="h-5 w-5"
                                checked={isAllSelected(tables.table2.id)}
                                onChange={() =>
                                    handleSelectAll(tables.table2.id)
                                }
                            />
                        </th>
                        <th className={`w-[96px] `}></th>
                        <th className={`w-[99px]`}>TickedID</th>
                        <th className={`w-[216px] `}>
                            <div
                                className="hover:cursor-pointer select-none flex flex-row justify-center items-center gap-x-1"
                                onClick={() =>
                                    handleSort(tables.table2.id, "status")
                                }>
                                Status
                                <Sort className={`size-4 `} />
                            </div>
                        </th>
                        <th>
                            <div
                                className="hover:cursor-pointer select-none flex flex-row justify-center items-center gap-x-1"
                                onClick={() =>
                                    handleSort(tables.table2.id, "customer")
                                }>
                                Customer
                                <Sort
                                    className={`size-4 hover:cursor-pointer`}
                                />
                            </div>
                        </th>
                        <th className={`w-[206px]`}>
                            <div
                                className="hover:cursor-pointer select-none flex flex-row justify-center items-center gap-x-1"
                                onClick={() =>
                                    handleSort(tables.table2.id, "property")
                                }>
                                Properties
                                <Sort
                                    className={`size-4 hover:cursor-pointer`}
                                />
                            </div>
                        </th>
                        <th className={`w-[151px]`}>
                            <div
                                className="hover:cursor-pointer select-none flex flex-row justify-center items-center gap-x-1"
                                onClick={() =>
                                    handleSort(tables.table2.id, "progresses")
                                }>
                                Progresses
                                <Sort
                                    className={`size-4 hover:cursor-pointer`}
                                />
                            </div>
                        </th>
                        <th className={`w-[144px]`}>
                            <div
                                className="hover:cursor-pointer select-none flex flex-row justify-center items-center gap-x-1"
                                onClick={() =>
                                    handleSort(
                                        tables.table2.id,
                                        "validateService"
                                    )
                                }>
                                Service time
                                <Sort
                                    className={`size-4 hover:cursor-pointer`}
                                />
                            </div>
                        </th>
                        <th className={`w-[119px] `}>
                            <div
                                className="hover:cursor-pointer select-none flex flex-row justify-center items-center gap-x-1"
                                onClick={() =>
                                    handleSort(
                                        tables.table2.id,
                                        "validateService"
                                    )
                                }>
                                Validity time
                                <Sort
                                    className={`size-4 hover:cursor-pointer`}
                                />
                            </div>
                        </th>
                        <th className={`w-[86px] px-[9px]`}>
                            <div
                                className="hover:cursor-pointer select-none flex flex-row justify-center items-center "
                                onClick={() =>
                                    handleSort(
                                        tables.table2.id,
                                        "createdDateTimestamp"
                                    )
                                }>
                                <p className={`text-justify`}> Created date</p>
                                <Sort
                                    className={`size-4 hover:cursor-pointer`}
                                />
                            </div>
                        </th>
                        <th className={`w-[87px] px-[9px]`}>
                            <div
                                className="hover:cursor-pointer select-none flex flex-row justify-center items-center "
                                onClick={() =>
                                    handleSort(tables.table2.id, "totalTonnage")
                                }>
                                <p className={`text-justify`}>Total tonnage</p>
                                <Sort
                                    className={`size-4 hover:cursor-pointer`}
                                />
                            </div>
                        </th>
                    </tr>

                    {getSortedData(
                        tables.table2.id,
                        paginatedData(tables.table2.id, processedData2)
                    ).map((row) => {
                        const statusClass =
                            colorStatus[row.statusProgress as StatusEnum];
                        return (
                            <tr key={row.id} className="bg-white">
                                <td className={` flex-col`}>
                                    <Checkbox
                                        description=""
                                        id={row.id}
                                        className="h-5 w-5"
                                        checked={
                                            selectedItems[
                                                tables.table2.id
                                            ]?.includes(row.id) || false
                                        }
                                        onChange={() =>
                                            handleCheckboxChange(
                                                tables.table2.id,
                                                row.id
                                            )
                                        }
                                    />
                                </td>
                                <td className={` px-0`}>
                                    <div className="flex flex-row justify-around w-full">
                                        <ValidityTime1 className={`size-4`} />
                                        <ValidityTime2 className={`size-4`} />
                                        <ValidityTime3 className={`size-4`} />
                                    </div>
                                </td>
                                <td className={`  flex justify-center`}>
                                    <div className="flex flex-col justify-center items-start gap-1">
                                        <p>{row.itemId}</p>
                                        <div className="flex flex-row gap-x-2">
                                            <Circle
                                                className={"size-2 text-green"}
                                            />
                                            <Circle
                                                className={"size-2 text-red"}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td >
                                    <StatusPending title={row.status} />
                                </td>
                                <td>{row.customer}</td>
                                <td>
                                    <PropertyPending title={row.property} />
                                </td>
                                <td>
                                    <div className="flex flex-col items-start">
                                        <div className="flex flex-row items-center gap-1">
                                            <TimeFill className={statusClass} />
                                            {row.progresses}
                                        </div>
                                        <a
                                            className="hover:cursor-pointer text-text-1 text-[11px] font-medium"
                                            onClick={() => setIsOpen(true)}>
                                            See details
                                        </a>
                                    </div>
                                </td>
                                <td>
                                    <ValidateServiceTime
                                        endDate={row.endDate}
                                        startDate={row.startDate}
                                    />
                                </td>
                                <td>
                                    <ValidateValidityTime
                                        endDate={row.endDate}
                                        startDate={row.startDate}
                                    />
                                </td>
                                <td>
                                    {FormatTimeHours(row.createdDateTimestamp)}
                                </td>
                                <td>{row.totalTonnage.toLocaleString()}</td>
                            </tr>
                        );
                    })}
                </DataTable>
            </div>
            <div className="flex flex-row m-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-primary text-base font-medium">
                        Product Approvals 2
                    </h1>
                </div>
            </div>
            <div className="flex flex-row my-4 bg-highlight p-4 items-center justify-between">
                <div className="flex flex-col gap-1"></div>
                <div className="flex flex-col gap-1">
                    <PaginationSelect
                        tableId={tables.table3.id}
                        currentPage={
                            paginationStates[tables.table3.id].currentPage
                        }
                        totalRecords={tables.table3.totalRecords}
                        recordsPerPage={
                            paginationStates[tables.table3.id].recordsPerPage
                        }
                        // arrRecordsPerPage={tables.table3.arrRecordsPerPage}
                        handlePageChange={(tableId, newPage) =>
                            handlePageChange(tableId, newPage)
                        }
                        handleRecordsPerPageChange={(
                            tableId,
                            newRecordsPerPage
                        ) =>
                            handleRecordsPerPageChange(
                                tableId,
                                newRecordsPerPage
                            )
                        }
                    />
                </div>
            </div>
            <div className=" py-4">
                <DataTable className="w-full text-center table2" tableId={""}>
                    <tr className="bg-white">
                        <th className={`w-[40px] border-l-0 `}>
                            <Checkbox
                                description=""
                                id="allIds"
                                className="h-5 w-5"
                                checked={isAllSelected(tables.table3.id)}
                                onChange={() =>
                                    handleSelectAll(tables.table3.id)
                                }
                            />
                        </th>
                        <th className={`w-[96px] `}></th>
                        <th className={`w-[99px]`}>TickedID</th>
                        <th className={`w-[216px] `}>
                            <div
                                className="hover:cursor-pointer select-none flex flex-row justify-center items-center gap-x-1"
                                onClick={() =>
                                    handleSort(tables.table3.id, "status")
                                }>
                                Status
                                <Sort className={`size-4 `} />
                            </div>
                        </th>
                        <th>Customer</th>
                        <th className={`w-[206px]`}>
                            <div
                                className="hover:cursor-pointer select-none flex flex-row justify-center items-center gap-x-1"
                                onClick={() =>
                                    handleSort(tables.table3.id, "property")
                                }>
                                Properties
                                <Sort
                                    className={`size-4 hover:cursor-pointer`}
                                />
                            </div>
                        </th>
                        <th className={`w-[151px]`}>
                            <div
                                className="hover:cursor-pointer select-none flex flex-row justify-center items-center gap-x-1"
                                onClick={() =>
                                    handleSort(tables.table3.id, "progresses")
                                }>
                                Progresses
                                <Sort
                                    className={`size-4 hover:cursor-pointer`}
                                />
                            </div>
                        </th>
                        <th className={`w-[144px]`}>
                            <div
                                className="hover:cursor-pointer select-none flex flex-row justify-center items-center gap-x-1"
                                onClick={() =>
                                    handleSort(
                                        tables.table3.id,
                                        "validateService"
                                    )
                                }>
                                Service time
                                <Sort
                                    className={`size-4 hover:cursor-pointer`}
                                />
                            </div>
                        </th>
                        <th className={`w-[119px] `}>
                            <div
                                className="hover:cursor-pointer select-none flex flex-row justify-center items-center gap-x-1"
                                onClick={() =>
                                    handleSort(
                                        tables.table3.id,
                                        "validateService"
                                    )
                                }>
                                Validity time
                                <Sort
                                    className={`size-4 hover:cursor-pointer`}
                                />
                            </div>
                        </th>
                        <th className={`w-[86px] px-[9px]`}>
                            <div
                                className="hover:cursor-pointer select-none flex flex-row justify-center items-center "
                                onClick={() =>
                                    handleSort(
                                        tables.table3.id,
                                        "createdDateTimestamp"
                                    )
                                }>
                                <p className={`text-justify`}> Created date</p>
                                <Sort
                                    className={`size-4 hover:cursor-pointer`}
                                />
                            </div>
                        </th>
                        <th className={`w-[87px] px-[9px]`}>
                            <div
                                className="hover:cursor-pointer select-none flex flex-row justify-center items-center "
                                onClick={() =>
                                    handleSort(tables.table3.id, "totalTonnage")
                                }>
                                <p className={`text-justify`}>Total tonnage</p>
                                <Sort
                                    className={`size-4 hover:cursor-pointer`}
                                />
                            </div>
                        </th>
                    </tr>
                    {getSortedData(
                        tables.table3.id,
                        paginatedData(tables.table3.id, processedData3)
                    ).map((row) => {
                        const statusClass =
                            colorStatus[row.statusProgress as StatusEnum];
                        return (
                            <tr key={row.id} className="bg-white">
                                <td className={` flex-col`}>
                                    <Checkbox
                                        description=""
                                        id={row.id}
                                        className="h-5 w-5"
                                        checked={
                                            selectedItems[
                                                tables.table3.id
                                            ]?.includes(row.id) || false
                                        }
                                        onChange={() =>
                                            handleCheckboxChange(
                                                tables.table3.id,
                                                row.id
                                            )
                                        }
                                    />
                                </td>
                                <td className={` px-0`}>
                                    <div className="flex flex-row justify-around w-full">
                                        <ValidityTime1 className={`size-4`} />
                                        <ValidityTime2 className={`size-4`} />
                                        <ValidityTime3 className={`size-4`} />
                                    </div>
                                </td>
                                <td className={`  flex justify-center`}>
                                    <div className="flex flex-col justify-center items-start gap-1">
                                        <p>{row.itemId}</p>
                                        <div className="flex flex-row gap-x-2">
                                            <Circle
                                                className={"size-2 text-green"}
                                            />
                                            <Circle
                                                className={"size-2 text-red"}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td >
                                    <StatusPending title={row.status} />
                                </td>
                                <td>{row.customer}</td>
                                <td>
                                    <PropertyPending title={row.property} />
                                </td>
                                <td>
                                    <div className="flex flex-col items-start">
                                        <div className="flex flex-row items-center gap-1">
                                            <TimeFill className={statusClass} />
                                            {row.progresses}
                                        </div>
                                        <a
                                            className="hover:cursor-pointer text-text-1 text-[11px] font-medium"
                                            onClick={() => setIsOpen(true)}>
                                            See details
                                        </a>
                                    </div>
                                </td>
                                <td>
                                    <ValidateServiceTime
                                        endDate={row.endDate}
                                        startDate={row.startDate}
                                    />
                                </td>
                                <td>
                                    <ValidateValidityTime
                                        endDate={row.endDate}
                                        startDate={row.startDate}
                                    />
                                </td>
                                <td>
                                    {FormatTimeHours(row.createdDateTimestamp)}
                                </td>
                                <td>{row.totalTonnage.toLocaleString()}</td>
                            </tr>
                        );
                    })}
                </DataTable>
            </div>
            <Drawer
                name="Header Name"
                subName="Sub Name"
                isOpen={isOpen}
                onClose={handleClose}>
                <DrawerContent children={undefined}></DrawerContent>
                <DrawerFooter handleClick={() => {}} title={""}></DrawerFooter>
            </Drawer>
        </LayoutContainer>
    );
};

export default Product;

function useDataProcessing(): {processData: any} {
    throw new Error("Function not implemented.");
}
