import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[500px] flex items-center justify-center text-center">
      <div className="px-4 md:px-6 max-w-[1500px] mx-auto w-[90%]">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-dark">
            Custom Quiz App
          </h1>
          <p className="text-gray-600">
            Get ready to ace it.
          </p>
        </div>
        <div className="mt-6">
          <Link
            href={"/quizzes/custom/quiz"}
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-black shadow transition-colors duration-500 hover:bg-primary/80"
          >
            I'm ready
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;



// import DropdownOptions from '@/components/quiz/custom/DropdownOptions'
// import InputBox from '@/components/quiz/custom/InputBox'
// import Button from '@/components/quiz/custom/Buttons'
// export default function Home() {

//   return (
//    <section className='flex flex-col justify-center items-center my-10 '>
// {/* //from flowbite */}
// <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Welcome to the Trivia Quiz...</h1>
// <section className='p-10 my-10 rounded-lg shadow-xl w-[65%]'>

// {/* Flowbite? */}
// <InputBox/>
// <DropdownOptions/>
// <div className=" flex items-center justify-center">
//  <Button/> 
// </div>

// </section>
//    </section>
//   )
// }
