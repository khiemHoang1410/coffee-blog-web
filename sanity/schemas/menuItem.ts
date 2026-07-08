import { defineField, defineType } from "sanity";

export const menuItemSchema = defineType({
  name: "menuItem",
  title: "Menu Item",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tên món",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    }),
    defineField({
      name: "category",
      title: "Danh mục",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
      description: "Chọn liên kết đến danh mục thực đơn của món này",
    }),
    defineField({
      name: "price",
      title: "Giá cơ bản (VNĐ)",
      type: "number",
      validation: (Rule) => Rule.positive(),
      description: "Giá hiển thị mặc định (thường là giá size S). Tự động lấy từ sizes nếu để trống.",
    }),
    defineField({
      name: "sizes",
      title: "Giá theo size",
      type: "array",
      description: "Để trống nếu món chỉ có một giá duy nhất",
      of: [
        {
          type: "object",
          name: "sizePrice",
          title: "Size",
          fields: [
            defineField({
              name: "size",
              title: "Tên size",
              type: "string",
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  { title: "S – Nhỏ", value: "S" },
                  { title: "M – Vừa", value: "M" },
                  { title: "L – Lớn", value: "L" },
                ],
              },
            }),
            defineField({
              name: "price",
              title: "Giá (VNĐ)",
              type: "number",
              validation: (Rule) => Rule.required().positive(),
            }),
          ],
          preview: {
            select: { title: "size", subtitle: "price" },
            prepare({ title, subtitle }) {
              return {
                title: `Size ${title}`,
                subtitle: subtitle
                  ? `${subtitle.toLocaleString("vi-VN")}đ`
                  : "Chưa có giá",
              };
            },
          },
        },
      ],
    }),
    // Mô tả cảm xúc — không phải kỹ thuật
    defineField({
      name: "description",
      title: "Mô tả",
      type: "text",
      rows: 3,
      description: "Mô tả gợi cảm xúc, không liệt kê thành phần kỹ thuật",
    }),
    defineField({
      name: "image",
      title: "Ảnh",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "featured",
      title: "Nổi bật",
      type: "boolean",
      description: "Hiển thị ở mục Featured trên trang Menu",
      initialValue: false,
    }),
    defineField({
      name: "available",
      title: "Còn phục vụ",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Thứ tự hiển thị",
      type: "number",
      description: "Số nhỏ hơn hiển thị trước. Để trống = cuối danh sách",
    }),
  ],
  orderings: [
    {
      title: "Thứ tự tùy chỉnh",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Tên A → Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      categoryTitle: "category.title",
      media: "image",
      price: "price",
    },
    prepare({ title, categoryTitle, media, price }) {
      return {
        title,
        subtitle: [categoryTitle, price ? `${price.toLocaleString("vi-VN")}đ` : null]
          .filter(Boolean)
          .join(" — "),
        media,
      };
    },
  },
});
