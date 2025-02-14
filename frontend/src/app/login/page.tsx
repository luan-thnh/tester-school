"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import "./style.css";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";
import {signInUser} from "@/services/auth/login";
import {fieldInput} from "@/consts/validates";
import {validateField} from "@/utils/validateForm";
import {statusColors} from "@/components/molecules/StatusNote";
import Modal from "@/components/molecules/Modal";
import {Spinner} from "@nextui-org/react";
import {jwtDecode} from "jwt-decode";
import {useUser} from "@/context/UserContext";
function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState<{
        username?: string;
        password?: string;
    }>({
        username: "",
        password: ""
    });
    const [isRemember, setIsRemember] = useState(false);
    const {setUserName} = useUser();
    const router = useRouter();
    useEffect(() => {
        // Tự động điền username và password nếu có trong localStorage
        const savedEmail = localStorage.getItem("rememberedEmail");
        const savedPassword = localStorage.getItem("rememberedPassword");
        if (savedEmail && savedPassword) {
            setFormData({username: savedEmail, password: savedPassword});
            setIsRemember(true);
        }
    }, []);
    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setIsSuccess(true);
        setErrors({
            ...errors,
            [name]: validateField(name, value)
        });
    };
    const onChangeRemember = (id: string) => {
        setIsRemember(!isRemember);
    };

    const handleRegisterpage = () => {
        router.push("/register");
    };
    const handleLogin = async () => {
        setIsLoading(true);
        const usernameError = validateField(
            fieldInput.USERNAME,
            formData.username
        );
        const passwordError = validateField(
            fieldInput.PASSWORD,
            formData.password
        );

        if (usernameError || passwordError) {
            setErrors({
                username: usernameError,
                password: passwordError
            });
            return;
        }

        try {
            const response = await signInUser(
                formData.username,
                formData.password
            );

            if (response && response?.code !== 1000) {
                setErrorMessage(response?.message);
            }
            if (response && response.code === 1000) {
                setIsSuccess(true);
                if (isRemember) {
                    localStorage.setItem("rememberedEmail", formData.username);
                    localStorage.setItem(
                        "rememberedPassword",
                        formData.password
                    );
                } else {
                    localStorage.removeItem("rememberedEmail");
                    localStorage.removeItem("rememberedPassword");
                }
                setUserName(response.result.username);
                localStorage.setItem("idUser", response.result.id);
                localStorage.setItem("authToken", response.result.token);

                router.push("/");
            } else {
                setIsSuccess(false);
                setIsLoading(false);
            }
        } catch (error) {
            setIsSuccess(false);
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="">
            <div
                className={`background bg-stroke w-[full] max-h-[100vh] flex justify-center items-center `}>
                <div className="font-wendy-one uppercase text-[128px] font-[400] leading-[135.04px] text-primary mr-[350px]">
                    LUNA
                </div>
                <div className="w-[452px] py-[64px] px-[24px] bg-white shadow-lg shadow-[rgba(0,0,0,0.1)]">
                    <Input
                        isError={!!errors.username}
                        helperText={errors.username}
                        size="large"
                        label="username"
                        require
                        name="username"
                        placeholder="username"
                        value={formData.username}
                        handleOnChange={handleInputChange}
                    />
                    <p className="mb-6"></p>
                    <Input
                        isError={!!errors.password}
                        helperText={errors.password}
                        size="large"
                        type="password"
                        label="Password"
                        require
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        handleOnChange={handleInputChange}
                    />
                    <p className="mb-6"></p>

                    <Button
                        isDisabled={
                            !!errors.username ||
                            !!errors.password ||
                            formData.username === "" ||
                            formData.password === "" ||
                            !isSuccess ||
                            isLoading
                        }
                        className="bg-custom-gradient "
                        onClick={handleLogin}>
                        {isLoading ?
                            <p className="flex justify-center items-center">
                                Loading...
                                <Spinner size="sm" color="default" />
                            </p>
                        :   "Login"}
                    </Button>
                    {!isSuccess && (
                        <p className="text-red text-[13px] absolute mt-[4px]">
                            {errorMessage}
                        </p>
                    )}
                    <p className="mb-6"></p>

                    <div className="flex justify-between ">
                        <div className="text-[#4B5563] text-[13px] font-normal leading-[15.51px]">
                            <Checkbox
                                id="remember"
                                checked={isRemember}
                                onChange={onChangeRemember}
                                description="Remember me"
                            />
                        </div>
                        {/* <p
                            className="text-[13px] cursor-pointer text-[#01559B] font-medium leading-[15.51px]"
                            onClick={handleForgotPassword}>
                            Forgot password?
                        </p> */}
                        <p
                            className="text-[13px] cursor-pointer text-[#01559B] font-medium leading-[15.51px]"
                            onClick={handleRegisterpage}>
                            Register User?
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
