// useCreateBook.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios"; // optional, kalau mau pakai toast

type MessagePayload = {
  content: String;
  userId: String;
  roomChatId: String;
};

export const useCreateMessages = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (json: MessagePayload) => {
      const response = await axios.post("/api/messages", json);
      console.log(response);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: (error) => {
      console.error("Error: ", error);
    },
  });

  return mutation;
};
