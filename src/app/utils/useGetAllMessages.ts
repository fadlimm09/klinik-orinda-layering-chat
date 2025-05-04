"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useGetAllMessages = () => {
  try {
    return useQuery({
      queryKey: ["messages"],
      queryFn: async () => {
        const response = await axios.get(`/api/roomchat`);
        return response.data;
      },
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error; // Rethrow the error to be handled by React Query
  }
};
