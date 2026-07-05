import { defineField, defineType } from "sanity";

export const categorySchema = defineType({
  name: "category",
  title: "Danh mục thực đơn",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tên danh mục",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Ví dụ: Cà phê pha máy, Cà phê thủ công, Trà & Bánh",
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Thứ tự hiển thị",
      type: "number",
      description: "Số nhỏ hơn hiển thị trước trên thanh menu chính. Ví dụ: 1, 2, 3...",
      validation: (Rule) => Rule.min(1),
    }),
  ],
  orderings: [
    {
      title: "Thứ tự hiển thị",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Tên A → Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "order",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title,
        subtitle: subtitle ? `Thứ tự: ${subtitle}` : "Chưa đặt thứ tự",
      };
    },
  },
});
