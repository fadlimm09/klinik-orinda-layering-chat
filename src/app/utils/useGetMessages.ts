import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useGetMessage = (name: string, doctor: string) => {
  try {
    return useQuery({
      queryKey: ["messages"],
      queryFn: async () => {
        const response = await axios.post(`/api/roomchat`, { name, doctor });
        return response.data;
      },
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return {
      data: null,
      isLoading: false,
      isError: true,
    };
  }
};

export const useGetDoctorMessages = (doctor: string) => {
  try {
    return useQuery({
      queryKey: ["messages"],
      queryFn: async () => {
        const response = await axios.get(`/api/roomchat/${doctor}`);
        return response.data;
      },
    });
  } catch (error) {
    console.error("Error fetching doctor messages:", error);
    return {
      data: null,
      isLoading: false,
      isError: true,
    };
  }
};
