import prisma from "@/vendor/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const products = await prisma.product.findMany();

    return NextResponse.json({
      products
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while fetching data" },
      { status: 500 }
    );
  }
}
