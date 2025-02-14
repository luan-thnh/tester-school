import {request} from "../axios";

export const signInUser = async (username: string, password: string) => {
    console.log(username, password);
    try {
        const response = await request.post(`/auth/login`, {
            username,
            password
        });
        console.log("response", response);

        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
