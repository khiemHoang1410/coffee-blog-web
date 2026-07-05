import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemas } from "./sanity/schemas";

export default defineConfig({
  // Studio sẽ available tại /studio
  basePath: "/studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Hệ Thống Quản Trị")
          .items([
            // Singleton cho Thông tin quán
            S.listItem()
              .title("Thông tin quán")
              .id("siteSettings")
              .icon(() => "🏪")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Cấu hình thông tin quán")
              ),
            S.divider(),
            // Thực đơn món
            S.listItem()
              .title("Thực đơn món")
              .id("menuItem")
              .icon(() => "☕")
              .child(
                S.documentTypeList("menuItem").title("Danh sách thực đơn")
              ),
            // Danh mục thực đơn
            S.listItem()
              .title("Danh mục thực đơn")
              .id("category")
              .icon(() => "📂")
              .child(
                S.documentTypeList("category").title("Danh mục thực đơn")
              ),
            // Bài viết Blog
            S.listItem()
              .title("Bài viết Blog")
              .id("post")
              .icon(() => "✍️")
              .child(
                S.documentTypeList("post").title("Danh sách bài viết")
              ),
          ]),
    }),
  ],

  schema: {
    types: schemas,
  },
  
  document: {
    // Chặn xóa (delete), nhân bản (duplicate) và gỡ bài (unpublish) đối với siteSettings
    actions: (prev, context) => {
      if (context.schemaType === "siteSettings") {
        return prev.filter(
          (action) =>
            action.action !== "delete" &&
            action.action !== "duplicate" &&
            action.action !== "unpublish"
        );
      }
      return prev;
    },
  },
});
