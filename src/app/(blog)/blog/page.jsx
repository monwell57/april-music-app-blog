"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { client, urlFor } from "../../../lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const revalidate = 30;

// Define the asynchronous function outside of the useEffect

async function fetchPosts(page, limit) {
  const startIndex = (page - 1) * limit;
  const query = `*[_type == 'post'] | order(_createdAt desc) {
    ...,
    title, 
    description,
    "currentSlug": slug.current,
    createdAt
  }[${startIndex}...${startIndex + limit}]`;
  const posts = await client.fetch(query);
  const totalQuery = `count(*[_type == 'post'])`;
  const total = await client.fetch(totalQuery); // Fetch total count of posts
  return {
    posts: posts,
    total: total,
  };
}

const Blog = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 4; // Adjust as needed
  const [loading, setLoading] = useState(false);

  const [totalPosts, setTotalPosts] = useState(0);
  const totalPages = Math.ceil(totalPosts / limit);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchPosts(page, limit);
        console.log("Fetched Data:", fetchedData); // Check what you're actually fetching
        setData(fetchedData.posts || []); // Fallback to an empty array if posts is undefined
        setTotalPosts(fetchedData.total || 0); // Fallback if total is undefined
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setLoading(false);
    };
    fetchData();
    console.log("Current Page:", page);
    console.log("Total Pages:", totalPages);
  }, [page, totalPages]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 grid grid-cols-1 md:grid-cols-2 mt-8 pb-20 gap-5 px-12">
      {data.map((post, index) => (
        <Card key={index}>
          <Image
            src={urlFor(post.mainImage.asset).url()}
            width={500}
            height={500}
            alt="title image"
            priority
            className="rounded-t-lg mt-8 block mx-auto"
          />
          <CardContent className="px-12 mt-5">
            <h3 className="text-lg text-slate-800 text-center line-clamp-2 font-bold">
              {post.title}
            </h3>
            <p className="line-clamp-3 text-sm mt-2 text-gray-500">
              {post.description}
            </p>
            <Button asChild className="w-full mt-3">
              <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
      <div className="pagination-controls flex justify-between mt-4">
        <div className="w-32 md:w-40">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="bg-blue-500 flex-shrink-0 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300 w-full"
          >
            Previous
          </button>
        </div>
        <div className="w-32 md:w-40">
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            className="bg-blue-500 flex-shrink-0 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300 w-full"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
