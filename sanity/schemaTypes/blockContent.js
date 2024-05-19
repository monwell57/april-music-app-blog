import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      title: 'Image',
      type: 'image',
      // options: {hotspot: true},
      // fields: [
      //   {
      //     title: 'Caption',
      //     name: 'caption',
      //     type: 'string',
      //     options: {
      //       isHighlighted: true, // Use this option to highlight the caption field in the studio
      //     },
      //   },
      //   {
      //     title: 'Alt Text',
      //     name: 'alt',
      //     type: 'string',
      //     description: 'Important for SEO and accessibility.',
      //     validation: (Rule) => Rule.error('You have to fill out the alt text.').required(),
      //   },
      // ],
    }),
    defineArrayMember({
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/mp4,video/quicktime', // Accepts both mp4 and mov formats
      },
      // fields: [
      //   {
      //     title: 'Caption',
      //     name: 'caption',
      //     type: 'string',
      //     options: {
      //       isHighlighted: true,
      //     },
      //   },
      //   {
      //     title: 'Description',
      //     name: 'description',
      //     type: 'text',
      //     description: 'A description of the video content',
      //   },
      // ],
    }),
  ],
})
