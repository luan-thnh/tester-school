"use client";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import "./style.css";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Arow from "@/assets/svgs/arrow_1.svg";
import {forgetpassword} from "@/services/auth/recoverPassword";
import CheckSuccess from "@/assets/svgs/check-success.svg";
import {validateField} from "@/utils/validateForm";
import {Spinner} from "@nextui-org/react";

function Recoverpassword() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [errEmail, setErrEmail] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [responseMessage, setResponseMessage] = useState(""); // State to store the response message

    const handleOnchangeValue = (e: any) => {
        const {name, value} = e.target;
        const emailError = validateField(name, value);
        setErrEmail(emailError || "");
        setEmail(value);
        setIsError(false);
    };

    const handleLogin = () => {
        router.push("/login");
    };

    const handleForgerPassword = async () => {
        setIsLoading(true);
        try {
            const res = await forgetpassword(email);
            console.log("res email", res);
            if (res.data?.statusCode === "10000") {
                setIsSuccess(true);
                setResponseMessage(res.data.message);
            } else {
                setIsError(true);
                setResponseMessage("old");
            }
        } catch (error) {
            console.error("forget password error:", error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className={`background bg-stroke w-[full] max-h-[100vh] flex justify-center items-center`}>
            <div className="font-wendy-one uppercase text-[128px] font-[400] leading-[135.04px] text-primary mr-[350px]">
                LUNA
            </div>
            <div className="w-[452px] h-[439px] py-[64px] px-[24px] bg-white shadow-lg shadow-[rgba(0,0,0,0.1)]">
                <div className="text-[#4B5563] font-medium text-[32px] leading-[38.19px] mt-6">
                    Recover password
                </div>
                {!isSuccess ?
                    <div className="text-[#3A3B3C] bg-[#F8F8F8] mb-4 font-normal text-[13px] leadsing-[18.83px] p-[10px] pr-[36px]">
                        Please input the registered email address, a
                        verification email will be sent to this address.
                    </div>
                :   <div className="text-[#3A3B3C] bg-[#EFFFEA] mb-4 font-normal text-[13px] leadsing-[18.83px] flex items-center gap-2 p-[10px] pr-[36px]">
                        <CheckSuccess />
                        <p>{responseMessage}</p>
                    </div>
                }

                <Input
                    isDisabled={isSuccess}
                    isError={!!errEmail}
                    helperText={errEmail}
                    size="large"
                    label="Email"
                    handleOnChange={handleOnchangeValue}
                    value={email}
                    require
                    name="email"
                    placeholder="Email"
                />
                <p className="mb-6"></p>

                <Button
                    isDisabled={
                        !email ||
                        !!errEmail ||
                        isSuccess ||
                        isLoading ||
                        isError
                    }
                    className="bg-custom-gradient relative"
                    onClick={handleForgerPassword}>
                    {isLoading ?
                        <p className="flex justify-center items-center">
                            Loading...
                            <Spinner size="sm" color="default" />
                        </p>
                    :   "Recover password"}
                </Button>
                {isError && (
                    <p className="text-red text-[13px] absolute mt-[4px]">
                        Email not found!
                    </p>
                )}
                <div className="flex justify-center">
                    <p
                        onClick={handleLogin}
                        className="text-[#01559B] font-medium text-[13px] cursor-pointer leading-[15.51px] flex items-center w-fit mt-4">
                        <Arow className="mr-2 text-[20px]" /> Try to login
                        again?
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Recoverpassword;
