import { type SchemaTypeDefinition } from 'sanity'


// import { categoryType } from './categoryType'
import { category } from './categoryType'
import { gadget } from './gadget'
import { offer } from './offers'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, gadget,offer],
}
