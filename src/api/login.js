import { axiosInstance } from "../customAxios";


export const PostLogin = async (data) => {

    try {
        const response = await axiosInstance.post('/login', data);
        return response
    } catch (error) {
        throw error
    }

}
export const forgetPassword = async (data) => {

    try {
        const response = await axiosInstance.post('/forgotpassword', data);
        return response
    } catch (error) {
        throw error
    }

}