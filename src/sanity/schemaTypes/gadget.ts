import { defineField, defineType } from "sanity";

export const gadget = defineType({
  name: "gadget",
  title: "Gadget",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true, // Enables hotspot for better image cropping
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array" as const,
      of: [{ type: "reference" as const, to: [{ type: "category" }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      subtitle: "price",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `$${subtitle?.toFixed(2)}`,
        media,
      }
    }
  }
  
});
