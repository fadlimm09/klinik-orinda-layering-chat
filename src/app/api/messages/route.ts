import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const response = await prisma.message.findMany();
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { content, userId, roomChatId } = await request.json();
    const newMessage = await prisma.message.create({
      data: {
        content,
        userId,
        roomChatId,
      },
    });
    return new Response(JSON.stringify(newMessage), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating message:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const deletedMessage = await prisma.message.delete({
      where: { id },
    });
    return new Response(JSON.stringify(deletedMessage), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
