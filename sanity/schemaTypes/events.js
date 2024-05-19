import {defineType, defineField} from 'sanity'

// events.js
export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {name: 'city', title: 'City', type: 'string'},
        {name: 'country', title: 'Country', type: 'string'},
        {name: 'venue', title: 'Venue', type: 'string'},
      ],
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    },
    {
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
    },
  ],
}
