import Events from "@/components/events/Events";
import Hero from "@/components/Hero";
import { client } from "../../lib/sanity";
import { Player } from "@/components/Player";
import Albums from "@/components/albums/Albums";
import Blog from "@/components/blog/Blog";
import Newsletter from "@/components/Newsletter";
import { fetchLocations } from "../../lib/data";

export const revalidate = 30;

export async function fetchYear() {
  const query = `*[_type == "year"]{
    tourRange,
    tourYear
  } `;
  const year = await client.fetch(query);
  return year;
}
export async function fetchFeaturedTickets() {
  const query = `*[_type == "featuredEventTickets"]{
    url
  } `;
  const ticketsFeature = await client.fetch(query);
  return ticketsFeature;
}
export async function fetchSong() {
  const query = ` *[_type == "featured"] {
    artist,
    featuresong,
    "trackName": track[0].name,
    "fileLocation": track[0].src.asset->url
  }`;
  const song = await client.fetch(query);
  return song;
}
export async function fetchAlbum() {
  const query = ` *[_type == "album"] {
    _id,
    img,
    name,
    tracks[] {
      name,
      "src": src.asset->url
    }
  }`;
  const album = await client.fetch(query);
  return album;
}

export async function getPosts() {
  const query = `*[_type == 'post'] | order(_createdAt desc) {
    ...,
        title, 
        description,
        "currentSlug": slug.current,
        createdAt
      }`;
  const posts = await client.fetch(query);
  return posts;
}

export default async function Home() {
  const data = await fetchLocations();
  const tourYear = await fetchYear();
  const mainSong = await fetchSong();
  const mainAlbum = await fetchAlbum();
  const mainTickets = await fetchFeaturedTickets();

  return (
    <main className="">
      <Hero data={data} year={tourYear} tickets={mainTickets} />
      <Player song={mainSong} />
      <Events />
      <Albums />
      <Blog />
      <Newsletter />
      {/* <div className="h-[4000px]"> </div> */}
    </main>
  );
}
