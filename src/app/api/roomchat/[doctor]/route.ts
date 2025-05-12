// app/api/roomchat/[doctor]/route.ts
import { type NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { doctor: string } }) {
  const { doctor } = params;
  try {
    const response = await prisma.roomChat.findMany({
      where: {
        doctor: doctor,
      },
      include: {
        messages: {
          include: {
            user: true,
          },
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
    console.error("Error fetching room chat:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
