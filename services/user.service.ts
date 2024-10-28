import {axiosInstance} from '../utils/axios';
import {UserI} from '../interfaces/user.interface';

export const getUsers = async () => {
    try {
        const response = await axiosInstance.get<UserI[]>('/users');
        return response.data;
    } catch (error) {
        throw error;
    }
}
