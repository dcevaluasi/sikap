import axios, { AxiosResponse } from "axios";
import { elautBaseUrl } from "@/constants/urls";
import { PelatihanMasyarakat } from "@/types/product";

export const fetchPublicTrainingData = async (endpoint: string): Promise<PelatihanMasyarakat[]> => {
    try {
        const response: AxiosResponse = await axios.get(endpoint);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching training data:", error);
        throw error;
    }
};
