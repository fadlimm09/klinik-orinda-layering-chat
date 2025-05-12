import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, doctor } = await req.json();

    // Input validation
    if (!name || !doctor) {
      return new Response(JSON.stringify({ error: "Name and doctor are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if a room with this name AND doctor already exists
    const existingRoom = await prisma.roomChat.findFirst({
      where: {
        AND: [{ name: name }, { doctor: doctor }],
      },
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

    // Create or find user
    const user = await prisma.user.upsert({
      where: { name: name },
      create: {
        name: name,
        // Add other required fields or use defaults
      },
      update: {},
    });

    // Create new room
    const newRoom = await prisma.roomChat.create({
      data: {
        name,
        doctor,
        messages: {
          create: [
            {
              content: `izin memperkenalkan diri nama saya ${name}, saya ingin mengobrol dengan dokter ${doctor} tentang kesehatan saya`,
              userId: user.id,
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
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in POST /api/findroom:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
