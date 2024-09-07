import StatCard from "@/components/quiz/ui/StatCard";
import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/vendor/db";

const Page = async () => {
  const currentUser = await getCurrentUser();

  // Fetch quiz results directly for the current user
  const user = await prisma.user.findUnique({
    where: {
      id: currentUser?.id,
    },
    include: {
      quizResults: true,
    },
  });

  // Handle cases where the user or quizResults are not found
  const quizResults = user?.quizResults?.[0] || {
    quizScore: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  };


  return (
    <div className="py-20">
      <div className="text-center mb-10 text-2xl uppercase">
        <h1>{currentUser?.name} Stats 📊</h1>
      </div>
      <div className="max-w-[1500px] mx-auto w-[90%] grid sm:grid-cols-3 gap-10 justify-center">
        <StatCard
          title="Total Points"
          value={quizResults.quizScore}
        />
        <StatCard
          title="Correct Answers"
          value={quizResults.correctAnswers}
        />
        <StatCard
          title="Wrong Answers"
          value={quizResults.wrongAnswers}
        />
      </div>
    </div>
  );
};

export default Page;
