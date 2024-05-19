"use client";

import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

import { motion } from "framer-motion";
import { fadeIn } from "../../../variants";

const PostList = ({ posts }) => {
  const firstThreePosts = posts.slice(0, 3);
  // console.log(firstThreePosts.length);
  return (
    <motion.div
      variants={fadeIn("up", 0.4)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.3 }}
      className="flex flex-col items-center"
    >
      <div className="flex flex-col xl:flex-row justify-between gap-12 py-10 xl:pt-16 xl:pb-24 border-t border-white/10">
        {firstThreePosts.map((post) => {
          console.log(post);
          const { _id, createdAt, title, description } = post;
          return (
            <div key={_id} className="flex-1">
              {" "}
              <div className="text-accent font-bold mb-1">
                {new Date(createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
              </div>
              <div className="text-xl font-medium mb-4">{title}</div>
              <p className="text-white/30 mb-6 font-light">{description}</p>
              <Link
                href={`/blog/${post.currentSlug}`}
                className="flex items-center gap-x-2 group"
              >
                Read More
                <BsArrowRight className="text-xl group-hover:ml-1 transition-all" />
              </Link>
            </div>
          );
        })}
      </div>
      <Link href="/blog">
        <button className="btn btn-lg btn-accent">View all posts</button>
      </Link>
    </motion.div>
  );
};

export default PostList;

// body
// :
// (3) [{…}, {…}, {…}]
// currentSlug
// :
// "harbor-point-ice-fest"
// description
// :
// "Food truck eats from Shareef’s Grill Wraps, Fuzzies Burgers, and Lattimore Funnel Cake"
// mainImage
// :
// {_type: 'image', asset: {…}}
// slug
// :
// {current: 'harbor-point-ice-fest', _type: 'slug'}
// title
// :
// "Harbor Point Ice Fest"
// _createdAt
// :
// "2024-01-24T05:54:04Z"
// _id
// :
// "f2f1bf91-e869-4970-af29-ac2f19af7811"
// _rev
// :
// "YZDTfZCd9Sx4xq41jYthdz"
// _type
// :
// "post"
// _updatedAt
// :
// "2024-03-08T20:11:44Z"
