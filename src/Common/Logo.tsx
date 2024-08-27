"use client";

import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        alt="Logo"
        className="hidden cursor-pointer mx-4 sm:block"
        src="/images/mayabannerpng.png"
        width={60}   // Adjust to a smaller width
        height={20}  // Adjust to a smaller height
      />
    </Link>
  );
};

export default Logo;
