import { defineField, defineType } from "sanity";

export const offer = defineType({
  name: "offer",
  title: "Offer",
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
      name: "image",
      title: "Icon Image",
      type: "image",
      options: {
        hotspot: true, 
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "discount",
      title: "Discount Percentage",
      type: "number",
      validation: (Rule) => Rule.min(0).max(100).error("Discount must be between 0 and 100%"),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: "categories",
        title: "Categories",
        type: "array",
        of: [{ type: "reference", to: [{ type: "category" }] }],
      }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      subtitle: "description",
      discount: "discount", 
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `${selection.subtitle} - ${selection.discount}% off`, // Displaying discount in the subtitle
        media: selection.media,
      };
    },
  },
});
