import Logo from "./Logo";
import Link from "next/link";

const Navbar = () => {
  const navigation = [
    { title: "Website", href: "/" },
    { title: "Bloglist", href: "http://localhost:3000/blog" },
  ];

  return (
    <div className="w-full h-20 shadow-md bg-white fixed top-0 z-10 bg-opacity-80 backdrop-blur-lg">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 lg:px-0 h-full">
        <Logo />
        <div className="flex flex-col sm:flex-row md:inline-flex items-center gap-7">
          {navigation.map((item) => (
            <Link
              key={item?.title}
              href={item?.href}
              className="text-sm uppercase font-semibold relative group text-blue-500 hover:text-blue-800 hover:underline hover:underline-thick hover:underline-offset duration-200"
            >
              {item?.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
