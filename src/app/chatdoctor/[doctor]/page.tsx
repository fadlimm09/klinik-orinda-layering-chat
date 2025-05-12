"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import NavDoctor from "@/components/navdoctor";
import { Button } from "@/components/ui/button";
import { User2 } from "lucide-react";

import { useGetDoctorMessages } from "@/app/utils/useGetMessages";
import { useCreateMessages } from "@/app/utils/useCreateMessages";
import { useGetDoctorData } from "@/app/utils/useGetDoctorData";

interface Message {
  id: string;
  content: string;
  createdAt: string;
  userId: string;
  roomChatId: string;
  user: {
    id: string;
    name: string;
  };
}

interface RoomChat {
  id: string;
  name: string;
  createdAt: string;
  doctor: string;
  messages: Message[];
}

export default function DoctorRoomChat() {
  const { doctor } = useParams();
  const { data: rooms, isLoading, isError } = useGetDoctorMessages(doctor as string);
  const { data: doctorData } = useGetDoctorData(doctor as string);

  const { mutate } = useCreateMessages();
  const bottomRef = useRef<HTMLDivElement>(null);

  const [activeRoom, setActiveRoom] = useState<RoomChat | null>(null);
  const [message, setMessage] = useState("");

  // Set first room as active when available
  useEffect(() => {
    if (rooms?.length && !activeRoom) {
      setActiveRoom(rooms[0]);
    }
  }, [rooms]);

  // Auto-scroll when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeRoom?.messages]);

  // Handle message submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim() || !activeRoom) return;

    mutate(
      {
        content: message,
        userId: doctorData?.id,
        roomChatId: activeRoom.id,
      },
      {
        onSuccess: () => setMessage(""),
        onError: (error: any) => alert("Failed to send message: " + (error?.response?.data?.message || error.message)),
      }
    );
  };

  const renderMessageBubble = (msg: Message) => {
    const isDoctor = msg.userId === doctorData?.id;

    return (
      <div key={msg.id} className={`flex mb-4 ${!isDoctor ? "justify-start" : "justify-end"}`}>
        <div
          className={`max-w-[70%] px-4 py-2 rounded-2xl shadow text-sm whitespace-pre-wrap
            ${isDoctor ? "bg-white text-gray-800 rounded-tr-none" : "bg-green-500 text-white rounded-tl-none"}`}
        >
          <p>{msg.content}</p>
          <div className={`text-[10px] mt-1 ${isDoctor ? "text-gray-500" : "text-green-100"}`}>{new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
        </div>
      </div>
    );
  };

  if (isLoading) return <div className="text-center mt-8">Loading messages...</div>;
  if (isError) return <div className="text-center text-red-500 mt-8">Failed to load messages.</div>;

  return (
    <div className="flex h-screen bg-[#e5ddd5]">
      {/* Sidebar: Patient List */}
      <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-5 border-b border-gray-200">
          <h2 className="font-semibold text-lg">Patients</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {rooms?.map((room) => (
            <button key={room.id} onClick={() => setActiveRoom(room)} className={`w-full text-left p-3 hover:bg-gray-50 flex items-center gap-3 ${activeRoom?.id === room.id ? "bg-blue-50" : ""}`}>
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                <User2 className="w-10 h-10 text-gray-400" />
              </div>
              <div>
                <p className="font-medium">{room.name}</p>
                <p className="text-xs text-gray-500">
                  {room.messages.length} message{room.messages.length !== 1 ? "s" : ""}
                </p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Chat Section */}
      <main className="flex-1 flex flex-col">
        <NavDoctor />

        {/* Chat Header */}
        {activeRoom && (
          <div className="bg-white shadow-sm py-3 px-4 flex items-center gap-3 border-b">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              <User2 className="w-10 h-10 text-gray-400" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">{activeRoom.name}</h2>
              <p className="text-xs text-gray-500">Patient</p>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeRoom ? (
            <>
              {activeRoom.messages.map(renderMessageBubble)}
              <div ref={bottomRef} />
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Select a patient to view messages</p>
            </div>
          )}
        </div>

        {/* Message Input */}
        {activeRoom && (
          <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 bg-white shadow-md">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full">
              Send
            </Button>
          </form>
        )}
      </main>
    </div>
  );
}
