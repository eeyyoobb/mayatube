"use client";

import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        alt="Logo"
        className="hidden cursor-pointer mx-4 sm:block"
        height="40"
        width="120"
        src="/images/mayabannerpng.png"
      />
    </Link>
  );
};

export default Logo;
