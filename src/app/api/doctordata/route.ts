import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { doctor } = await request.json();
    if (!doctor) {
      return new Response("Missing required field: doctorName", { status: 400 });
    }
    const response = await prisma.user.findFirst({
      where: {
        name: doctor,
      },
    });
    if (!response) {
      return new Response("Doctor not found", { status: 404 });
    }
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching doctor data:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
