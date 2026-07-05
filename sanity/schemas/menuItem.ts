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
      title: "Giá (VNĐ)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
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
      subtitle: "category",
      media: "image",
      price: "price",
    },
    prepare({ title, subtitle, media, price }) {
      const categoryMap: Record<string, string> = {
        espresso: "Espresso",
        "pour-over": "Pour Over",
        tra: "Trà",
        khac: "Khác",
      };
      return {
        title,
        subtitle: `${categoryMap[subtitle] ?? subtitle} — ${price?.toLocaleString("vi-VN")}đ`,
        media,
      };
    },
  },
});
