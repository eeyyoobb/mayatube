"use client";

import { SidebarContext } from "@/context/SidebarContext";
import { Channel } from "@prisma/client";
import { useContext } from "react";
import NavigationHeader from "../NavigationHeader";
import MenuItem from "../Navbar/UserOptions/MenuItem";
import { MdOutlineHome, MdOutlineSubscriptions,MdOutlineQuiz,MdOutlineWorkOutline,MdOutlinePlayArrow} from "react-icons/md";
import { useRouter } from "next/navigation";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import Avatar, { AvatarSize } from "../../../../Common/Avatar";

interface SidebarProps {
  subscribedChannels: Channel[];
}

const Sidebar: React.FC<SidebarProps> = ({ subscribedChannels }) => {
  const sidebar = useContext(SidebarContext);

  const currentUser = useContext(CurrentUserContext);

  const router = useRouter();

  const handleItemClick = (onClick: () => void) => {
    onClick();
    sidebar?.onClose();
  };
  return (
    <>
      {sidebar?.isOpen && (
        <div
          className={`bg-black bg-opacity-50 h-screen w-screen fixed z-30`}
          onClick={() => sidebar.onClose()}
        />
      )}
      <div
        className={`fixed w-64 bg-stone-950 z-40 mt-2 px-6 flex flex-col h-screen overflow-scroll no-scrollbar ${
          sidebar?.isOpen ? "translate-x-0" : "-translate-x-full"
        } ease-in-out duration-300`}
      >
        <NavigationHeader />
        <div className="pt-6 pb-3 border-b border-b-neutral-700">
          <MenuItem
            label="Home"
            logo={<MdOutlineHome className="h-6 w-6 mr-4" />}
            round
            onClick={() => handleItemClick(() => router.push("/"))}
          />
          
           {currentUser ? ( 
             <>
             <MenuItem
              label="videos"
              logo={<MdOutlinePlayArrow className="h-6 w-6 mr-4" />}
              round
              onClick={() =>
                handleItemClick(() => router.push("/video"))
              }
              />
          <MenuItem
              label="Quizzes"
              logo={<MdOutlineQuiz className="h-6 w-6 mr-4" />}
              round
              onClick={() =>
                handleItemClick(() => router.push("/quizzes"))
              }
              />
            <MenuItem
              label="Tasks"
              logo={<MdOutlineWorkOutline className="h-6 w-6 mr-4" />}
              round
              onClick={() =>
                handleItemClick(() => router.push("/tasks"))
              }
            />
            <MenuItem
              label="Subscriptions"
              logo={<MdOutlineSubscriptions className="h-6 w-6 mr-4" />}
              round
              onClick={() =>
                handleItemClick(() => router.push("/subscriptions"))
              }
            />
             <div className="h-0.5 bg-gray-300 w-full my-4"></div>
              <MenuItem
              label="Blog"
              logo={<MdOutlineQuiz className="h-6 w-6 mr-4" />}
              round
              onClick={() =>
                handleItemClick(() => router.push("/blog"))
              }
              />
            <MenuItem
              label="Store"
              logo={<MdOutlineQuiz className="h-6 w-6 mr-4" />}
              round
              onClick={() =>
                handleItemClick(() => router.push("/store"))
              }
              />
               <MenuItem
              label="Market"
              logo={<MdOutlineQuiz className="h-6 w-6 mr-4" />}
              round
              onClick={() =>
                handleItemClick(() => router.push("/market"))
              }
              />
              <MenuItem
              label="Job Board"
              logo={<MdOutlineQuiz className="h-6 w-6 mr-4" />}
              round
              onClick={() =>
                handleItemClick(() => router.push("/job"))
              }
              />
              <MenuItem
              label="Health Center"
              logo={<MdOutlineQuiz className="h-6 w-6 mr-4" />}
              round
              onClick={() =>
                handleItemClick(() => router.push("/Health"))
              }
              />
            </>
           ) : null} 
        </div>
        {currentUser ? (
          <div className="pt-3">
            <h2 className="font-medium mb-2">Subscriptions</h2>
            {subscribedChannels.map((subscribedChannel) => {
              return (
                <MenuItem
                  key={subscribedChannel.id}
                  label={subscribedChannel.name}
                  logo={
                    <Avatar
                      imageSrc={subscribedChannel.imageSrc}
                      size={AvatarSize.small}
                      className="mr-4"
                    />
                  }
                  round
                  onClick={() =>
                    handleItemClick(() =>
                      router.push(`/channel/${subscribedChannel.id}`)
                    )
                  }
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Sidebar;
