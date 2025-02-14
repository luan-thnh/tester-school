"use client";
import Button from "@/components/atoms/Button";
import {useProcessFlow} from "@/context/FlowContext";
import {twMerge} from "tailwind-merge";
function TableExample({label}: any) {
    const {currentProcessIndex, flows, onSubmit, onNext, onBack} =
        useProcessFlow();
    const theadClasses = twMerge(
        "min-h-[56px] px-4 py-2 flex justify-center items-center border-stroke border-y border-l"
    );
    const thbodyClasses = twMerge(
        "min-h-[56px] px-4 py-2  text-[13px] font-normal border-stroke border-b border-l text-text flex justify-center items-center"
    );
    return (
        <div className="overflow-x-auto mt-4">
            <p>{label}</p>
            <table className="min-w-full text-xs table-fixed">
                <thead>
                    <tr className="flex flex-row">
                        <th className={`w-[4%] ${theadClasses} border-l-0`}>
                            No
                        </th>
                        <th className={`w-[4%] ${theadClasses}`}>Type</th>
                        <th className={`w-[27%] ${theadClasses}`}>
                            Specifications
                        </th>
                        <th className={`w-[7%] flex-col ${theadClasses}`}>
                            Total coil
                            <span className="text-unit">(PCS)</span>
                        </th>
                        <th className={`w-[8%] flex-col ${theadClasses}`}>
                            Total weight
                            <span className="text-unit">(KG)</span>
                        </th>
                        <th className={`w-[8%] ${theadClasses}`}>Prime</th>
                        <th className={`w-[11%] ${theadClasses}`}>
                            Preferred tolerances
                        </th>
                        <th className={`w-[9%] flex-col ${theadClasses}`}>
                            Unit price
                            <span className="text-unit">(PCS)</span>
                        </th>

                        <th className={`w-[9%] flex-col ${theadClasses}`}>
                            Total price
                            <span className="text-unit">(VND)</span>
                        </th>
                        <th className={`w-[5%] ${theadClasses}`}>Status</th>
                        <th className={`w-[8%] ${theadClasses}`}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="flex flex-row ">
                        <td className={`w-[4%] ${thbodyClasses} border-l-0`}>
                            01
                        </td>
                        <td className={`w-[4%] ${thbodyClasses}`}></td>
                        <td className={`w-[27%] ${thbodyClasses}`}></td>
                        <td className={`w-[7%] ${thbodyClasses}`}></td>
                        <td className={`w-[8%] ${thbodyClasses}`}></td>
                        <td className={`w-[8%] ${thbodyClasses}`}></td>
                        <td className={`w-[11%] ${thbodyClasses}`}></td>
                        <td className={`w-[9%] ${thbodyClasses}`}></td>
                        <td className={`w-[9%] ${thbodyClasses}`}></td>
                        <td className={`w-[5%] ${thbodyClasses}`}></td>
                        <td className={`w-[8%] ${thbodyClasses}`}></td>
                    </tr>
                </tbody>
            </table>
            <div className="flex w-full justify-end gap-4 mt-[50px]">
                <Button
                    variant={`${currentProcessIndex > 1 ? "primary-dark" : "secondary"}`}
                    size="medium"
                    className={`${currentProcessIndex <= 1 ? "disabled text-gray-4 cursor-not-allowed" : ""}`}
                    onClick={() => onBack()}>
                    Back
                </Button>
                {currentProcessIndex >= flows.length ?
                    <Button
                        typeFile={""}
                        variant="primary-dark"
                        size="medium"
                        onClick={() => onSubmit()}>
                        Submit
                    </Button>
                :   <Button
                        typeFile={""}
                        variant={`${currentProcessIndex < flows.length ? "primary-dark" : "secondary"}`}
                        size="medium"
                        className={`${currentProcessIndex >= flows.length ? "disabled text-gray-4 cursor-not-allowed" : ""}`}
                        onClick={() => onNext()}>
                        Next
                    </Button>
                }
            </div>
        </div>
    );
}

export default TableExample;
