"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useGetAllMessages = () => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const response = await axios.get(`/api/roomchat`);
      return response.data;
    },
  });
};
