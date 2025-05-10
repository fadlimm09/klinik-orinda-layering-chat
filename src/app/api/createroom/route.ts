import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { name, doctor } = await request.json();
  try {
    const response = await prisma.roomChat.create({
      data: {
        name: name,
        doctor: doctor,
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
