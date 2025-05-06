"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function NavigationMenuDemo() {
  return (
    <>
      <div className="flex items-center justify-between p-4 bg-green-50 ">
        <Link href="/chatdoctor">
          <Button className="btn-primary">Back</Button>
        </Link>
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Button className="btn-primary">Home</Button>
          </Link>
          <Link href="">
            <Button className="btn-primary">Konsultasi</Button>
          </Link>
          <Link href="">
            <Button className="btn-primary">Jadwal Dokter</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
