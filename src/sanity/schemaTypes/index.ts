import { type SchemaTypeDefinition } from 'sanity'


import { categoryType } from './categoryType'
import { gadget } from './gadget'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, gadget],
}
