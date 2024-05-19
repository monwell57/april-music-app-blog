// albums.js
export default {
  name: 'album',
  title: 'Album',
  type: 'document',
  fields: [
    {
      name: 'img',
      title: 'Album Cover',
      type: 'image',
    },
    {
      name: 'name',
      title: 'Album Name',
      type: 'string',
    },
    {
      name: 'tracks',
      title: 'Tracks',
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
}
