import prisma from "@/vendor/db";
import { NextResponse } from "next/server";
import cuid from 'cuid';



export async function POST(req: Request) {
  try {
    const { quizTitle, icon, quizQuestions } = await req.json();

    // Validate the incoming data
    if (!quizTitle || !icon || !quizQuestions) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    // Create the new quiz with questions and statistics
    const quiz = await prisma.quiz.create({
      data: {
        quizTitle,
        icon,
        quizQuestions: {
          create: quizQuestions.map((question: any) => {
            const statisticsId = cuid();  // Generate an ID for statistics
            
            return {
              mainQuestion: question.mainQuestion,
              choices: question.choices,
              correctAnswer: question.correctAnswer,
              answeredResult: question.answeredResult,
              statisticsId,  // Link statisticsId to the question
              statistics: {
                create: {
                  id: statisticsId,  // Provide the statisticsId here
                  totalAttempts: question.statistics.totalAttempts,
                  correctAttempts: question.statistics.correctAttempts,
                  incorrectAttempts: question.statistics.incorrectAttempts,
                },
              },
            };
          }),
        },
      },
    });

    return NextResponse.json({
      id: quiz.id,
      message: 'The quiz has been created successfully.',
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error creating quiz:', error);

    return NextResponse.json({
      error: "Error creating quiz",
      details: error.message,  // Detailed error message
      status: 500
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}


export async function GET() {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        quizQuestions: {
          include: {
            statistics: true 
        } 
      } 
      },
    });

    return NextResponse.json({ quizzes });
  } catch (error) {
    return NextResponse.json({ error: "Error updating task", status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: Request) {
  try {
    const id = new URL(request.url).searchParams.get('id');
    if (!id) {
      return NextResponse.json({ message: 'Missing quiz ID.' }, { status: 400 });
    }

    const { updateQuiz, updateQuizQuestions } = await request.json();

    const updatedQuiz = await prisma.quiz.update({
      where: { id },
      data: {
        ...(updateQuiz && {
          icon: updateQuiz.icon,
          quizTitle: updateQuiz.quizTitle,
        }),
        ...(updateQuizQuestions && {
          quizQuestions: {
            upsert: updateQuizQuestions.map((question: any) => ({
              where: { id: question.id },
              create: {
                mainQuestion: question.mainQuestion,
                choices: question.choices,
                correctAnswer: question.correctAnswer,
                answeredResult: question.answeredResult,
                statistics: {
                  create: {
                    totalAttempts: question.statistics.totalAttempts,
                    correctAttempts: question.statistics.correctAttempts,
                    incorrectAttempts: question.statistics.incorrectAttempts,
                  },
                },
              },
              update: {
                mainQuestion: question.mainQuestion,
                choices: question.choices,
                correctAnswer: question.correctAnswer,
                answeredResult: question.answeredResult,
                statistics: {
                  update: {
                    totalAttempts: question.statistics.totalAttempts,
                    correctAttempts: question.statistics.correctAttempts,
                    incorrectAttempts: question.statistics.incorrectAttempts,
                  },
                },
              },
            })),
          },
        }),
      },
    });

    return NextResponse.json({ message: 'Quiz updated successfully.', updatedQuiz });
  } catch (error) {
    return NextResponse.json({ error: "Error quiz updating", status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: Request) {
  try {
    const id = new URL(request.url).searchParams.get('id');
    if (!id) {
      return NextResponse.json({ message: 'Missing quiz ID.' }, { status: 400 });
    }

    await prisma.quiz.delete({ where: { id } });
    return NextResponse.json({ message: 'Quiz deleted' });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

