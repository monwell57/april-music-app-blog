"use client";

import React from "react";
import Image from "next/image";
import { RiMapPin2Fill } from "react-icons/ri";
import { motion } from "framer-motion";
import { fadeIn } from "../../../variants";

const EventBox = ({ events }) => {
  return (
    <motion.div
      variants={fadeIn("up", 0.4)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.3 }}
      className="bg-secondary/60 rounded-[10px] p-4 xl:p-12 relative"
    >
      <div className="flex flex-col xl:flex-row justify-between h-[620px] xl:h-full gap-x-4">
        {/* image */}
        <div className="hidden xl:flex w-[400px]">
          <Image
            src={"/assets/events/singer.png"}
            width={358}
            height={489}
            priority
            alt="artist"
            quality={100}
          />
        </div>
        {/* event list */}
        <div className="flex-1 bg-purple-400/10 h-[500px] flex flex-col justify-between overflow-y-scroll scrollbar-thin scrollbar-thumb-accent scrollbar-track-white/10 xl:pr-6">
          {events.map((event) => {
            const date = new Date(event.date);
            const day = date.getDate();
            const month = date.toLocaleString("en-US", { month: "short" });
            const year = date.getFullYear();

            return (
              <div
                key={event._id}
                className="flex flex-col xl:flex-row items-center justify-between gap-y-4 xl:gap-y-0 text-center xl:text-left my-4 xl:my-0 border-b border-white/10 pb-10 xl:py-3 last-of-type:border-none first-of-type:pt-0"
              >
                <div className="flex flex-col xl:flex-row items-center gap-x-4">
                  <div className="flex flex-col justify-center items-center leading-tight w-[80px] mb-4 xl:mb-0">
                    <div className="text-[44px] font-black text-accent">
                      {day}{" "}
                    </div>
                    <div className="text-[20px] font-extrabold">{month} </div>
                  </div>
                  <div className="w-64 flex flex-col gap-y-2">
                    <div className="text-lg leading-none font-bold">
                      {`${event.location.city}`}, {`${event.location.country}`}
                    </div>
                    <div className="flex items-center justify-center xl:justify-start gap-x-1">
                      <div className="text-accent text-lg">
                        <RiMapPin2Fill />
                      </div>
                      <div className="font-light">{event.location.venue}</div>
                    </div>
                  </div>
                </div>
                {/* Price Range */}
                <div className="w-[100px] text-[17px] text-center text-accent font-bold">
                  {event.priceRange}
                </div>
                {/* <button className="btn btn-lg btn-accent">Get Tickets</button> */}

                <a href={event.url} target="_blank" rel="noopener noreferrer">
                  <button className="btn btn-lg btn-accent">Get Tickets</button>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default EventBox;
