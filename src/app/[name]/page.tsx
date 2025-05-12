"use client";

import { useEffect } from "react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useFindRoomChat } from "@/app/utils/useFindRoomChat";
import { useModalStore } from "../store/useModalDoctorStore";
import Modal from "@/components/modalSelectDoctor";

export default function Home() {
  const { name } = useParams();
  const router = useRouter();
  const { openModal, selectedDoctor } = useModalStore();
  const { mutate, data, isError, isPending } = useFindRoomChat();

  // Handle room redirect when data is available
  useEffect(() => {
    if (data && selectedDoctor) {
      router.push(`/roomchat/${data.name}/${selectedDoctor}`);
    }
  }, [data, selectedDoctor, router]);

  // Mutate when name and doctor are available
  useEffect(() => {
    if (name && selectedDoctor) {
      mutate({ name: name as string, doctor: selectedDoctor });
    }
  }, [mutate, selectedDoctor, name]);

  const handleStartChat = () => {
    openModal();
  };

  if (isPending) return <div className="text-center mt-8">Loading...</div>;
  if (isError) return <div className="text-center text-red-500 mt-8">Failed to load data.</div>;

  return (
    <>
      <Navbar />
      <Modal />

      <div className="flex flex-col items-center justify-center h-screen bg-amber-50">
        <h1 className="text-3xl font-bold mb-4">Selamat datang, {name}</h1>
        <h2>di Chat Doctor Klinik Orinda</h2>
        <p className="text-lg mb-8">Mulai konsultasi dengan dokter Anda sekarang!</p>
        <Button onClick={handleStartChat} className="btn-primary">
          Mulai Chat Doctor
        </Button>
      </div>
    </>
  );
}
