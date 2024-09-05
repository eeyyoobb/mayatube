import prisma from "@/vendor/db";
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  try {
    const {  question, choices, correctAnswer, catagory, difficulty, type, status, score} = await request.json();

    // Validate the incoming data
    if (!question || !choices || correctAnswer === undefined) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    const newQuiz = await prisma.quiz.create({
      data: {
        question,
        choices,
        correctAnswer,
        catagory,
        difficulty,
        type,
        status,
        score: score || 0,
      },
    });

    return NextResponse.json({
      id: newQuiz.id,
      message: 'The quiz has been created successfully.',
    });
  } catch (error) {
    console.error('Error occurred during POST:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const quizzes = await prisma.quiz.findMany();
    return NextResponse.json({ quizzes });
  } catch (error) {
    console.error('Error occurred during GET:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const id = new URL(request.url).searchParams.get('id');
    const { updateQuiz, updateQuizQuestions } = await request.json();

    if (!id) {
      return NextResponse.json({ message: 'Missing quiz ID.' }, { status: 400 });
    }

    let quizToUpdate = await prisma.quiz.findUnique({ where: { id } });

    if (!quizToUpdate) {
      return NextResponse.json({ message: 'Quiz not found.' }, { status: 404 });
    }

    if (updateQuiz) {
      quizToUpdate = await prisma.quiz.update({
        where: { id },
        data: {
          ...updateQuiz,
        },
      });
    }

    if (updateQuizQuestions) {
      quizToUpdate = await prisma.quiz.update({
        where: { id },
        data: {
          question: updateQuizQuestions,
        },
      });
    }

    return NextResponse.json({ message: 'success' });
  } catch (error) {
    console.error('Error occurred during PUT:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const id = new URL(request.url).searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Missing quiz ID.' }, { status: 400 });
    }

    await prisma.quiz.delete({ where: { id } });
    return NextResponse.json({ message: 'quiz deleted' });
  } catch (error) {
    console.error('Error occurred during DELETE:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}


