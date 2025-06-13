import { useContext } from 'react'
import axiosInstance from '../api/axios'
import { AuthContext } from '../context/AuthContext';

const useAxiosInstance = () => {
    const { user, loading } = useContext(AuthContext);

    if (!user && loading) return null;

    axiosInstance.interceptors.request.use((config) => {
        config.headers.authorization = `Bearer ${user?.accessToken}`;
        return config;
    });

    return axiosInstance;
}

export default useAxiosInstance;
