import { useContext } from 'react'
import axiosInstance from '../api/axios'
import { AuthContext } from '../context/AuthContext';

const useAxiosInstance = () => {
    const { user } = useContext(AuthContext);

    axiosInstance.interceptors.request.use((config) => {
        config.headers.authorization = `Bearer ${user?.accessToken}`;
        return config;
    });

    return axiosInstance;
}

export default useAxiosInstance;
