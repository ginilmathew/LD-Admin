import { axiosInstance } from "../customAxios";

export const getPostList = async () => {
    try {
        const response = await axiosInstance.get('admin/post-list');
        return response
    }
    catch (error) {
        throw error;
    }
}

export const getPostListShow = async (id) => {
    try {
        const response = await axiosInstance.get(`admin/post-show/${id}`);
        return response
    }
    catch (error) {
        throw error;
    }
}
export const updatePost = async (data) => {
    try {
        const response = await axiosInstance.post(`admin/post-status-update`,data);
        return response
    }
    catch (error) {
        throw error;
    }
}

