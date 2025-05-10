import { NextRequest } from "next/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { name, doctor } = await req.json();

  try {
    let existingRoom = await prisma.roomChat.findFirst({
      where: { name, doctor },
      include: {
        messages: {
          include: { user: true },
        },
      },
    });

    if (existingRoom) {
      return new Response(JSON.stringify(existingRoom), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newRoom = await prisma.roomChat.create({
      data: {
        name,
        doctor,
        messages: {
          create: [
            {
              content: `izin memperkenalkan diri nama saya ${name}, saya ingin mengobrol dengan dokter tentang kesehatan saya`,
              user: {
                connectOrCreate: {
                  where: { id: "defaultUserId" },
                  create: { name },
                },
              },
            },
          ],
        },
      },
      include: {
        messages: {
          include: { user: true },
        },
      },
    });

    return new Response(JSON.stringify(newRoom), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
      // Duplicate room (race condition) — ambil ulang datanya
      const existingRoom = await prisma.roomChat.findFirst({
        where: { name, doctor },
        include: {
          messages: {
            include: { user: true },
          },
        },
      });

      if (existingRoom) {
        return new Response(JSON.stringify(existingRoom), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    console.error("Error creating room chat:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
