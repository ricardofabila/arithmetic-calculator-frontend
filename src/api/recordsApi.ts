import axiosInstance from './axiosInstance';
import {Record} from "../types/types.ts";

interface FetchUserRecordsResponse {
    records: Record[];
    totalPages: number;
}

export const fetchUserRecords = async (page: number, limit: number, search: string): Promise<FetchUserRecordsResponse> => {
    const response = await axiosInstance.get(`/records`, {
        params: {
            page,
            limit,
            search,
        },
    });
    return response.data;
};

interface AddOperationRequest {
    operation: string;
    number1: number;
    number2?: number;
    length?: number;
}

export const performUserOperation = async (operationData: AddOperationRequest): Promise<Record> => {
    const response = await axiosInstance.post('/operation', operationData);
    return response.data;
};

export const deleteUserRecord = async (id: number): Promise<FetchUserRecordsResponse> => {
    const response = await axiosInstance.delete(`/records/${id}`);
    return response.data;
};