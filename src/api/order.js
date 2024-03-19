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
