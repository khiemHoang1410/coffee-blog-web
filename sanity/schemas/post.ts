import { defineField, defineType } from "sanity";
import React from "react";

export const postSchema = defineType({
  name: "post",
  title: "Bài viết Blog",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tiêu đề",
      type: "string",
      validation: (Rule) => Rule.required().min(10).max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Ngày đăng",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Mô tả ngắn",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "thumbnail",
      title: "Ảnh đại diện",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "author",
      title: "Tác giả",
      type: "string",
    }),
    // SEO fields — khách hàng yêu cầu quản lý riêng
    defineField({
      name: "seoKeywords",
      title: "SEO Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Từ khóa để tối ưu SEO, cách nhau bằng dấu phẩy",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      description: "Mô tả cho meta tag, tối đa 160 ký tự",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "body",
      title: "Nội dung",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            {
              title: "Quote",
              value: "blockquote",
              component: ({ children }: { children: React.ReactNode }) =>
                React.createElement(
                  "blockquote",
                  {
                    style: {
                      borderLeft: "4px solid #a8e63d",
                      paddingLeft: "1rem",
                      fontStyle: "italic",
                      margin: "1.5rem 0",
                    },
                  },
                  children
                ),
            },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                  {
                    name: "blank",
                    title: "Mở tab mới",
                    type: "boolean",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt text",
              type: "string",
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author",
      media: "thumbnail",
    },
    prepare({ title, author, media }) {
      return {
        title,
        subtitle: author ? `Bởi ${author}` : undefined,
        media,
      };
    },
  },
});
