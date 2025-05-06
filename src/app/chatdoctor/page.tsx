"use client";

import { Button } from "@/components/ui/button";
import { useGetAllMessages } from "@/app/utils/useGetAllMessages";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

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
  // selectedRoomName set to params

  if (isLoading) {
    return <div className="text-center mt-8">Loading chat rooms...</div>;
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex flex-row w-full h-full">
        {/* Sidebar */}
        <div className="w-full bg-gray-100 p-4">
          <h2 className="text-lg font-semibold mb-4">Chats</h2>
          <div className="flex flex-col space-y-2">
            {Array.isArray(chatRooms) &&
              chatRooms.map((room: ChatRoom) => (
                <div key={room.id} className="w-full">
                  <Link href={`/chatdoctor/${selectedRoomName}`}>
                    <Button key={room.id} variant="secondary" className="w-full" onClick={() => setSelectedRoomName(room.name)}>
                      {room.name}
                      <Badge
                        variant="secondary"
                        className="ml-2"
                        style={{
                          backgroundColor: room.messages.length > 0 ? "#4caf50" : "#f44336",
                          color: "white",
                        }}
                      >
                        {room.messages.length > 0 ? room.messages.length : "Inactive"}
                      </Badge>
                    </Button>
                  </Link>
                </div>
              ))}
          </div>
        </div>

        {/* Chat Room */}
      </div>
    </div>
  );
}
