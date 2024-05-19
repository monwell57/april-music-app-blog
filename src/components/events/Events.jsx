import React from "react";
// import { getEvents } from "../../lib/data";
import EventBox from "./EventBox";
import { client } from "@/lib/sanity";
import SectionHeader from "../SectionHeader";

export const revalidate = 30;

async function getEvents() {
  const query = `*[_type == 'event'] | order(date asc) {
    url,
        _id,
        name,
        date,
        priceRange,
        location {
            city,
            country,
            venue
          }
      
        }     
        `;
  const data = await client.fetch(query);
  return data;
}

const Events = async () => {
  const events = await getEvents();
  return (
    <section className="section" id="tours">
      <div className="container mx-auto">
        <SectionHeader pretitle="World Tour" title="Upcoming Events" />

        <EventBox events={events} />
      </div>
    </section>
  );
};

export default Events;
