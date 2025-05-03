"use client";

import { useParams } from "next/navigation";
import { useGetMessage } from "@/app/utils/useGetMessages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateMessages } from "@/app/utils/useCreateMessages";
import { useState } from "react";
import Navbar from "@/components/navbar";

export default function RoomChat() {
  const { name } = useParams();
  const { data, isLoading, isError } = useGetMessage(name as string);

  const [message, setMessage] = useState("");
  const { mutate } = useCreateMessages();

  interface Message {
    createdAt: string;
    content: string;
    user: {
      name: string;
    };
  }

  const messages: Message[] = data?.messages || [];
  console.log("id room chat:", data?.id);
  console.log("userid", data?.messages[5].userId);
  console.log(messages);

  if (isLoading) {
    return <div>Loading messages...</div>;
  }

  if (isError) {
    return <div>Failed to load messages. Please try again later.</div>;
  }
  // Removed duplicate hook calls to avoid conditional hook usage

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!message.trim()) return;

    type MessagePayload = {
      content: string;
      userId: string;
      roomChatId: string;
    };

    const payload: MessagePayload = {
      content: message,
      userId: data?.messages[0].userId, // replace with actual user ID
      roomChatId: data?.id,
    };

    mutate(payload, {
      onSuccess: (): void => {
        setMessage(""); // reset input
        console.log("payload", payload);
      },
      onError: (error: any): void => {
        alert("Gagal mengirim pesan: " + (error?.response?.data?.message || error.message));
        console.log("payload", payload);
      },
    });
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center   bg-green-100">
        <Navbar />
        <div className="w-full  p-4 bg-white rounded-lg shadow-md">
          <h2 className="sticky text-xl font-semibold text-center mb-4">Chat with Doctor</h2>

          <div className="flex flex-col space-y-2 mb-4 overflow-y-auto ">
            {messages.map((msg, idx) => (
              <div key={idx} className={`p-2 rounded-md ${msg.user.name === "Doctor" ? "bg-green-200 text-left self-start" : "bg-green-50 text-right self-end"}`}>
                {msg.content}
                <div className="text-xs">{new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="space-x-2">
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tulis pesan..." className="border px-4 py-2 rounded" />
            <Button type="submit" disabled={isLoading} className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-900">
              {isLoading ? "Mengirim..." : "Kirim"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
