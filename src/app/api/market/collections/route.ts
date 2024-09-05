import prisma from "@/vendor/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const collections = await prisma.collection.findMany();

    return NextResponse.json({
      collections
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while fetching data" },
      { status: 500 }
    );
  }
}
