"use client";
import Arrow from "@/assets/svgs/arrow_switch.svg";
import CartReport from "@/assets/svgs/cart_report.svg";
import Inventory from "@/assets/svgs/inventory.svg";
import SalePercent from "@/assets/svgs/sale_percent.svg";
import Trash from "@/assets/svgs/trash_bin.svg";
import WarningPrice from "@/assets/svgs/warning_price.svg";
import Wrench from "@/assets/svgs/wrench.svg";
import Input from "@/components/atoms/Input";
import {formatColumns, tableColumns} from "@/consts";
import {formatPrice, FormatTolerances} from "@/utils";
import Sort from "@/assets/svgs/sort_arrow.svg";
import {TypeStatus} from "@/enums/TypeStatusEnum";
import {
    Body,
    Cell,
    Header,
    HeaderCell,
    HeaderRow,
    Row,
    Table
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import GroupInput from "../GroupInput";
import "./styles.css";
import TooltipCustom from "@/components/atoms/Tooltip";
import {StatusEnum} from "@/enums/StatusNum";
import {colorStatus} from "@/hooks/useColorStatus";
import {useTableSorting} from "@/hooks/useTableSort";
interface TablePriceProps {
    arrColumns: string[];
    numberOfColumnFixed: number;
    nodes: any;
}
const TablePrice = ({
    arrColumns = [],
    numberOfColumnFixed = 6,
    nodes = []
}: TablePriceProps) => {
    const data = {nodes};
    const [isInputDisabled, setInputDisabled] = useState<
        Record<string, boolean>
    >({});
    const {handleSort, getSortedData} = useTableSorting();
    const changeInputDisabled = (rowId: string) => {
        setInputDisabled((prevState) => ({
            ...prevState,
            [rowId]: !prevState[rowId]
        }));
    };

    const theme = useTheme({
        Table: tableColumns(arrColumns),
        BaseCell: formatColumns(arrColumns, numberOfColumnFixed)
    });
    const idTable = "tableProduct";
    return (
        <>
            <Table
                data={data}
                className=" table border border-stroke font-sf-ui-display"
                theme={theme}
                layout={{ custom: true }}>
                {(listData: any) => (
                    <>
                        <Header>
                            <HeaderRow>
                                <HeaderCell
                                    className="border-r border-stroke"
                                    resize
                                    pinLeft>
                                    No
                                </HeaderCell>
                                <HeaderCell
                                    resize
                                    pinLeft
                                    className="border-r border-stroke">
                                    Type
                                </HeaderCell>
                                <HeaderCell
                                    resize
                                    pinLeft
                                    className="border-r border-stroke">
                                    Specifications
                                </HeaderCell>

                                <HeaderCell
                                    resize
                                    pinLeft
                                    className="border-r border-stroke">
                                    <div className="flex h-[56px] w-full">
                                        <div className="flex-col  w-[83%] flex items-center justify-center  border-r border-stroke">
                                            <div
                                                className="hover:cursor-pointer select-none flex flex-row justify-center items-center gap-x-1"
                                                onClick={() =>
                                                    handleSort(
                                                        idTable,
                                                        "totalCoil"
                                                    )
                                                }>
                                                Total Coil
                                                <Sort className={`size-4 `} />
                                            </div>
                                            <p className="col-subTitle">(KG)</p>
                                        </div>
                                        <div className="flex-col  w-full flex items-center justify-center">
                                            <div
                                                className="hover:cursor-pointer select-none flex flex-row justify-center items-center gap-x-1"
                                                onClick={() =>
                                                    handleSort(
                                                        idTable,
                                                        "totalWeight"
                                                    )
                                                }>
                                                Total Weight
                                                <Sort className={`size-4 `} />
                                            </div>
                                            <p className="col-subTitle">(KG)</p>
                                        </div>
                                    </div>
                                </HeaderCell>
                                <HeaderCell
                                    resize
                                    pinLeft
                                    className="border-r border-stroke">
                                    Prime
                                </HeaderCell>
                                <HeaderCell
                                    resize
                                    pinLeft
                                    className="border-r border-stroke">
                                    Preferred tolerances
                                </HeaderCell>
                                <HeaderCell
                                    resize
                                    pinLeft
                                    className="border-r border-stroke">
                                    <div className="flex-col w-[6%]">
                                        <div
                                            className="hover:cursor-pointer select-none flex flex-row justify-center items-center gap-x-1"
                                            onClick={() =>
                                                handleSort(
                                                    idTable,
                                                    "discountPrice"
                                                )
                                            }>
                                            Unit Price
                                            <Sort className={`size-4 `} />
                                        </div>
                                        <p className="col-subTitle">(PCS)</p>{" "}
                                    </div>
                                </HeaderCell>
                                <HeaderCell
                                    pinLeft
                                    resize
                                    className="border-r border-stroke">
                                    <div className="flex-col w-[8%]">
                                        <div
                                            className="hover:cursor-pointer select-none flex flex-row justify-center items-center gap-x-1"
                                            onClick={() =>
                                                handleSort(
                                                    idTable,
                                                    "discountPrice"
                                                )
                                            }>
                                            discountPrice
                                            <Sort className={`size-4 `} />
                                        </div>
                                        <p className="col-subTitle">(PCS)</p>
                                    </div>
                                </HeaderCell>
                                <HeaderCell
                                    resize
                                    pinLeft
                                    className="border-r border-stroke">
                                    <div className="flex-col w-full">
                                        <div
                                            className="hover:cursor-pointer select-none flex flex-row justify-center items-center gap-x-1"
                                            onClick={() =>
                                                handleSort(
                                                    idTable,
                                                    "rebatePrice"
                                                )
                                            }>
                                            Rebate offer
                                            <Sort className={`size-4 `} />
                                        </div>
                                        <p className="col-subTitle">(PCS)</p>{" "}
                                    </div>
                                </HeaderCell>
                                <HeaderCell
                                    resize
                                    pinLeft
                                    stiff
                                    className="border-r border-stroke  ">
                                    <div className="flex flex-col w-[264px]  ">
                                        <div className=" w-full h-[28px] border-b border-stroke !text-primary  flex-center">
                                            Special rebate offer
                                        </div>
                                        <div className="flex max-w-[264px] col-subTitle h-[28px]">
                                            <div className="col-subTitle w-[88px] col-subTitle  h-full   border-stroke  ">
                                                (VND/KG)
                                            </div>
                                            <div className="col-subTitle w-[88px] col-subTitle  h-full  border-l border-stroke  ">
                                                (%)
                                            </div>
                                            <div className="col-subTitle w-[88px] col-subTitle  h-full border-l border-stroke    ">
                                                (VND/KG)
                                            </div>
                                        </div>
                                    </div>
                                </HeaderCell>
                                <HeaderCell
                                    resize
                                    stiff
                                    className="border-r border-stroke   ">
                                    <div className="flex flex-col w-[264px]  ">
                                        <div className=" w-full h-[28px] border-b border-stroke !text-primary  flex-center">
                                            Special discount price
                                        </div>
                                        <div className="flex max-w-[264px] col-subTitle h-[28px]">
                                            <div className="col-subTitle w-[88px] col-subTitle  h-full   border-stroke  ">
                                                (VND/KG)
                                            </div>
                                            <div className="col-subTitle w-[88px] col-subTitle  h-full  border-l border-stroke  ">
                                                (%)
                                            </div>
                                            <div className="col-subTitle w-[88px] col-subTitle  border-l border-stroke h-full    ">
                                                (VND/KG)
                                            </div>
                                        </div>
                                    </div>
                                </HeaderCell>

                                <HeaderCell>Fullfillment</HeaderCell>
                                <HeaderCell>
                                    <div>
                                        <div
                                            className="hover:cursor-pointer select-none flex flex-row justify-center items-center gap-x-1"
                                            onClick={() =>
                                                handleSort(
                                                    idTable,
                                                    "finalPrice"
                                                )
                                            }>
                                            Final Price
                                            <Sort className={`size-4 `} />
                                        </div>
                                        <p className="col-subTitle">(VND)</p>
                                    </div>
                                </HeaderCell>
                                <HeaderCell>
                                    <div className="flex-col">
                                        <div
                                            className="hover:cursor-pointer select-none flex flex-row justify-center items-center gap-x-1"
                                            onClick={() =>
                                                handleSort(
                                                    idTable,
                                                    "totalPrice"
                                                )
                                            }>
                                            TotalPrice
                                            <Sort className={`size-4 `} />
                                        </div>
                                        <p className="col-subTitle">(PCS)</p>
                                    </div>
                                </HeaderCell>
                                <HeaderCell>Status</HeaderCell>
                                <HeaderCell>Action</HeaderCell>
                            </HeaderRow>
                        </Header>

                        <Body>
                            {getSortedData(idTable, listData).map(
                                (item: any, index: any) => {
                                    index += 1;
                                    const no = `${index < 10 ? "0" : ""}${index}`;
                                    const statusClass =
                                        colorStatus[item.status as StatusEnum];
                                    const {value1, value2} = FormatTolerances(
                                        item.preferredTolerances
                                    );
                                    return (
                                        <Row
                                            key={no}
                                            item={item}
                                            className={`${index % 2 ? "!bg-highlight" : "!bg-white"}`}>
                                            <Cell pinLeft>{no}</Cell>
                                            <Cell pinLeft>
                                                {" "}
                                                {item.type ===
                                                    TypeStatus.SALE && (
                                                    <SalePercent className="size-6" />
                                                )}
                                                {item.type ===
                                                    TypeStatus.ORIGINAL && (
                                                    <CartReport className="size-6" />
                                                )}
                                            </Cell>
                                            <Cell pinLeft>
                                                {item.specifications}
                                            </Cell>

                                            <Cell pinLeft className="">
                                                <div className="flex flex-row gap-x-[9px] w-full justify-evenly ">
                                                    <div className="w-[30%] border border-stroke rounded-[3px] overflow-auto">
                                                        <Input
                                                            isDisabled={
                                                                isInputDisabled[
                                                                    item.id
                                                                ]
                                                            }
                                                            value={
                                                                item.totalCoil
                                                            }
                                                            className=" w-[30%]  border border-stroke flex flex-row justify-center rounded-[3px]"
                                                            isContentCenter></Input>
                                                    </div>
                                                    <div className="flex flex-row justify-center items-center">
                                                        <Arrow
                                                            className="w-4 h-4 text-gray-10 hover:cursor-pointer hover:opacity-80"
                                                            onClick={() =>
                                                                changeInputDisabled(
                                                                    item.id
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div
                                                        className="w-[40%] border border-stroke rounded-[3px] overflow-hidden"
                                                        w-full>
                                                        <Input
                                                            isDisabled={
                                                                !isInputDisabled[
                                                                    item.id
                                                                ]
                                                            }
                                                            value={formatPrice(
                                                                Number(
                                                                    item.totalWeight
                                                                )
                                                            )}
                                                            className="  w-full flex flex-row justify-center"
                                                            isContentCenter></Input>
                                                    </div>
                                                </div>
                                            </Cell>

                                            <Cell
                                                pinLeft
                                                className="special-col-1">
                                                {" "}
                                                <div className="border border-stroke rounded-[3px] overflow-hidden  w-full">
                                                    <Input
                                                        variant="select"
                                                        optionSelect={[
                                                            "B1",
                                                            "A1",
                                                            "A2"
                                                        ]}
                                                        isContentCenter={false}
                                                        className="w-full"></Input>
                                                </div>
                                            </Cell>
                                            <Cell
                                                pinLeft
                                                className="special-col-2">
                                                {" "}
                                                <div
                                                    className="border border-stroke rounded-[3px] overflow-hidden 
                                                w-full">
                                                    <GroupInput
                                                        value1={value1}
                                                        value2={
                                                            value2
                                                        }></GroupInput>
                                                </div>
                                            </Cell>
                                            <Cell
                                                pinLeft
                                                className=" special-col-3 ">
                                                <TooltipCustom
                                                    message={`Old price information ${formatPrice(item.oldPrice)}VND`}
                                                    placement="bottom">
                                                    <div
                                                        className={`flex items-center gap-1 " ${item.discountPrice ? "text-secondary" : ""} `}>
                                                        {item.discountPrice >
                                                            0 && (
                                                            <WarningPrice className="size-4" />
                                                        )}
                                                        {formatPrice(
                                                            item.unitPrice
                                                        )}
                                                    </div>
                                                </TooltipCustom>
                                            </Cell>
                                            <Cell
                                                pinLeft
                                                className="special-col-4">
                                                {" "}
                                                <TooltipCustom
                                                    message="discount price"
                                                    placement="bottom">
                                                    {formatPrice(
                                                        item.discountPrice
                                                    )}
                                                </TooltipCustom>
                                            </Cell>
                                            <Cell
                                                pinLeft
                                                className="special-col-5">
                                                {formatPrice(item.rebatePrice)}
                                            </Cell>

                                            <Cell pinLeft>
                                                {
                                                    <div className=" h-full flex items-center justify-center  ">
                                                        <div className="min-w-[88px] h-full px-2 flex items-center border-r border-stroke  ">
                                                            <div className="border border-stroke rounded-[3px] overflow-hidden">
                                                                <Input
                                                                    isContentCenter
                                                                    placeholder="Enter"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="min-w-[88px] border-r border-stroke h-full px-2 flex items-center ">
                                                            <div className="border border-stroke rounded-[3px] overflow-hidden">
                                                                <Input
                                                                    isContentCenter
                                                                    placeholder="Enter"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="min-w-[88px] h-full px-2 flex items-center ">
                                                            <div className="border border-stroke rounded-[3px] overflow-hidden">
                                                                <Input
                                                                    isContentCenter
                                                                    placeholder="Enter"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </Cell>
                                            <Cell pinLeft>
                                                {
                                                    <div className=" h-full flex items-center justify-center ">
                                                        <div className="min-w-[88px] h-full px-2 flex items-center border-r border-stroke ">
                                                            <div className="border border-stroke rounded-[3px] overflow-hidden">
                                                                <Input
                                                                    isContentCenter
                                                                    placeholder="Enter"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="min-w-[88px] border-r border-stroke h-full px-2 flex items-center ">
                                                            <div className="border border-stroke rounded-[3px] overflow-hidden">
                                                                <Input
                                                                    isContentCenter
                                                                    placeholder="Enter"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="min-w-[88px] h-full px-2 flex items-center ">
                                                            <div className="border border-stroke rounded-[3px] overflow-hidden">
                                                                <Input
                                                                    isContentCenter
                                                                    placeholder="Enter"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </Cell>

                                            <Cell pinLeft>
                                                <div
                                                    className=""
                                                    data-tooltip-id="fulfill"
                                                    data-tooltip-content={
                                                        "fulfillment"
                                                    }>
                                                    hello
                                                </div>
                                            </Cell>
                                            <Cell pinLeft>
                                                {formatPrice(item.totalPrice)}
                                            </Cell>
                                            <Cell pinLeft>
                                                {formatPrice(item.totalPrice)}
                                            </Cell>
                                            <Cell pinLeft>
                                                <Inventory
                                                    className={`size-6 ${statusClass}`}
                                                />
                                            </Cell>
                                            <Cell
                                                pinLeft
                                                className="col-action">
                                                {" "}
                                                {item.action.includes(
                                                    "delete"
                                                ) && (
                                                    <Trash
                                                        className="size-6"
                                                        onClick={() => {
                                                            alert("delete");
                                                        }}
                                                    />
                                                )}
                                                {item.action.includes(
                                                    "edit"
                                                ) && (
                                                    <Wrench
                                                        className="size-6"
                                                        onClick={() => {
                                                            alert("edit");
                                                        }}
                                                    />
                                                )}
                                            </Cell>
                                        </Row>
                                    );
                                }
                            )}
                        </Body>
                    </>
                )}
            </Table>
        </>
    );
};

export default TablePrice;
