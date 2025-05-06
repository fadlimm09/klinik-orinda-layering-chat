"use client";

import { useEffect } from "react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useFindRoomChat } from "@/app/utils/useFindRoomChat";

export default function Home() {
  const { name } = useParams();
  const router = useRouter();

  const { mutate, data, isError, isPending } = useFindRoomChat();

  useEffect(() => {
    if (name) {
      mutate({ name: name as string });
    }
  }, [name]);

  if (isPending) return <div className="text-center mt-8">Loading...</div>;
  if (isError) return <div className="text-center text-red-500 mt-8">Failed to load data.</div>;
  if (!data) return <div className="text-center mt-8">Room not found.</div>;

  const handleStartChat = () => {
    router.push("/roomchat/" + data.name);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-[#e5ddd5]">
        <h1 className="text-3xl font-bold mb-4">Selamat datang, {name} </h1>
        <h2>di Chat Doctor Klinik Orinda</h2>
        <p className="text-lg mb-8">Mulai konsultasi dengan dokter Anda sekarang!</p>
        <Button onClick={handleStartChat} className="btn-primary">
          Mulai Chat Doctor
        </Button>
      </div>
    </>
  );
}
