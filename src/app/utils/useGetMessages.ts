import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useGetMessage = (name: string) => {
  try {
    return useQuery({
      queryKey: ["messages"],
      queryFn: async () => {
        const response = await axios.post(`/api/roomchat`, { name });
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
