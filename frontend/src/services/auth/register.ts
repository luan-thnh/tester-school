import {request} from "../axios";

export const GetAllCompany = async () => {
    const reponse = await request.get("/company");
    console.log("data", reponse);

    return reponse;
};
export const RegisterUser = async (
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    confirmPassword: string,
    birthday: string
) => {
    console.log(
        firstName,
        lastName,
        username,
        password,
        confirmPassword,
        birthday
    );
    try {
        const response = await request.post(`/users`, {
            username,
            password,
            firstName,
            lastName,
            confirmPassword,
            companyId: null,
            birthday
        });
        console.log("response", response);

        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
