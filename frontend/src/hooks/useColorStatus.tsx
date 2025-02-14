import {StatusEnum} from "@/enums/StatusNum";

export const colorStatus: Record<StatusEnum, string> = {
    [StatusEnum.Error]: "text-red",
    [StatusEnum.Normal]: "text-blue",
    [StatusEnum.Success]: "text-green",
    [StatusEnum.Warning]: "text-yellow"
};
