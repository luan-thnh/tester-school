import { useCallback, useEffect, useState } from "react";
import { initValidityTime } from "@/consts";
import { calculateDate, convertToTimeStamp } from "@/utils";

function useValidateTime({
    endDate,
    startDate,
    onEnd
}: {
    endDate: Date;
    startDate: Date;
    onEnd?: () => void;
}) {
    const [timeAble, setTimeAble] = useState(() => {
        return (
            convertToTimeStamp(endDate) -
            convertToTimeStamp(new Date(Date.now()))
        );
    });
    const [timeValidity, setTimeValidity] = useState(initValidityTime);
    const [timeUsed, setTimeUsed] = useState(initValidityTime);
    const [currentPercent, setCurrentPercent] = useState(0);
    const [timeCurrent, setTimeCurrent] = useState(initValidityTime);
    const [end, setEnd] = useState(false);

    const totalTime =
        convertToTimeStamp(endDate) - convertToTimeStamp(startDate);
    const totalTimeHours = totalTime / (1000 * 60 * 60);

    const updateTime = useCallback(() => {
        try {
            const timeAble = Math.floor(
                (convertToTimeStamp(endDate) -
                    convertToTimeStamp(new Date(Date.now()))) /
                1000
            );
            if (
                totalTime <= 0 ||
                isNaN(endDate.getTime()) ||
                isNaN(startDate.getTime())
            ) {
                setTimeValidity(initValidityTime);
                setCurrentPercent(0);
                setTimeAble(0);
                return;
            }
            const currentAble = Math.floor(
                (convertToTimeStamp(new Date(Date.now())) -
                    convertToTimeStamp(startDate)) /
                1000
            );
            const timeData = calculateDate({ endDate, startDate });
            const timeAbleHours = timeAble / (60 * 60);
            const currentPercent = (timeAbleHours / totalTimeHours) * 100;
            if (
                convertToTimeStamp(startDate) <=
                convertToTimeStamp(new Date(Date.now()))
            ) {
                setTimeValidity({ ...timeData });
                setTimeAble(() => Math.floor(timeAble));
                setCurrentPercent(() => currentPercent);
                const timeUse = calculateDate({
                    startDate,
                    endDate: new Date(Date.now()),
                    hasDay: false,
                    isTimeUse: true
                });
                setTimeUsed(() => timeUse);
            }
            if (
                convertToTimeStamp(startDate) >
                convertToTimeStamp(new Date(Date.now()))
            ) {
                setTimeValidity({ ...timeData });
                setTimeAble(() => Math.floor(timeAble));
                setCurrentPercent(100);
            }
        } catch (error) {
            return;
        }
    }, [endDate, startDate, totalTime, totalTimeHours]);

    useEffect(() => {
        setEnd(false);
        if (timeAble > 0) {
            updateTime();
        }
        const intervalId = setInterval(() => {
            if (timeAble <= 0) {
                clearInterval(intervalId);
                setCurrentPercent(() => 0);
                setTimeValidity(initValidityTime);
                setEnd(true);
                if (onEnd) onEnd(); // Call the onEnd callback if provided
                return;
            }
            updateTime();
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeAble, updateTime, onEnd]);

    return {
        timeAble,
        timeValidity,
        currentPercent,
        totalTimeHours,
        totalTime: calculateDate({endDate, startDate, isTotal: true}),
        setEnd,
        end,
        timeUsed
    };
}

export default useValidateTime;
