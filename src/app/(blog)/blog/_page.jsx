// import Link from "next/link";
// import { client, urlFor } from "../../../lib/sanity";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/Card";

// export const revalidate = 30;

// async function getPosts() {
//   const query = `*[_type == 'post'] | order(_createdAt desc) {
//      ...,
//         title,
//         description,
//         "currentSlug": slug.current,
//         createdAt
//       }`;
//   const data = await client.fetch(query);
//   return data;
// }

// const Blog = async () => {
//   const data = await getPosts();

//   return (
//     <div className="min-h-screen bg-gray-100 grid grid-cols-1 md:grid-cols-2 mt-8 pb-20 gap-5 px-24">
//       {data.map((post, index) => (
//         <Card key={index}>
//           <Image
//             src={urlFor(post.mainImage.asset).url()}
//             width={500}
//             height={500}
//             alt="title image"
//             priority
//             className="rounded-t-lg mt-8 block mx-auto"
//           />

//           <CardContent className="px-12 mt-5">
//             <h3 className="text-lg text-slate-800 text-center line-clamp-2 font-bold">
//               {post.title}
//             </h3>
//             <p className="line-clamp-3 text-sm mt-2 text-gray-500">
//               {post.description}
//             </p>
//             {/* <p>{post.createdAt}</p> */}
//             <Button asChild className="w-full mt-3">
//               <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
//             </Button>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default Blog;
