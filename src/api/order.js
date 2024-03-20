import { axiosInstance } from "../customAxios";

export const getOrderList = async () => {
    try {
        const response = await axiosInstance.get('admin/order-list');
        return response
    }
    catch (error) {
        throw error;
    }
}


export const OrderShow = async (id) => {
    try {
        const response = await axiosInstance.get(`admin/order-show/${id}`);
        return response
    }
    catch (error) {
        throw error;
    }
}
