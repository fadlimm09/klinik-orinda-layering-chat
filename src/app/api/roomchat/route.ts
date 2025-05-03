import { type NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { name } = await request.json();
  try {
    const response = await prisma.roomChat.findUnique({
      where: {
        name: name,
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

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  try {
    const response = await prisma.roomChat.delete({
      where: {
        id: id,
      },
    });
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error deleting room chat:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const response = await prisma.roomChat.findMany({
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
