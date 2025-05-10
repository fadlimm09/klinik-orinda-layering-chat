import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const response = await prisma.user.findMany();
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    const newUser = await prisma.user.create({
      data: {
        name,
      },
    });
    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
