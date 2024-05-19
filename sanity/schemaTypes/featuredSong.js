import { defineType, defineField } from "sanity";

export default {
  name: "featured",
  type: "document",
  fields: [
    {
      name: "featuresong",
      title: "Featured-Song",
      type: "string",
    },
    {
      name: "artist",
      title: "Artist",
      type: "string",
    },
    {
        name: 'track',
        title: 'Track',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {name: 'name', title: 'Track Name', type: 'string'},
              {
                name: 'src',
                title: 'MP3 File',
                type: 'file',
                options: {accept: 'audio/mp3'},
              },
            ],
          },
        ],
      },
  
  ],
};
