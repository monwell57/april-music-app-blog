import {defineType, defineField} from 'sanity'

export default {
  name: 'featuredEventTickets',
  title: 'Featured Event Tickets',
  type: 'document',
  fields: [
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    },
  ],
}
