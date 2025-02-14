"use client";
import DropDown from "@/assets/svgs/dropdown_config.svg";
import Bell from "@/assets/svgs/bell.svg";
import User from "@/assets/svgs/user_1.svg";
import DropsDown from "@/components/atoms/Dropdown";
import OrderNotice from "@/components/atoms/OrderNotice/OrderNotice";
import {dataOrderNotice} from "@/faker/OrderNotice";
import {FormatNotice} from "@/utils";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import "../../../app/globals.css";
import Image from "next/image";
import {Notice} from "@/interfaces/notice";
import {useRouter} from "next/navigation";
import {getUser} from "@/services/auth/update";
import {useUser} from "@/context/UserContext";

interface NoticeResponse {
    total?: number;
    data?: Notice[];
}

export default function Header() {
    const {setUser, userName} = useUser();
    const [language, setLanguage] = useState<string>("ENG");
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [isNotice, setIsNotice] = useState<boolean>(false);
    const noticeRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [notices, setNotices] = useState<NoticeResponse>();
    const router = useRouter();
    useEffect(() => {
        const savedLanguage = localStorage.getItem("language");
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, []);

    const handleLanguage = () => {
        setLanguage((prevLanguage) => {
            const newLanguage = prevLanguage === "ENG" ? "VI" : "ENG";
            localStorage.setItem("language", newLanguage);
            return newLanguage;
        });
    };

    const handleNotice = () => {
        setIsNotice(!isNotice);
    };

    const handleClickDropDown = () => {
        setIsClicked(!isClicked);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                noticeRef.current &&
                !noticeRef.current.contains(event.target as Node)
            ) {
                setIsNotice(false);
            }
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsClicked(false);
            }
        };
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setNotices(dataOrderNotice);
    }, []);

    const handleGetUser = async () => {
        const idUser = localStorage.getItem("idUser");
        const token = localStorage.getItem("authToken");
        if (!idUser || !token) {
            router.push("/login");
            return;
        }
        try {
            const response = await getUser(idUser, token);

            if (response && response.data.code === 1000) {
                // lưu vào useContext

                setUser(response.data.result); // Lưu vào useContext

                router.push("/personalinformation");
            }
            console.log("response2222", response.data.result);
        } catch (error) {}
    };
    const handleLogout = async () => {
        const token = localStorage.getItem("authToken");
        if (token) {
            localStorage.removeItem("authToken");
        }
        router.push("/login");
    };

    return (
        <>
            <div className="w-full sticky top-0 z-20">
                <div className="h-14 w-full bg-white flex justify-between items-center px-6 border-b border-stroke">
                    <div className="flex items-center justify-center">
                        <Link href="/">
                            <p className="uppercase text-[32px] font-[400] leading-[33.76px] text-primary  font-wendy-one">
                                Luna
                            </p>
                        </Link>
                    </div>
                    <div className="flex gap-[16px] justify-center items-center">
                        <div className="relative" ref={noticeRef}>
                            {notices?.data?.length !== 0 ?
                                <span
                                    onClick={handleNotice}
                                    className="absolute select-none cursor-pointer rounded-full ml-3 z-10 px-[4px] text-[8px] text-white bg-red">
                                    {FormatNotice(notices?.total ?? 0)}
                                </span>
                            :   ""}

                            <Bell
                                className="w-6 h-6 cursor-pointer select-none"
                                onClick={handleNotice}
                            />

                            {isNotice && (
                                <OrderNotice
                                    total={notices?.total}
                                    dataNotice={notices?.data}
                                />
                            )}
                        </div>

                        <div className="w-6 text-center">
                            <p
                                className="cursor-pointer transition text-[13px] font-normal leading-[15.51px] text-text select-none duration-300 ease-in-out transform"
                                onClick={handleLanguage}>
                                {language}
                            </p>
                        </div>

                        <div className="h-[32px] w-[1px] bg-stroke"></div>
                        <div
                            onClick={handleClickDropDown}
                            className="flex gap-[9px] items-center cursor-pointer"
                            ref={dropdownRef}>
                            <User className="w-8 h-8 rounded-full" />

                            <div>
                                <p className="text-text text-[13px] leading-4">
                                    {userName}
                                </p>
                                <p className="text-unit text-[12px]">
                                    Chuyên viên kinh doanh
                                </p>
                            </div>
                            <div className="relative">
                                <DropDown className="w-3 h-2 cursor-pointer relative" />
                                {isClicked && (
                                    <DropsDown>
                                        <div>
                                            <p
                                                onClick={handleGetUser}
                                                className="border-b py-2 text-[13px] border-stroke cursor-pointer">
                                                Thông tin cá nhân
                                            </p>
                                            <p className="border-b text-[13px] py-2 border-stroke cursor-pointer">
                                                Đổi mật khẩu
                                            </p>
                                            <p
                                                onClick={handleLogout}
                                                className="py-2 text-[13px] cursor-pointer">
                                                Đăng Xuất
                                            </p>
                                        </div>
                                    </DropsDown>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
