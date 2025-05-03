import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useGetMessage = (name: string) => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const response = await axios.post(`/api/roomchat`, { name });
      return response.data;
    },
  });
};
