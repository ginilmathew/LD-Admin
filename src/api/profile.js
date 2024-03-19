import { axiosInstance } from "../customAxios";

export const getProfile = async () => {
    try {
        const response = await axiosInstance.get('admin/profile');
        return response
    }
    catch (error) {
        throw error;
    }
}

export const UpdateProfile = async (data) => {
    try {
        const response = await axiosInstance.post('admin/profile-update',data);
        return response
    }
    catch (error) {
        throw error;
    }
}

export const UpdateProfilePassword = async (data) => {
    try {
        const response = await axiosInstance.post('admin/profile-password-update',data);
        return response
    }
    catch (error) {
        throw error;
    }
}
