"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* create roomchat with button "mulai chat doctor" */}
      <div className="flex flex-col items-center justify-center h-screen bg-[#e5ddd5]">
        <h1 className="text-3xl font-bold mb-4">Selamat datang di Chat Doctor</h1>
        <p className="text-lg mb-8">Mulai konsultasi dengan dokter Anda sekarang!</p>
        <Button className="btn-primary">Mulai Chat Doctor</Button>
      </div>
    </>
  );
}
