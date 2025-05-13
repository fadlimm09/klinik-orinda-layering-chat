import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

// ✅ Gunakan context sebagai argumen kedua dan destructure dari situ
export async function GET(req: NextRequest, context: { params: { doctor: string } }) {
  const { doctor } = context.params;

  try {
    const response = await prisma.roomChat.findMany({
      where: {
        doctor: doctor || "dokterAgah", // fallback jika perlu
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
