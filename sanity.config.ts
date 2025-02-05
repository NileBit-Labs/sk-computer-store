import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'your-project-id',
  dataset: 'production', // or whatever your dataset name is
  apiVersion: '2024-02-05', // use today's date
  useCdn: true
})