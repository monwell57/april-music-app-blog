import Image from "next/image";
import Link from "next/link";
import React from "react";
import Socials from "./Socials";

const Navbar = ({ showBlogButton }) => {
  const navbarStyle = {
    backgroundColor: "#06062a", // Set the background color for the navbar
  };
  return (
    <div
      className="w-full bg-blue-600 shadow-md flex h-2 items-center"
      style={navbarStyle}
    >
      <div>
        <style>{buttonStyle}</style>
        <Link href="/">
          <button className="button" style={{ paddingLeft: "10px !important" }}>
            Home
          </button>
        </Link>
        {showBlogButton && (
          <Link href="/blog">
            <button className="button">Blog</button>
          </Link>
        )}
        {/* Rest of your blog code */}
      </div>
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 lg:px-0 h-full">
        <Link
          href={"../../"}
          className="relative flex w-[226px] h-[37.64px] transition-all xl:mb-0"
        >
          <Image
            src={"/assets/header/logo.svg"}
            fill
            className="object-contain"
            alt=""
          />
        </Link>
      </div>
      <div className="pr-10">
        <Socials />
      </div>
    </div>
  );
};

export default Navbar;

const buttonStyle = `
  .button {
    background-color: #007bff;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .button:hover {
    background-color: #0056b3;
   
  }
`;
