// schemas/author.js

export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'profilePicture',
      title: 'Profile Picture',
      type: 'image',
      options: {
        hotspot: true, // Enables image cropping
      },
    },
    {
      name: 'signature',
      title: 'Signature',
      type: 'image',
      options: {
        hotspot: true, // Enables image cropping
      },
    },
  ],
}
