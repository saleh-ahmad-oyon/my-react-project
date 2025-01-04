import axios from "axios";

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    status: number;
}

export const getData = async <T>(url: string): Promise<ApiResponse<T>> => {
    try {
        const baseUrl = import.meta.env.PUBLIC_API_BASE_URL;
        if (!baseUrl) {
            throw new Error("Base URL is not defined in environment variables.");
        }
        const res = await axios.get(`${baseUrl}/${url}`);
        if (res.status === 200) {
            return {
                success: true,
                data: res.data,
                status: res.status,
            };
        } else {
            throw new Error(`Unexpected response status: ${res.status}`);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                message: error.response?.data?.message || "An Axios error occurred.",
                status: error.response?.status || 500,
            };
        } else {
            return {
                success: false,
                message: (error as Error).message || "An unknown error occurred.",
                status: 500,
            };
        }
    }
};

export const postData = async <S, T>(
    url: string,
    data: S
): Promise<ApiResponse<T>> => {
    try {
        const baseUrl = import.meta.env.PUBLIC_API_BASE_URL;
        if (!baseUrl) {
            throw new Error("Base URL is not defined in environment variables.");
        }
        const res = await axios.post(`${baseUrl}/${url}`, data);
        if (res.status === 201) {
            return {
                success: true,
                data: res.data,
                status: res.status,
            };
        } else {
            throw new Error(`Unexpected response status: ${res.status}`);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                message: error.response?.data?.message || "An Axios error occurred.",
                status: error.response?.status || 500,
            };
        } else {
            return {
                success: false,
                message: (error as Error).message || "An unknown error occurred.",
                status: 500,
            };
        }
    }
};