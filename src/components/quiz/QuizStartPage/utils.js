// quizUtils.js
export function startTimer(time, onUpdateTime, interval, setTimer) {
  clearInterval(interval);
  setTimer(time);

  interval = setInterval(() => {
    setTimer((currentTime) => {
      onUpdateTime(currentTime);
      if (currentTime === 0) {
        clearInterval(interval);
        return 0;
      }
      return currentTime - 1;
    });
  }, 1000);
}

export function selectChoiceFunction(
  choiceIndexClicked,
  setSelectedChoice,
  allQuizzes,
  indexOfQuizSelected,
  currentQuestionIndex,
  setAllQuizzes
) {
  // update the selectedChoice variable state
  setSelectedChoice(choiceIndexClicked);
  //---------------------------------------

  //We update the answerResult property in the allQuizzes array
  const currentAllQuizzes = [...allQuizzes];

  currentAllQuizzes[indexOfQuizSelected].quizQuestions[
    currentQuestionIndex
  ].answeredResult = choiceIndexClicked;

  setAllQuizzes(currentAllQuizzes);
  //------------------------------------
}

export function moveToTheNextQuestion(
  allQuizzes,
  indexOfQuizSelected,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  setSelectedChoice,
  setTimer,
  setIsQuizEnded,
  setScore,
  addExperience,
  quizQuestions,
  interval
) {
  // Check if the user selected an answer
  if (
    allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
      .answeredResult === -1
  ) {
    toast.error('Please select an answer');
    return;
  }

  // Update the statistics of the question
  allQuizzes[indexOfQuizSelected].quizQuestions[
    currentQuestionIndex
  ].statistics.totalAttempts += 1;

  // if the answer is incorrect
  if (
    allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
      .answeredResult !==
    allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
      .correctAnswer
  ) {
    allQuizzes[indexOfQuizSelected].quizQuestions[
      currentQuestionIndex
    ].statistics.incorrectAttempts += 1;
    toast.error('Incorrect Answer!');

    if (currentQuestionIndex !== quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((current) => current + 1);
        setSelectedChoice(null);
      }, 1200);
    } else {
      setTimer(0);
      clearInterval(interval);
      setIsQuizEnded(true);
    }

    return;
  }

  // update the correct attempts
  allQuizzes[indexOfQuizSelected].quizQuestions[
    currentQuestionIndex
  ].statistics.correctAttempts += 1;

  setScore((prevState) => prevState + 1);
  toast.success('Awesome!');
  addExperience();

  if (
    currentQuestionIndex === quizQuestions.length - 1 &&
    allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
      .answeredResult ===
      allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
        .correctAnswer
  ) {
    setTimer(0);
    clearInterval(interval);
    setIsQuizEnded(true);
    return;
  }

  setTimeout(() => {
    setCurrentQuestionIndex((current) => current + 1);
    setSelectedChoice(null);
  }, 2000);
}
