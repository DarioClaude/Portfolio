/**
 * Sanity Studio schema for the 'Project' document type.
 *
 * To use: create a Sanity project at sanity.io, then import this schema
 * in your studio's schema index file.
 *
 * Each project represents a photography shooting/series displayed
 * on the portfolio's Work page.
 */
export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Portrait", value: "Portrait" },
          { title: "Editorial", value: "Editorial" },
          { title: "Fine Art", value: "Fine Art" },
          { title: "Branding", value: "Branding" },
          { title: "Documentary", value: "Documentary" },
        ],
      },
    },
    {
      name: "client",
      title: "Client",
      type: "string",
    },
    {
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule: { min: (n: number) => { max: (n: number) => unknown } }) =>
        Rule.min(2000).max(2030),
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first. First 6 are shown in the carousel.",
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      description: "Main image used in the carousel and Work grid.",
      options: { hotspot: true },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "format",
              title: "Format",
              type: "string",
              options: {
                list: [
                  { title: "Landscape (3:2)", value: "landscape" },
                  { title: "Portrait (2:3)", value: "portrait" },
                ],
                layout: "radio",
              },
              initialValue: "landscape",
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
      subtitle: "category",
    },
  },
};
