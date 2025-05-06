import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { name } = await req.json(); // usually user name or custom room name

  try {
    // 1. Check if room already exists
    let existingRoom = await prisma.roomChat.findUnique({
      where: { name },
      include: {
        messages: {
          include: { user: true },
        },
      },
    });

    // 2. If it exists, return it
    if (existingRoom) {
      return new Response(JSON.stringify(existingRoom), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 3. If not, create new room
    if (!existingRoom) {
      try {
        const response = await prisma.roomChat.create({
          data: {
            name: name,
            messages: {
              create: [
                {
                  content: `izin memperkenalkan diri nama saya ${name}, saya ingin mengobrol dengan dokter tentang kesehatan saya`,
                  user: {
                    connectOrCreate: {
                      where: { id: "defaultUserId" }, // Replace with actual user ID or logic
                      create: { name: name },
                    },
                  },
                },
              ],
            },
          },
        });
        return new Response(JSON.stringify(response), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error("Error creating room chat:", error);
        return new Response("Internal Server Error", { status: 500 });
      }
    }
  } catch (error) {
    console.error("Error in RoomChat creation:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
