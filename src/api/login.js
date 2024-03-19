import { axiosInstance } from "../customAxios";


export const PostLogin = async (data) => {

    try {
        const response = await axiosInstance.post('/login', data);
        return response
    } catch (error) {
        throw error
    }

}