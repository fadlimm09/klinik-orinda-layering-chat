// useCreateBook.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios"; // optional, kalau mau pakai toast

export const useCreateMessages = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (json) => {
      // <<< tambahkan 'json' di sini
      const response = await axios.post("/api/roomchat", json);
      console.log(response);
      return response.data;
    },
    onSuccess: () => {
      console.log("Success booking");
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: (error) => {
      console.error("Error: ", error);
    },
  });

  return mutation;
};
