import React from "react";
import Container from "./Container";
import Link from "next/link";
import Socials from "./Socials";
import SocialsBlog from "./SocialsBlog";

const Footer = () => {
  return (
    <Container className="p-10 text-gray-100 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
      <div className="flex-1">
        <Link href="http://localhost:3000/blog">
          <h1 className="text-lg md:text-xl lg:text-2xl">Blog Articles</h1>
        </Link>
      </div>
      <div className="flex-1 justify-self-center">
        <SocialsBlog />
      </div>
      <div className="flex-1 text-right">
        <p className="text-sm text-gray-300">© All Rights Reserved</p>
      </div>
    </Container>
  );
};

export default Footer;
