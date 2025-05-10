"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";

import { useModalStore } from "@/app/store/useModalDoctorStore";
import Modal from "@/components/modalSelectDoctor";

export default function Home() {
  const { openModal } = useModalStore();

  return (
    <>
      <Navbar />
      <Modal />
      {/* create roomchat with button "mulai chat doctor" */}
      <div className="flex flex-col items-center justify-center h-screen bg-[#e5ddd5]">
        <h1 className="text-3xl items-center justify-center font-bold mb-4">Selamat datang di Chat Doctor</h1>
        <p className="text-lg mb-8">Mulai konsultasi dengan dokter Anda sekarang!</p>
        <Button onClick={openModal} className="btn-primary">
          Mulai Chat Doctor
        </Button>
      </div>
    </>
  );
}
