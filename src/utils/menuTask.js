import { list, check, todo, home } from "@/Common/Icons";

const menu = [
  {
    id: 1,
    title: "All Tasks",
    icon: home,
    link: "/tasks/",
  },
  {
    id: 2,
    title: "Important!",
    icon: list,
    link: "/tasks/important",
  },
  {
    id: 3,
    title: "Completed!",
    icon: check,
    link: "/tasks/completed",
  },
  {
    id: 4,
    title: "Do It Now",
    icon: todo,
    link: "/tasks/incomplete",
  },
];

export default menu;
