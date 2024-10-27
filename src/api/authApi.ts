import axios from "axios";

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${import.meta.env.VITE_APP_BASE_API_URL}/login`, {username: email, password});
    return response.data;
};

export const register = async (email: string, password: string) => {
    const response = await axios.post(`${import.meta.env.VITE_APP_BASE_API_URL}/register`, {username: email, password});
    return response.data;
};
