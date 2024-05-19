import Image from "next/image";
import { notFound } from "next/navigation";
import { client, urlFor } from "../../../../lib/sanity";
import { PortableText } from "@portabletext/react";
import ShareLinkButton from "../components/ShareLinkButton";
import Navbar from "../components/_Navbar";

// onMissingComponent={false}

export const revalidate = 30;

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

async function getData(slug) {
  const query = `*[_type == 'post' && slug.current == "${slug}"] {
      "currentSlug": slug.current,
      title,
      mainImage,
      description,
      "caption": mainImage.caption,
      body[]{
        ...,
        _type == "videoEmbed" => {
          "video": {
            "asset": {
              "playbackId": video.asset->playbackId
            }
          }
        },
      },
        "authorName": author->name,
        "authorProfilePicture": author->profilePicture.asset->url,
        "authorSignature": author->signature.asset->url,
      _createdAt
    } [0]`;
  const data = await client.fetch(query);
  console.log("Fetched data:", JSON.stringify(data, null, 2));
  if (!data) {
    notFound();
  }
  return data;
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" }; // Customize format options as needed
  return new Date(dateString).toLocaleDateString("en-US", options);
}

async function BlogArticle({ params }) {
  const data = await getData(params.slug);
  if (!data) {
    notFound();
  }
  console.log(data);
  const formattedDate = formatDate(data._createdAt); // Format the date

  return (
    <div className="mt-8 pt-10 bg-gray-100 mb-8">
      <h1 className="items-center text-3xl text-slate-800 sm:text-4xl block text-center leading-8 font-bold tracking-tight mt-2">
        <span>{data.title}</span>
      </h1>
      <div className="flex justify-center gap-3 items-baseline text-gray-900">
        <p className="italic pb-1 pt-4 text-xl">{formattedDate}</p>
        <ShareLinkButton />
      </div>
      <div className="w-full mx-auto mt-8">
        <Image
          src={urlFor(data.mainImage).url()}
          width={800}
          height={800}
          alt="title image"
          priority
          className="rounded-lg mt-8 block mx-auto"
        />
        {data.mainImage.caption && (
          <p className="text-center mt-2 text-gray-600">
            {data.mainImage.caption}
          </p>
        )}
      </div>
      <div className={richTextStyles} style={{ padding: "0 16px" }}>
        <PortableText value={data.body} components={myPortableTextComponents} />
      </div>
      <div className="author-info text-center mt-8">
        {data.authorProfilePicture && (
          <Image
            src={urlFor(data.authorProfilePicture).url()}
            alt={`${data.authorName}'s profile`}
            width={100}
            height={100}
            className="rounded-full mx-auto"
          />
        )}
        {data.authorSignature && (
          <Image
            src={urlFor(data.authorSignature).url()}
            alt="Author's signature"
            width={200}
            height={100}
            className="mx-auto mt-4"
          />
        )}
        <p className="text-slate-800 text-lg mt-2 pb-14">
          Written by: {data.authorName}
        </p>
      </div>
    </div>
  );
}

export default BlogArticle;

const myPortableTextComponents = {
  types: {
    image: ({ value }) => (
      <Image
        src={urlFor(value).url()}
        alt="Post"
        width={450}
        height={450}
        style={{
          float: "left", // or 'right' if you prefer the image to be on the right
          marginRight: "20px", // Adjust spacing as needed
          marginBottom: "20px",
        }}
      />
    ),
    videoEmbed: ({ value }) => {
      const playbackId = value.video.asset.playbackId;
      console.log("Playback ID:", playbackId); // Log the playback ID
      const videoUrl = `https://stream.mux.com/${playbackId}.m3u8`;
      console.log("Video URL:", videoUrl); // Log the full video URL

      if (!playbackId) return <p>Video is not available</p>;
      return (
        <video controls width="100%">
          <source src={videoUrl} type="application/x-mpegURL" />
          Your browser does not support the video tag.
        </video>
      );
    },
  },
  block: {
    h2: ({ value }) => (
      <h2
        id={slugify(value.children[0].text)}
        className="text-3xl font-bold mb-3"
      >
        {value.children[0].text}
      </h2>
    ),
    h3: ({ value }) => (
      <h3
        id={slugify(value.children[0].text)}
        className="text-2xl font-bold mb-3"
      >
        {value.children[0].text}
      </h3>
    ),
    h4: ({ value }) => (
      <h4
        id={slugify(value.children[0].text)}
        className="text-2xl font-bold mb-3"
      >
        {value.children[0].text}
      </h4>
    ),
    h5: ({ value }) => (
      <h5
        id={slugify(value.children[0].text)}
        className="text-2xl font-bold mb-3"
      >
        {value.children[0].text}
      </h5>
    ),
    h6: ({ value }) => (
      <h6
        id={slugify(value.children[0].text)}
        className="text-xl font-bold mb-3"
      >
        {value.children[0].text}
      </h6>
    ),
  },
};

const richTextStyles = `
mt-16 mb-32 mx-auto prose prose-lg prose-p:text-slate-800 prose-blockquote:text-slate-800 prose-figure:text-slate-800 prose-figcaption:text-slate-800 prose-strong:text-slate-800 prose-em:text-slate-800 prose-ol:text-slate-800 prose-ul:text-slate-800 prose-li:text-slate-800 text-slate-800 prose-headings:text-slate-800  prose-a:text-blue-400 hover:prose-a:text-blue-600
`;
