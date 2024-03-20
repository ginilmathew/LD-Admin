import { axiosInstance } from "../customAxios";

export const getReport = async () => {
    try {
        const response = await axiosInstance.get('admin/report');
        return response
    }
    catch (error) {
        throw error;
    }
}