import { type NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { name, doctor } = await request.json();

    if (!name || !doctor) {
      return new Response("Missing required fields: name or doctor", { status: 400 });
    }

    const response = await prisma.roomChat.findFirst({
      where: {
        name: name,
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

    if (!response) {
      return new Response("Room chat not found", { status: 404 });
    }

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
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response("Missing required field: id", { status: 400 });
    }

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
