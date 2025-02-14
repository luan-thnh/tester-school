"use client";
import IconListItem from "@/components/atoms/IconListItem";
import tableFuture from "@/faker/tableFuture";

function TableFuture() {
    return (
        <div className=" max-w-[546px] mt-[30px] ml-[100px] grid grid-cols-2 gap-x-[26px] gap-y-1 pl-[23px] pt-[18px] pr-[49px]">
            {tableFuture.map((future, index) => (
                <IconListItem
                    key={index}
                    href="#"
                    classCustom="pl-0 py-[18px]"
                    title={future.title}
                    prefixIcon={future.prefixIcon}
                    onActive={() => {}}
                />
            ))}
        </div>
    );
}

export default TableFuture;
