import Link from "next/link";
import { client } from "../../lib/sanity";
import SectionHeader from "../SectionHeader";
import PostList from "./PostList";
import { getPosts } from "@/app/(root)/page";

const Blog = async () => {
  const data = await getPosts();
  // console.log("[BLOGPostpage]:", data);
  return (
    <section className="section" id="blog">
      <div className="container mx-auto">
        <SectionHeader pretitle="Our Blog" title="Latest News" />
        <PostList posts={data} />
      </div>
      {/* {data.map((post, index) => ( 
        <Link href={`/blog/${post.currentSlug}`} key={index}>
          <div>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
          </div>
        </Link>
       ))}  */}
    </section>
  );
};

export default Blog;
