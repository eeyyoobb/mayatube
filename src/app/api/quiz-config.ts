// import { NextResponse } from 'next/server';
// import prisma from '@/vendor/db';

// interface QuizConfigData {
//   numberOfQuestion: number;
//   categoryId: number;
//   categoryName: string;
//   level: string;
//   type: string;
// }

// export async function POST(request: Request) {
//   try {
//     const data: QuizConfigData = await request.json();

//     const { numberOfQuestion, categoryId, categoryName, level, type } = data;

//     if (numberOfQuestion === undefined || categoryId === undefined || !categoryName) {
//       return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
//     }

//     const newConfig = await prisma.quizConfig.create({
//       data: {
//         numberOfQuestion,
//         categoryId,
//         categoryName,
//         level,
//         type,
//       },
//     });

//     return NextResponse.json({ message: 'Quiz configuration saved!', config: newConfig });
//   } catch (error) {
//     console.error('Error saving config to database:', error);

//     if (error instanceof Error) {
//       return NextResponse.json({ message: error.message }, { status: 500 });
//     } else {
//       return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
//     }
//   }
// }
