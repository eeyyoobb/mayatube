import { NextRequest, NextResponse } from "next/server";
import prisma from "@/vendor/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, quizScore, correctAnswers, wrongAnswers } = body;

  try {
    // Check if the user exists
    let existingUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { quizResults: true },
    });

    if (existingUser) {
      // Check if the user already has quiz results
      if (existingUser.quizResults && existingUser.quizResults.length > 0) {
        const updatedUserStats = await prisma.quizResult.update({
          where: { id: existingUser.quizResults[0].id },
          data: {
            quizScore: existingUser.quizResults[0].quizScore + quizScore,
            correctAnswers: existingUser.quizResults[0].correctAnswers + correctAnswers,
            wrongAnswers: existingUser.quizResults[0].wrongAnswers + wrongAnswers,
          },
        });
        return NextResponse.json({ updatedUserStats });
      } else {
        // Create a new quiz result if none exist
        const newQuizResult = await prisma.quizResult.create({
          data: {
            userId: userId,
            quizScore: quizScore,
            correctAnswers: correctAnswers,
            wrongAnswers: wrongAnswers,
          },
        });
        return NextResponse.json({ newQuizResult });
      }
    } else {
      // Handle case where the user does not exist
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error handling quiz results:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
