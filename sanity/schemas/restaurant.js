export default {
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Restaurant Name',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image of Restaurant',
      type: 'image',
    },
    {
      name: 'short_description',
      title: 'Short Description',
      type: 'string',
    },
    {
      name: 'lat',
      title: 'Latitude of Restaurant',
      type: 'number',
    },
    {
      name: 'long',
      title: 'Longtitude of Restaurant',
      type: 'number',
    },
    {
      name: 'address',
      title: 'Address of Restaurant',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Enter a Rating from 1 - 5 stars',
      type: 'number',
      validation: (Rule) => Rule.required()
        .min(1)
        .max(5)
        .error("Please enter a Value from 1 - 5 "),
    },
    {
      name: 'type',
      title: 'Category',
      type: 'reference',
      validation: (Rule) => Rule.required(),
      to: [{type: 'category'}]
    },
    {
      name: 'dishes',
      title: 'Dishes',
      type: 'array',
      of :[{ type: 'reference', to:[{type: 'dish'}] }]
    },
  ],
}
