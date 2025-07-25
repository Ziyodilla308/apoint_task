import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const loginUser = async (username: string, password: string) => {
    const { data } = await api.post("/hr/user/sign-in?include=token", {
        username,
        password,
    });
    return data;
};

export const fetchMaterials = async (start: string, end: string) => {
    const { data } = await api.get(
        `/reports/reports/materials?sort=name&start=${start}&end=${end}`,
    );
    return data;
};
