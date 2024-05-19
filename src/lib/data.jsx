import { client } from "../lib/sanity";

export const revalidate = 30;

export async function fetchLocations() {
  const query = `*[_type == "location"] {
        duration,
        city,
      } `;
  const locations = await client.fetch(query);
  return locations;
}
