import { IconType } from "react-icons";
import { MdHome } from "react-icons/md";
import { GiWhiteBook } from "react-icons/gi";

type Route = {
  name: string;
  path: string;
  icon: IconType;
};

export const routes: Route[] = [
  {
    name: "Home",
    path: "/home",
    icon: MdHome,
  },
  {
    name: "Register",
    path: "/register",
    icon: GiWhiteBook,
  },
];
