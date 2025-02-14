import axios from "axios";
import {request} from "../axios";

export const forgetpassword = async (email: string) => {
    try {
        const response = await request.post(`/auth/recover`, {
            email
        });

        return response;
    } catch (error) {
        console.error("Error during forgetpassword:", error);
        throw error;
    }
};

export const checkTimePassword = async (token: string) => {
    const data = await request.get(`/auth/checkpassword/${token}`);

    return data;
};
export const updatePassword = async (newPassword: string, token: string) => {
    try {
        const response = await request.post(`/auth/reset-password/${token}`, {
            newPassword: newPassword
        });
        if (response) {
            return response;
        }
    } catch (error) {
        return error;
    }
};
