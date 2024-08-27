import Quiz from '@/models/QuizSchema';
import { connectToDB } from '@/vendor/mongoDB';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await connectToDB();
  try {
    const { quizTitle, icon, quizQuestions} = await request.json();
    
    // Validate the incoming data
    if (!quizTitle || !icon || !quizQuestions) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    const newQuiz = await Quiz.create({ quizTitle, icon, quizQuestions });

    return NextResponse.json({
      id: newQuiz._id,
      message: 'The quiz has been created successfully.',
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
  await connectToDB();
  const quizzes = await Quiz.find();
  try {
    return NextResponse.json({ quizzes });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export async function PUT(request) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    let quizToUpdate = await Quiz.findById(id);

    const { updateQuiz, updateQuizQuestions } = await request.json();
    // Update properties of quizToUpdate
    if (updateQuiz) {
      quizToUpdate.icon = updateQuiz.icon;
      quizToUpdate.quizTitle = updateQuiz.quizTitle;
      quizToUpdate.quizQuestions = updateQuiz.quizQuestions;
    }

    if (updateQuizQuestions) {
      quizToUpdate.quizQuestions = updateQuizQuestions;
    }

    await quizToUpdate.save();
    return NextResponse.json({ message: 'success' });
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id');
  await connectToDB();
  await Quiz.findByIdAndDelete(id);
  return NextResponse.json({ message: 'quiz deleted' });
}
