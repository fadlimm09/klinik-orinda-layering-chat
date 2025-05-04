"use client";

import { Button } from "@/components/ui/button";
import { useGetAllMessages } from "@/app/utils/useGetAllMessages";
import ChatRoomDoctor from "@/components/chatroomdoctor";
import { useState } from "react";

interface ChatRoom {
  id: string;
  name: string;
  messages: {
    id: string;
    content: string;
    user: {
      id: string;
      name: string;
    };
  }[];
}

export default function DoctorPage() {
  const { data: chatRooms, isLoading, isError } = useGetAllMessages();
  const [selectedRoomName, setSelectedRoomName] = useState<string>("");

  console.log(selectedRoomName);

  if (isLoading) {
    return <div className="text-center mt-8">Loading chat rooms...</div>;
  }

  if (isError || !Array.isArray(chatRooms)) {
    return <div className="text-center text-red-500 mt-8">Failed to load chat rooms.</div>;
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex flex-row w-full h-full">
        {/* Sidebar */}
        <div className="w-2/5 bg-gray-100 p-4">
          <h2 className="text-lg font-semibold mb-4">Chats</h2>
          <div className="flex flex-col space-y-2">
            {chatRooms.map((room: ChatRoom) => (
              <Button key={room.id} variant="outline" className="w-full" onClick={() => setSelectedRoomName(room.name)}>
                {room.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Chat Room */}
        <div className="w-3/4 bg-white p-4">{selectedRoomName ? <ChatRoomDoctor name={selectedRoomName} /> : <div className="text-center text-gray-500">Select a chat room to view messages.</div>}</div>
        {/* <ChatRoomDoctor name={selectedRoomName} /> */}
      </div>
    </div>
  );
}
