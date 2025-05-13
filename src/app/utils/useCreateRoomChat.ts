// useCreateBook.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios"; // optional, kalau mau pakai toast

interface createRoomChatPayload {
  name: string;
  doctor: string;
  id: string;
  messages: {
    id: string;
    content: string;
    user: {
      id: string;
      name: string;
    };
  }[];
}

export const useCreateMessages = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (json: createRoomChatPayload) => {
      const response = await axios.post("/api/roomchat", json);
      console.log(response);
      return response.data;
    },
    onSuccess: () => {
      console.log("Success creating room chat");
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: (error) => {
      console.error("Error: ", error);
    },
  });

  return mutation;
};
