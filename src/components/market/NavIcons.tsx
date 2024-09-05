"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartModal from "./CartModal";
//import { useWixClient } from "@/hooks/useWixClient";
//import Cookies from "js-cookie";
//import { useCartStore } from "@/hooks/useCartStore";

const NavIcons = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const pathName = usePathname();

  //const wixClient = useWixClient();
  //const isLoggedIn = wixClient.auth.loggedIn();

  // AUTH WITH WIX-MANAGED AUTH


  //const { cart, counter, getCart } = useCartStore();

  // useEffect(() => {
  //   getCart(wixClient);
  // }, [wixClient, getCart]);

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src="/market/notification.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
      />
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <Image src="/market/cart.png" alt="" width={22} height={22} />
         <div className="absolute -top-4 -right-4 w-6 h-6 bg-red-500 rounded-full text-white text-sm flex items-center justify-center">
          {/* {counter} */}2
        </div> 
      </div>
       {isCartOpen && <CartModal />} 
    </div>
  );
};

export default NavIcons;
