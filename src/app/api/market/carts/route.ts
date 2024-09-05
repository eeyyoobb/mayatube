import prisma from "@/vendor/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const carts = await prisma.cart.findMany();

    return NextResponse.json({
      carts
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while fetching data"},
      { status: 500 }
    );
  }
}
