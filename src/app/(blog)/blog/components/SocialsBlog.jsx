import Link from "next/link";
import {
  RiYoutubeFill,
  RiInstagramFill,
  RiSpotifyFill,
  RiSoundcloudFill,
} from "react-icons/ri";

const socials = [
  {
    path: "https://www.youtube.com/watch?v=yPJwcUj7MWw",
    icon: <RiYoutubeFill />,
  },
  {
    path: "#",
    icon: <RiInstagramFill />,
  },
  {
    path: "#",
    icon: <RiSpotifyFill />,
  },
  {
    path: "#",
    icon: <RiSoundcloudFill />,
  },
];

const Socials = () => {
  // Inline styles for the container and icons
  const containerStyle = {
    display: "flex", // This will arrange children in a row
    justifyContent: "center", // This will center the icons horizontally
    alignItems: "center", // This will center the icons vertically
  };

  const iconStyle = {
    margin: "0 10px", // This adds horizontal margin between icons
  };

  return (
    <div style={containerStyle}>
      {socials.map((item, index) => (
        <Link href={item.path} key={index}>
          <p style={iconStyle}>{item.icon}</p>
        </Link>
      ))}
    </div>
  );
};

export default Socials;
