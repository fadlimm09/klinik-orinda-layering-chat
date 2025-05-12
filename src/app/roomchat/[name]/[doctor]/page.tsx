"use client";

import { useParams } from "next/navigation";
import { useGetMessage } from "@/app/utils/useGetMessages";
import { Button } from "@/components/ui/button";
import { useCreateMessages } from "@/app/utils/useCreateMessages";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/navbar";
import Image from "next/image";

export default function RoomChat() {
  const { name, doctor } = useParams();
  const { data, isLoading, isError } = useGetMessage(name as string, doctor as string);
  const [message, setMessage] = useState("");
  const { mutate } = useCreateMessages();

  const bottomRef = useRef<HTMLDivElement | null>(null);

  interface Message {
    createdAt: string;
    content: string;
    user: {
      name: string;
    };
  }

  const messages: Message[] = data?.messages || [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    const payload = {
      content: message,
      userId: data?.messages[0].userId,
      roomChatId: data?.id,
    };

    mutate(payload, {
      onSuccess: () => setMessage(""),
      onError: (error: any) => {
        alert("Gagal mengirim pesan: " + (error?.response?.data?.message || error.message));
      },
    });
  };

  if (isLoading) return <div className="text-center mt-8">Loading messages...</div>;
  if (isError) return <div className="text-center text-red-500 mt-8">Failed to load messages.</div>;

  return (
    <div className="flex flex-col h-screen bg-[#e5ddd5]">
      <Navbar />

      {/* Doctor Header */}
      <div className="bg-white shadow-sm py-3 px-4 flex items-center gap-3 ">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
          <Image src="/doctor-avatar.jpg" alt={`Doctor ${doctor}`} fill className="object-cover" />
        </div>
        <div>
          <h2 className="font-semibold text-gray-800">Dr. {doctor}</h2>
          <p className="text-xs text-gray-500">Online</p>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3">
        {messages.map((msg, idx) => {
          const isDoctor = msg.user.name === "Doctor";
          return (
            <div key={idx} className={`flex ${isDoctor ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[70%] px-4 py-2 rounded-2xl shadow text-sm whitespace-pre-wrap ${isDoctor ? "bg-white text-gray-800 rounded-tl-none" : "bg-green-500 text-white rounded-tr-none"}`}>
                {msg.content}
                <div className={`text-[10px] mt-1 ${isDoctor ? "text-gray-500" : "text-green-100"}`}>{new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 bg-white shadow-md">
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tulis pesan..." className="flex-1 border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" />
        <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full">
          Kirim
        </Button>
      </form>
    </div>
  );
}
