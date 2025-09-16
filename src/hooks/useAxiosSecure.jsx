import axios from 'axios';
import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

const axiosInstance = axios.create({
    baseURL: "https://virtual-bookshelf-server-cyan.vercel.app"
})

const useAxiosSecure = () => {

    const {user} = use(AuthContext);

    axiosInstance.interceptors.request.use(config => {
        config.headers.authorization = `bearer ${user?.accessToken}`
        return config;
    })

    return axiosInstance;
};

export default useAxiosSecure;