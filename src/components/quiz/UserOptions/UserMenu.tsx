import { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { PiUserSquareFill } from "react-icons/pi";
import MenuItem from "./MenuItem";
import { useRouter } from "next/navigation";

const UserMenu = () => {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  let timeoutId: NodeJS.Timeout;

  const router = useRouter();

  const handleMouseEnter = () => {
    clearTimeout(timeoutId); // Clear any existing timeouts
    setOpenUserMenu(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setOpenUserMenu(false);
    }, 100); // Close after 1 second
  };

  return (
    <div
      className="text-xl mt-1 cursor-pointer p-2 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CgMenuGridO />
      {openUserMenu && (
        <div className="absolute rounded-md shadow-md w-72 bg-zinc-800 right-2 top-16 text-sm flex flex-col overflow-hidden z-40">
          <MenuItem
            logo={<PiUserSquareFill className="h-7 w-7 mr-4" />}
            label="Stats"
            onClick={() => {
              router.push('/quizzes/custom/stats');
              setOpenUserMenu(false);
            }}
          />
          <MenuItem
            logo={<PiUserSquareFill className="h-7 w-7 mr-4" />}
            label="Leaders"
            onClick={() => {
              router.push('/quizzes/custom/leaders');
              setOpenUserMenu(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
