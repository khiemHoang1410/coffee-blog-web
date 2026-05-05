import { defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Thông tin quán",
  type: "document",
  // Singleton — chỉ tồn tại một document duy nhất
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({
      name: "siteName",
      title: "Tên quán",
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Câu slogan ngắn hiển thị dưới tên quán",
    }),
    defineField({
      name: "description",
      title: "Mô tả quán",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "address",
      title: "Địa chỉ",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Số điện thoại",
      type: "string",
    }),
    defineField({
      name: "openingHours",
      title: "Giờ mở cửa",
      type: "string",
      description: "Ví dụ: Thứ 2–CN: 7:00 – 22:00",
    }),
    defineField({
      name: "heroImage",
      title: "Ảnh Hero (trang chủ)",
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
    // Câu chuyện thương hiệu — rich text editor
    defineField({
      name: "storyContent",
      title: "Câu chuyện thương hiệu",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote lớn", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt text",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "siteName", subtitle: "tagline" },
  },
});
