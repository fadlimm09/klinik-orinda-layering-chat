// useCreateBook.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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

export const useFindRoomChat = () => {
  try {
    const queryClient = useQueryClient();

    const mutation = useMutation({
      mutationFn: async (payload: { name: string; doctor: string }) => {
        console.log(payload);
        const response = await axios.post("/api/findroom", payload);
        return response.data;
      },
      onSuccess: () => {
        console.log("Room found or created");
        queryClient.invalidateQueries({ queryKey: ["messages"] });
      },
      onError: (error) => {
        console.error("Error finding/creating room chat:", error);
      },
    });

    return mutation;
  } catch (error) {
    console.error("Error in useFindRoomChat:", error);
    return {
      mutate: () => {},
      data: null,
      isError: true,
      isPending: false,
    };
  }
};
