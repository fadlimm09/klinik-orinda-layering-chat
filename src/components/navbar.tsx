"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import logo from "../../public/logo.png";

export default function NavigationMenuDemo() {
  return (
    <>
      <div className="flex items-center justify-between p-4 bg-green-50 ">
        <Link href="https://klinik-orinda-avk8mb5ya.vercel.app//#" target="_blank">
          <Image src={logo} width={60} alt="logo" />
        </Link>
        <div className="flex items-center space-x-2">
          <Link href="https://klinik-orinda-avk8mb5ya.vercel.app//#" target="_blank">
            <Button className="btn-primary">Home</Button>
          </Link>
          <Link href="https://klinik-orinda-avk8mb5ya.vercel.app//consult/category" target="_blank">
            <Button className="btn-primary">Konsultasi</Button>
          </Link>
          <Link href="https://klinik-orinda-avk8mb5ya.vercel.app//jadwaldokter" target="_blank">
            <Button className="btn-primary">Jadwal Dokter</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
