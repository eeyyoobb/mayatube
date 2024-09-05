import { list, check, todo, home } from "@/Common/Icons";

const menu = [
  {
    id: 1,
    title: "Card",
    icon: home,
    link: "/quizzes/",
  },
  {
    id: 2,
    title: "Custom ",
    icon: list,
    link: "/quizzes/custom",
  },
  {
    id: 3,
    title: "Completed!",
    icon: check,
    link: "/quizzes/completed",
  },
  {
    id: 4,
    title: "LeaderBoard",
    icon: todo,
    link: "/quizzes/custom/leaders",
  },
];

export default menu;
