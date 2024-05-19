import Link from "next/link";
// import { IoReturnDownBack } from "react-icons/io5";

const deploymentUrl =
  process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";

const StudioNavbar = (props) => {
  return (
    <div>
      <div className="p-5 bg-[#06062a] text-gray-100 flex items-center justify-between">
        <Link href={deploymentUrl} target="_blank">
          Artist Name
        </Link>
      </div>
      {props.renderDefault(props)}
    </div>
  );
};

export default StudioNavbar;
