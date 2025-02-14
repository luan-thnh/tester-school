"use client";
import MessengerSuccess from "@/assets/svgs/messenger_success.svg";
import MessengerNomal from "@/assets/svgs/messenger_nomal.svg";
import MessengerWarning from "@/assets/svgs/messenger_warning.svg";
import { StatusEnum } from "@/enums/StatusNum";

interface StatusColors {
    icon: React.ReactNode;
    background: string;
    textClass: string;
    border: string;
}
interface StatusNoteProps {
    type: StatusEnum;
    description: string;
}

export const statusColors: Record<StatusEnum, StatusColors> = {
    [StatusEnum.Normal]: {
        icon: <MessengerNomal />,
        background: "bg-normal",
        border: "border-normal",
        textClass: "text-secondary" // Use Tailwind class name
    },
    [StatusEnum.Success]: {
        icon: <MessengerSuccess />,
        background: "bg-success",
        border: "border-success",
        textClass: "text-primary" // Use Tailwind class name
    },
    [StatusEnum.Warning]: {
        icon: <MessengerWarning />,
        background: "bg-warning",
        border: "border-warning",
        textClass: "text-red" // Use Tailwind class name
    },
    [StatusEnum.Error]: {
        icon: <MessengerWarning />,
        background: "bg-warning",
        border: "border-warning",
        textClass: "text-red" // Use Tailwind class name
    }
};
const StatusNote = ({ type, description }: StatusNoteProps) => {
    const { icon, background, textClass, border } = statusColors[type]; // Destructure colors

    return (
        <div
            className={`w-[1352px] h-8 top-2 left-2.5 p-2 px-4 gap-2 border-[1px] border-transparent flex items-center rounded-custom-sm ${border} ${background}`}>
            {icon}
            <p className={`${textClass} text-xs  leading-[14.32px] text-left`}>
                {description}
            </p>
        </div>
    );
};
export default StatusNote;
