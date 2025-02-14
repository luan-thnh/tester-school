import {useCallback} from "react";
import useValidateTime from "./useValidateTime";

const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
};

const convertToTimeStamp = (date: Date): number => {
    return date.getTime();
};

const useProcessedData = () => {
    const processRow = useCallback((row: any, validateService: (endDate: Date, startDate: Date) => { timeAble: number }) => {
        let startDate = new Date();
        let endDate = new Date();

        if (
            isValidDate(row.serviceTime.startDate) &&
            isValidDate(row.serviceTime.endDate)
        ) {
            startDate = new Date(Date.parse(row.serviceTime.startDate));
            endDate = new Date(Date.parse(row.serviceTime.endDate));
        } else {
            console.log("Invalid date");
        }

        // Call the validation function directly with the dates
        const { timeAble } = validateService(endDate, startDate);

        return {
            ...row,
            createdDateTimestamp: convertToTimeStamp(new Date(Date.parse(row.createdDate))),
            validateService: timeAble,
            startDate,
            endDate
        };
    }, []);

    // Extract the hook call to the top level of the custom hook
    const validateService = useCallback((endDate: Date, startDate: Date) => {
        const { timeAble } = useValidateTime({ endDate, startDate });
        return { timeAble };
    }, []);

    const processData = useCallback((data: any[]) => {
        // Process each row by passing the validateService function
        return data.map(row => processRow(row, validateService));
    }, [processRow, validateService]);

    return {processData};
};

export default useProcessedData;
