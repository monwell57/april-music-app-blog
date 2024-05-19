import Image from "next/image";
import { notFound } from "next/navigation";
import { client, urlFor } from "../../../../lib/sanity";
import { PortableText } from "@portabletext/react";
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
        "authorName": author->name,
  "authorProfilePicture": author->profilePicture.asset->url,
  "authorSignature": author->signature.asset->url
      },
     
      _createdAt
    } [0]`;
  const data = await client.fetch(query);
  console.log("Fetched data:", JSON.stringify(data, null, 2));
  if (!data) {
    notFound();
  }
  return data;
}

async function BlogArticle({ params }) {
  const data = await getData(params.slug);
  if (!data) {
    notFound();
  }
  console.log(data);
  return (
    <div className="mt-8 pt-10 bg-gray-100 mb-8">
      <h1 className="text-3xl text-slate-800 sm:text-4xl block text-center leading-8 font-bold tracking-tight mt-2">
        <span>{data.title}</span>
      </h1>
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
      {/* Author section */}
      <div className="author-info mt-8">
        {data.authorProfilePicture && (
          <Image
            src={urlFor(data.authorProfilePicture).url()}
            alt={`${data.authorName}'s profile`}
            width={100}
            height={100}
            className="rounded-full"
          />
        )}
        {data.authorSignature && (
          <Image
            src={urlFor(data.authorSignature).url()}
            alt="Author's signature"
            width={200}
            height={100}
            className="mt-4"
          />
        )}
        <p className="text-slate-800 text-lg mt-2">
          Written by: {data.authorName}
        </p>
      </div>
    </div>
  );
}
