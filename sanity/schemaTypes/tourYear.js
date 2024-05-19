import { defineType, defineField } from "sanity";

export default {
  name: "year",
  type: "document",
  fields: [
    {
      name: "tourRange",
      title: "Tour Range",
      type: "string",
    },
    {
      name: "tourYear",
      title: "Tour Year",
      type: "number",
    },
  ],
};
