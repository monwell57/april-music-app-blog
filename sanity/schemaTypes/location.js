import { defineType, defineField } from "sanity";

export default {
  name: "location",
  type: "document",
  fields: [
    {
      name: "city",
      title: "City",
      type: "string",
    },
    {
      name: "duration",
      title: "Duration",
      type: "number",
    },
    // {
    //   name: "tourRange",
    //   title: "Tour Range",
    //   type: "string",
    // },
    // {
    //   name: "tourYear",
    //   title: "Tour Year",
    //   type: "number",
    // },
  ],
};
