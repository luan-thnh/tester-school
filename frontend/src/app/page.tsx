"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import LayoutContainer from "./LayoutContainer";
import Modal from "@/components/molecules/Modal";
import Toast from "@/components/molecules/Toast";
import {ToastType} from "@/enums/ToastEnum";
import Calendar from "@/components/atoms/Calendar/Index";
import Product from "./product/page";

export default function Home() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    // onchange = (dates: [Date | null, Date | null]) => {};
    const router = useRouter();
    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem("authToken");
            if (!token) {
                router.push("/login");
            }
        };
        checkToken();
        const intervalId = setInterval(() => {
            checkToken();
        }, 1000);
        return () => clearInterval(intervalId);
    }, [router]);
    return (
        // <LayoutContainer>
        <Product />
        // </LayoutContainer>
    );
}
