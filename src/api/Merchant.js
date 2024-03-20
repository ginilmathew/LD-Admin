import { axiosInstance } from "../customAxios";


export const getMerchantList = async () => {
    try {
        const response = await axiosInstance.get('admin/merchant-list');
        return response
    }
    catch (error) {
        throw error;
    }
}


export const postMerchantSatus = async (data) => {
    try {
        const response = await axiosInstance.post('admin/merchant-status',data);
        return response
    }
    catch (error) {
        throw error;
    }
}

export const getMerchantShow = async (id) => {
    try {
        const response = await axiosInstance.get(`admin/merchant-show/${id}`);
        return response
    }
    catch (error) {
        throw error;
    }
}

export const updateMerchant = async (data) => {
    try {
        const response = await axiosInstance.post(`admin/merchant-update`,data);
        return response
    }
    catch (error) {
        throw error;
    }
}