import prisma from "@/vendor/db";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  
  try {

    const currentUser = await getCurrentUser();
   
    if (!currentUser) {
    return NextResponse.error();
  }


    const { title, description, link, completed, important } = await req.json();

    if (!title || !description || !link) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }

    if (title.length < 3) {
      return NextResponse.json({
        error: "Title must be at least 3 characters long",
        status: 400,
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        link,
        isCompleted: completed,
        isImportant: important,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR CREATING TASK: ", error);
    return NextResponse.json({ error: "Error creating task", status: 500 });
  }
}


export async function GET(req: Request) {
  try {
    const currentUser = await getCurrentUser();
   
    if (!currentUser) {
    return NextResponse.error();
  }


    const tasks = await prisma.task.findMany({
      where: {
        userId:currentUser.id,
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.log("ERROR GETTING TASKS: ", error);
    return NextResponse.json({ error: "Error updating task", status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const { id, isCompleted } = await req.json();

    if (!id || typeof isCompleted !== 'boolean') {
      return NextResponse.json({ error: "Invalid input", status: 400 });
    }

    const task = await prisma.task.update({
      where: {
        id: id,  // Use the task id
      },
      data: {
        isCompleted: isCompleted,  // Update the completion status
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR UPDATING TASK: ", error);
    return NextResponse.json({ error: "Error updating task", status: 500 });
  }
}