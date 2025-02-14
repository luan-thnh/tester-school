import LayoutContainer from "@/app/LayoutContainer";
import DataTable from "@/components/atoms/Datatable";
import React from "react";

import {twMerge} from "tailwind-merge";

const Home = () => {
    const tableClasses = twMerge(
        "min-h-[56px] flex justify-center items-center border-stroke border-b border-l"
    );
    const thClasses = twMerge(
        tableClasses,
        "border-t text-[12px] font-semibold"
    );
    const tdClasses = twMerge(
        tableClasses,
        "text-text text-[13px] font-normal"
    );

    return (
        <LayoutContainer>
            <DataTable className="w-full" tableId={""}>
                <table className="w-full table-fixed">
                    <thead>
                        <tr className="flex flex-row  ">
                            <th
                                className={`${thClasses} min-w-[56px] border-l-0`}>
                                No
                            </th>
                            <th className={`${thClasses} min-w-[56px]`}>
                                Type
                            </th>
                            <th className={`${thClasses} flex-1 min-w-[150px]`}>
                                Specifications
                            </th>
                            <th
                                className={`${thClasses} min-w-[81px] flex-col`}>
                                Total coil
                                <span className="text-unit">(PCS)</span>
                            </th>
                            <th
                                className={`${thClasses} min-w-[94px] flex-col`}>
                                Total weight
                                <span className="text-unit">(KG)</span>
                            </th>
                            <th className={`${thClasses} min-w-[98px]`}>
                                Prime
                            </th>
                            <th className={`${thClasses} min-w-[145px]`}>
                                Preferred tolerances
                            </th>
                            <th
                                className={`${thClasses} min-w-[80px] flex-col`}>
                                Unit price
                                <span className="text-unit">(PCS)</span>
                            </th>
                            <th
                                className={`${thClasses} min-w-[104px] flex-col`}>
                                Discounted price
                                <span className="text-unit">(PCS)</span>
                            </th>
                            <th
                                className={`${thClasses} min-w-[80px] flex-col`}>
                                Rebate offer
                                <span className="text-unit">(VND)</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="flex flex-row odd:bg-highlight even:bg-white">
                            <td
                                className={`${tdClasses} min-w-[56px] border-l-0`}>
                                01
                            </td>
                            <td className={`${tdClasses} min-w-[56px]`}></td>
                            <td
                                className={`${tdClasses} flex-1 min-w-[150px]`}></td>
                            <td
                                className={`${tdClasses} min-w-[175px] `}
                                colSpan={2}></td>
                            <td className={`${tdClasses} min-w-[98px]`}></td>
                            <td className={`${tdClasses} min-w-[145px]`}></td>
                            <td className={`${tdClasses} min-w-[80px] `}></td>
                            <td className={`${tdClasses} min-w-[104px] `}></td>
                            <td className={`${tdClasses} min-w-[80px]`}></td>
                        </tr>
                    </tbody>
                </table>
            </DataTable>
        </LayoutContainer>
    );
};

export default Home;
