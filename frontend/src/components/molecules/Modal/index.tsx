import React, { ReactNode } from "react";
import Close from "@/assets/svgs/close_round.svg";
import { twMerge } from "tailwind-merge";
import "./style.css";
import Button from "@/components/atoms/Button";

interface Props {
    className?:  string,
    children?: ReactNode;
    isOpen?: boolean;
    name?: string;
    subName?: string;
    onClose?: () => void;
}

export default function Modal({
    className,
    children,
    isOpen,
    name,
    subName,
    onClose
}: Props) {
    return (
        <div
            onClick={onClose}
            className={
                twMerge(
                    "modal w-full bg-[rgba(0,0,0,0.3)] fixed inset-0 z-30  transition flex justify-center items-center",
                    isOpen ? "show" : ""
                )
            }
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={twMerge(
                    "modal-content max-w-2xl w-full bg-white rounded-xl",
                    isOpen ? "show" : "" , className
                )}
            >
                <div className={twMerge("py-5 px-4 flex justify-between items-center flex-col")}>
                    <div className="flex items-center justify-between rounded-t dark:border-gray-600 w-full">
                        <h3 className="text-base !text-text font-medium">
                            {name}
                        </h3>
                        <Button
                            isIcon
                            variant="dashed"
                            size="medium"
                            onClick={onClose}
                            typeFile={""}
                        >
                            <Close className="w-5 h-5 text-gray-10" />
                        </Button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">{children}</div>
                    <div className="flex items-center justify-end gap-x-2 p-4 md:p-5 rounded-b dark:border-gray-600">
                        {/* Additional footer content if needed */}
                    </div>
                    <div>
                        <p className="text-primary font-medium text-[16px] leading-[19.09px] mb-1">
                            {name}
                        </p>
                        <p className="font-normal text-[13px] leading-[15.51px] text-gray">
                            {subName}
                        </p>
                    </div>
                </div>
                {children}
            </div>
        </div >
    );
}



