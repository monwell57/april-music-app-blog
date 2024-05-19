import Image from "next/image";
import { notFound } from "next/navigation";
import { client, urlFor } from "../../../../lib/sanity";
import { PortableText } from "@portabletext/react";

// onMissingComponent={false}

export const revalidate = 30;

async function getData(slug) {
  const query = `*[_type == 'post' && slug.current == "${slug}"] {
    "currentSlug": slug.current,
      title,
    mainImage,
    "video": video.asset->{
      playbackId
    },
      description,
      body[]{
        ...,
        _type == "mux.video" => {
          "playbackId": asset->playbackId
        }
      },
      _createdAt
  } [0]
        
    `;
  const data = await client.fetch(query, {
    next: {
      revalidate: 30,
    },
  });
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
  return (
    <div className="mt-8 pt-10 bg-gray-100">
      <h1 className="text-3xl text-slate-800 sm:text-4xl block text-center leading-8 font-bold tracking-tight  mt-2">
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
      </div>
      <div className={richTextStyles}>
        <PortableText value={data.body} components={myPortableTextComponents} />
      </div>
    </div>
  );
}

export default BlogArticle;

const myPortableTextComponents = {
  types: {
    image: ({ value }) => (
      <Image src={urlFor(value).url()} alt="Post" width={450} height={450} />
    ),
    video: ({ value }) => {
      if (!value.asset) return null;
      return (
        <video controls width="100%">
          <source
            src={`https://stream.mux.com/${value.asset.playbackId}.m3u8`}
            type="application/x-mpegURL"
          />
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
mt-16 mx-auto prose prose-lg prose-p:text-slate-800 prose-blockquote:text-slate-800 prose-figure:text-slate-800 prose-figcaption:text-slate-800 prose-strong:text-slate-800 prose-em:text-slate-800 prose-ol:text-slate-800 prose-ul:text-slate-800 prose-li:text-slate-800 text-slate-800 prose-headings:text-slate-800  prose-a:text-red-200 hover:prose-a:text-red-400
`;
