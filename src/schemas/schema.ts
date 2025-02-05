import { SchemaTypeDefinition } from 'sanity'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [

    {
      name: 'post',
      title: 'Post',
      type: 'document',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string'
        },
        {
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [{type: 'block'}]
        }
      ]
    }
  ]
}