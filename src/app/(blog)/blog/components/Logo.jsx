import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Link href={"/"}>
        <Image
          src={"/assets/header/logo.svg"}
          width={170}
          height={170}
          className="object-contain z-50"
          alt=""
        />
      </Link>
    </div>
  );
};

export default Logo;
