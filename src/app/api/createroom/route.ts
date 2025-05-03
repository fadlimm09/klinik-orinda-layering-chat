import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { name } = await request.json();
  try {
    const response = await prisma.roomChat.create({
      data: {
        name: name,
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
