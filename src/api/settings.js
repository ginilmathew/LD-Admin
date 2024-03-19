import { axiosInstance } from "../customAxios";

export const getSettings = async () => {
    try {
        const response = await axiosInstance.get('admin/setting');
        return response
    }
    catch (error) {
        throw error;
    }
}

export const updateSettings = async (data) => {
    try {
        const response = await axiosInstance.post('admin/setting-update',data);
        return response
    }
    catch (error) {
        throw error;
    }
}