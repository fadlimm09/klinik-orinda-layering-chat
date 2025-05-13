import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { doctor: string } }) {
  const { doctor } = await params;
  const isDoctor = !doctor ? "dokterAgah" : doctor;

  try {
    const response = await prisma.roomChat.findMany({
      where: {
        doctor: isDoctor,
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
