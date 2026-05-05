/**
 * Seed script — tạo demo data cho Sanity
 *
 * Cách chạy:
 *   1. Lấy token tại https://www.sanity.io/manage → project ut2e7a43 → API → Tokens → Add API token (Editor)
 *   2. Thêm vào .env.local:  SANITY_API_TOKEN=skXXXXXX...
 *   3. Chạy: node scripts/seed.mjs
 */

import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local
config({ path: resolve(process.cwd(), ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.error("❌  NEXT_PUBLIC_SANITY_PROJECT_ID chưa được set trong .env.local");
  process.exit(1);
}
if (!token) {
  console.error(
    "❌  SANITY_API_TOKEN chưa được set.\n" +
    "   Lấy tại: https://www.sanity.io/manage → project → API → Tokens → Add API token (Editor)"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// ─── Ảnh Unsplash public (không cần upload, dùng URL trực tiếp) ──────────────
// Sanity không lưu external URL trực tiếp trong image field,
// nên ta dùng _sanityAsset để reference external image khi seed.
// Cách đơn giản nhất: tạo document không có ảnh, sau đó upload thủ công qua Studio.
// Script này seed text content trước.

// ─── Site Settings ────────────────────────────────────────────────────────────
const siteSettings = {
  _id: "siteSettings",          // singleton — fixed ID
  _type: "siteSettings",
  siteName: "Café Stories",
  tagline: "Không chỉ là cà phê",
  description:
    "Chúng tôi tin rằng mỗi tách cà phê là một khoảnh khắc — khoảnh khắc để chậm lại, để cảm nhận, và để kết nối với những điều thực sự quan trọng.",
  address: "42 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
  phone: "0901 234 567",
  openingHours: "Thứ 2 – Thứ 6: 7:00 – 22:00\nThứ 7 – CN: 7:00 – 23:00",
  storyContent: [
    {
      _type: "block",
      _key: "story1",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "s1",
          text: "Café Stories ra đời từ một câu hỏi đơn giản: tại sao cà phê ngon lại phải đi kèm với không gian ồn ào và vội vã? Chúng tôi muốn tạo ra một nơi khác — nơi bạn có thể thực sự thưởng thức từng ngụm.",
        },
      ],
    },
    {
      _type: "block",
      _key: "story2",
      style: "blockquote",
      children: [
        {
          _type: "span",
          _key: "s2",
          text: "Cà phê tốt không cần phải phức tạp. Nó chỉ cần được trân trọng.",
        },
      ],
    },
    {
      _type: "block",
      _key: "story3",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "s3",
          text: "Mỗi hạt cà phê chúng tôi sử dụng đều được tuyển chọn trực tiếp từ các farm uy tín tại Đà Lạt, Cầu Đất và một số vùng trồng đặc biệt ở Ethiopia và Colombia. Chúng tôi rang nhỏ lô, rang tươi mỗi tuần để đảm bảo hương vị tốt nhất đến tay bạn.",
        },
      ],
    },
    {
      _type: "block",
      _key: "story4",
      style: "h2",
      children: [
        {
          _type: "span",
          _key: "s4",
          text: "Triết lý của chúng tôi",
        },
      ],
    },
    {
      _type: "block",
      _key: "story5",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "s5",
          text: "Chúng tôi không chạy theo xu hướng. Chúng tôi tập trung vào chất lượng thực sự — từ nguồn gốc hạt, quy trình rang, đến kỹ thuật pha chế. Mỗi barista tại Café Stories đều được đào tạo để hiểu cà phê, không chỉ để pha cà phê.",
        },
      ],
    },
  ],
};

// ─── Menu Items ───────────────────────────────────────────────────────────────
const menuItems = [
  // Espresso
  {
    _type: "menuItem",
    name: "Espresso",
    slug: { _type: "slug", current: "espresso" },
    category: "espresso",
    price: 45000,
    description:
      "Đậm đà, mạnh mẽ và thuần khiết. Một shot espresso chuẩn từ blend đặc biệt của chúng tôi — cân bằng giữa đắng và ngọt hậu.",
    featured: false,
    available: true,
    order: 1,
  },
  {
    _type: "menuItem",
    name: "Cappuccino",
    slug: { _type: "slug", current: "cappuccino" },
    category: "espresso",
    price: 65000,
    description:
      "Lớp foam mịn như nhung phủ lên espresso đậm đà. Sự cân bằng hoàn hảo giữa cà phê và sữa — ấm áp và dễ chịu.",
    featured: true,
    available: true,
    order: 2,
  },
  {
    _type: "menuItem",
    name: "Flat White",
    slug: { _type: "slug", current: "flat-white" },
    category: "espresso",
    price: 65000,
    description:
      "Ít sữa hơn latte, đậm hơn cappuccino. Dành cho những ai muốn cảm nhận rõ hương cà phê trong từng ngụm.",
    featured: true,
    available: true,
    order: 3,
  },
  {
    _type: "menuItem",
    name: "Latte",
    slug: { _type: "slug", current: "latte" },
    category: "espresso",
    price: 65000,
    description:
      "Mượt mà và nhẹ nhàng. Espresso hòa quyện cùng sữa tươi steamed — lý tưởng cho buổi sáng thư thái.",
    featured: false,
    available: true,
    order: 4,
  },
  {
    _type: "menuItem",
    name: "Americano",
    slug: { _type: "slug", current: "americano" },
    category: "espresso",
    price: 50000,
    description:
      "Espresso pha loãng với nước nóng — giữ nguyên hương vị nhưng nhẹ hơn về độ đậm. Thanh thoát và dễ uống.",
    featured: false,
    available: true,
    order: 5,
  },
  // Pour Over
  {
    _type: "menuItem",
    name: "Pour Over — Đà Lạt",
    slug: { _type: "slug", current: "pour-over-da-lat" },
    category: "pour-over",
    price: 75000,
    description:
      "Hạt Arabica từ Cầu Đất, Đà Lạt. Hương hoa nhài nhẹ, vị chua thanh của trái cây nhiệt đới, hậu vị ngọt kéo dài.",
    featured: true,
    available: true,
    order: 1,
  },
  {
    _type: "menuItem",
    name: "Pour Over — Ethiopia Yirgacheffe",
    slug: { _type: "slug", current: "pour-over-ethiopia" },
    category: "pour-over",
    price: 85000,
    description:
      "Hạt single origin từ vùng Yirgacheffe nổi tiếng. Hương blueberry và hoa cam, vị chua sáng đặc trưng của Ethiopia.",
    featured: true,
    available: true,
    order: 2,
  },
  {
    _type: "menuItem",
    name: "Cold Brew",
    slug: { _type: "slug", current: "cold-brew" },
    category: "pour-over",
    price: 70000,
    description:
      "Ủ lạnh 18 tiếng. Vị ngọt tự nhiên, không đắng, mượt mà đến từng giọt cuối. Hoàn hảo cho ngày nóng.",
    featured: false,
    available: true,
    order: 3,
  },
  // Trà
  {
    _type: "menuItem",
    name: "Trà Oolong Sữa",
    slug: { _type: "slug", current: "tra-oolong-sua" },
    category: "tra",
    price: 55000,
    description:
      "Trà oolong thượng hạng pha cùng sữa tươi. Hương thơm hoa quả tự nhiên, vị béo nhẹ và thanh mát.",
    featured: false,
    available: true,
    order: 1,
  },
  {
    _type: "menuItem",
    name: "Matcha Latte",
    slug: { _type: "slug", current: "matcha-latte" },
    category: "tra",
    price: 65000,
    description:
      "Matcha ceremonial grade từ Nhật Bản, đánh bông cùng sữa tươi steamed. Đắng nhẹ, ngọt hậu, màu xanh đẹp mắt.",
    featured: true,
    available: true,
    order: 2,
  },
  // Khác
  {
    _type: "menuItem",
    name: "Nước Ép Cam Tươi",
    slug: { _type: "slug", current: "nuoc-ep-cam-tuoi" },
    category: "khac",
    price: 45000,
    description:
      "Cam vắt tươi ngay tại quán. Không đường, không phụ gia — chỉ là vị ngọt thuần khiết của trái cây.",
    featured: false,
    available: true,
    order: 1,
  },
  {
    _type: "menuItem",
    name: "Soda Chanh Muối",
    slug: { _type: "slug", current: "soda-chanh-muoi" },
    category: "khac",
    price: 40000,
    description:
      "Chua, mặn, ngọt — ba vị hòa quyện trong một ly soda sảng khoái. Giải nhiệt tức thì.",
    featured: false,
    available: true,
    order: 2,
  },
];

// ─── Blog Posts ───────────────────────────────────────────────────────────────
const posts = [
  {
    _type: "post",
    title: "Specialty Coffee là gì và tại sao nó quan trọng?",
    slug: { _type: "slug", current: "specialty-coffee-la-gi" },
    publishedAt: "2025-04-10T08:00:00Z",
    description:
      "Không phải cà phê nào cũng như nhau. Tìm hiểu về thế giới specialty coffee — từ điểm số Q-grader đến hành trình từ farm đến tách.",
    tags: ["specialty coffee", "kiến thức", "nguồn gốc"],
    author: "Minh Khoa",
    seoKeywords: ["specialty coffee", "cà phê đặc sản", "Q-grader", "single origin"],
    seoDescription:
      "Specialty coffee là gì? Tìm hiểu tiêu chuẩn chất lượng, điểm số Q-grader và lý do tại sao nguồn gốc hạt cà phê lại quan trọng.",
    body: [
      {
        _type: "block",
        _key: "b1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "s1",
            text: 'Bạn đã bao giờ tự hỏi tại sao một ly cà phê ở quán này lại khác hoàn toàn so với quán kia, dù cùng gọi là "cà phê đen"? Câu trả lời nằm ở khái niệm specialty coffee — một tiêu chuẩn chất lượng nghiêm ngặt mà không phải hạt cà phê nào cũng đạt được.',
          },
        ],
      },
      {
        _type: "block",
        _key: "b2",
        style: "h2",
        children: [{ _type: "span", _key: "s2", text: "Điểm số 80+ — Tiêu chuẩn vàng" }],
      },
      {
        _type: "block",
        _key: "b3",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "s3",
            text: "Specialty coffee được định nghĩa bởi Specialty Coffee Association (SCA) là cà phê đạt điểm từ 80/100 trở lên khi được đánh giá bởi Q-grader — những chuyên gia được chứng nhận quốc tế. Họ đánh giá dựa trên hương thơm, vị chua, độ ngọt, body, hậu vị và sự cân bằng tổng thể.",
          },
        ],
      },
      {
        _type: "block",
        _key: "b4",
        style: "blockquote",
        children: [
          {
            _type: "span",
            _key: "s4",
            text: "Specialty coffee không chỉ là chất lượng — đó là câu chuyện của đất, của người, và của thời gian.",
          },
        ],
      },
      {
        _type: "block",
        _key: "b5",
        style: "h2",
        children: [{ _type: "span", _key: "s5", text: "Hành trình từ farm đến tách" }],
      },
      {
        _type: "block",
        _key: "b6",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "s6",
            text: "Điều làm specialty coffee khác biệt là tính truy xuất nguồn gốc. Mỗi hạt cà phê đều có thể được theo dõi từ trang trại cụ thể, người nông dân cụ thể, thậm chí lô đất cụ thể. Điều này không chỉ đảm bảo chất lượng mà còn tạo ra sự công bằng trong chuỗi cung ứng — người nông dân được trả giá xứng đáng với công sức của họ.",
          },
        ],
      },
      {
        _type: "block",
        _key: "b7",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "s7",
            text: "Tại Café Stories, chúng tôi làm việc trực tiếp với các farm tại Đà Lạt và nhập khẩu một số single origin từ Ethiopia, Colombia. Mỗi lô hàng đều được rang thử và đánh giá trước khi phục vụ khách hàng.",
          },
        ],
      },
    ],
  },
  {
    _type: "post",
    title: "Pour Over vs Espresso: Bạn thuộc về phía nào?",
    slug: { _type: "slug", current: "pour-over-vs-espresso" },
    publishedAt: "2025-04-20T08:00:00Z",
    description:
      "Hai phương pháp pha chế, hai triết lý hoàn toàn khác nhau. Khám phá sự khác biệt và tìm ra loại cà phê phù hợp với bạn.",
    tags: ["pour over", "espresso", "pha chế", "kiến thức"],
    author: "Linh Trang",
    seoKeywords: ["pour over", "espresso", "phương pháp pha cà phê", "V60", "Chemex"],
    seoDescription:
      "So sánh pour over và espresso — hai phong cách pha chế cà phê khác nhau về kỹ thuật, hương vị và triết lý thưởng thức.",
    body: [
      {
        _type: "block",
        _key: "b1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "Trong thế giới specialty coffee, không có cuộc tranh luận nào sôi nổi hơn: pour over hay espresso? Đây không chỉ là câu hỏi về kỹ thuật — đó là câu hỏi về phong cách sống và cách bạn muốn trải nghiệm cà phê.",
          },
        ],
      },
      {
        _type: "block",
        _key: "b2",
        style: "h2",
        children: [{ _type: "span", _key: "s2", text: "Espresso: Mạnh mẽ và tức thì" }],
      },
      {
        _type: "block",
        _key: "b3",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "s3",
            text: "Espresso được pha bằng cách ép nước nóng qua bột cà phê xay mịn dưới áp suất cao (9 bar). Kết quả là một shot 30ml đậm đặc, có lớp crema vàng óng trên bề mặt. Espresso là nền tảng của hầu hết các loại đồ uống cà phê phổ biến: cappuccino, latte, flat white.",
          },
        ],
      },
      {
        _type: "block",
        _key: "b4",
        style: "h2",
        children: [{ _type: "span", _key: "s4", text: "Pour Over: Chậm rãi và tinh tế" }],
      },
      {
        _type: "block",
        _key: "b5",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "s5",
            text: "Pour over là phương pháp pha thủ công — nước nóng được rót từ từ qua bột cà phê trong phễu lọc. Quá trình này mất 3-4 phút và đòi hỏi sự kiên nhẫn. Nhưng kết quả là một ly cà phê trong vắt, thể hiện rõ ràng từng nét hương vị của hạt — từ hoa quả, hoa cỏ đến chocolate.",
          },
        ],
      },
      {
        _type: "block",
        _key: "b6",
        style: "blockquote",
        children: [
          {
            _type: "span",
            _key: "s6",
            text: "Espresso là bức tranh sơn dầu — đậm, mạnh, ấn tượng. Pour over là thủy mặc — nhẹ nhàng, tinh tế, cần thời gian để cảm nhận.",
          },
        ],
      },
      {
        _type: "block",
        _key: "b7",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "s7",
            text: "Không có câu trả lời đúng hay sai. Nếu bạn cần năng lượng nhanh và thích vị đậm đà — espresso là bạn. Nếu bạn muốn ngồi xuống, thư giãn và khám phá hương vị — pour over sẽ không làm bạn thất vọng. Tại Café Stories, chúng tôi yêu cả hai.",
          },
        ],
      },
    ],
  },
  {
    _type: "post",
    title: "Cà phê Đà Lạt: Hành trình lên vùng cao",
    slug: { _type: "slug", current: "ca-phe-da-lat-hanh-trinh" },
    publishedAt: "2025-05-01T08:00:00Z",
    description:
      "Chúng tôi đã lên Đà Lạt để gặp trực tiếp những người nông dân trồng cà phê. Đây là câu chuyện về chuyến đi đó.",
    tags: ["Đà Lạt", "farm visit", "nguồn gốc", "câu chuyện"],
    author: "Minh Khoa",
    seoKeywords: ["cà phê Đà Lạt", "Cầu Đất", "farm cà phê", "specialty coffee Việt Nam"],
    seoDescription:
      "Hành trình thăm farm cà phê tại Cầu Đất, Đà Lạt — câu chuyện về những người nông dân và hạt cà phê specialty Việt Nam.",
    body: [
      {
        _type: "block",
        _key: "b1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "Tháng 3 năm nay, chúng tôi quyết định lên đường. Không phải để du lịch, mà để hiểu rõ hơn về những hạt cà phê mình đang phục vụ mỗi ngày. Điểm đến: Cầu Đất, Đà Lạt — một trong những vùng trồng cà phê Arabica tốt nhất Việt Nam.",
          },
        ],
      },
      {
        _type: "block",
        _key: "b2",
        style: "h2",
        children: [{ _type: "span", _key: "s2", text: "Cầu Đất — Vùng đất của Arabica" }],
      },
      {
        _type: "block",
        _key: "b3",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "s3",
            text: "Ở độ cao 1.500m so với mực nước biển, Cầu Đất có khí hậu lý tưởng cho cà phê Arabica: nhiệt độ mát mẻ quanh năm, biên độ nhiệt ngày đêm lớn, và đất đỏ bazan giàu dinh dưỡng. Những điều kiện này tạo ra hạt cà phê có hương vị phức tạp và tinh tế hơn so với các vùng trồng ở độ cao thấp.",
          },
        ],
      },
      {
        _type: "block",
        _key: "b4",
        style: "blockquote",
        children: [
          {
            _type: "span",
            _key: "s4",
            text: "\"Tôi trồng cà phê từ khi còn nhỏ, theo cha tôi. Nhưng chỉ vài năm gần đây, khi có người như các bạn đến và nói về specialty, tôi mới hiểu hạt cà phê của mình thực sự có giá trị.\" — Anh Tuấn, nông dân tại Cầu Đất",
          },
        ],
      },
      {
        _type: "block",
        _key: "b5",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "s5",
            text: "Chúng tôi dành hai ngày tại farm, tham gia vào quá trình thu hoạch và chế biến. Nhìn những quả cà phê chín đỏ được hái tay từng quả một, rồi qua quá trình chế biến honey process cẩn thận — chúng tôi hiểu tại sao specialty coffee lại có giá cao hơn. Đó không phải là sự xa xỉ, đó là sự công bằng.",
          },
        ],
      },
    ],
  },
];

// ─── Seed Functions ───────────────────────────────────────────────────────────

async function seedSiteSettings() {
  console.log("\n📋 Seeding Site Settings...");
  await client.createOrReplace(siteSettings);
  console.log("   ✅ Site Settings đã được tạo");
}

async function seedMenuItems() {
  console.log("\n☕ Seeding Menu Items...");

  // Xóa menu items cũ trước
  const existing = await client.fetch('*[_type == "menuItem"]._id');
  if (existing.length > 0) {
    console.log(`   🗑️  Xóa ${existing.length} menu items cũ...`);
    const deleteTx = client.transaction();
    existing.forEach((id) => deleteTx.delete(id));
    await deleteTx.commit();
  }

  // Tạo mới
  const tx = client.transaction();
  menuItems.forEach((item) => tx.create(item));
  await tx.commit();
  console.log(`   ✅ Đã tạo ${menuItems.length} menu items`);
}

async function seedPosts() {
  console.log("\n📝 Seeding Blog Posts...");

  // Xóa posts cũ
  const existing = await client.fetch('*[_type == "post"]._id');
  if (existing.length > 0) {
    console.log(`   🗑️  Xóa ${existing.length} posts cũ...`);
    const deleteTx = client.transaction();
    existing.forEach((id) => deleteTx.delete(id));
    await deleteTx.commit();
  }

  // Tạo mới
  const tx = client.transaction();
  posts.forEach((post) => tx.create(post));
  await tx.commit();
  console.log(`   ✅ Đã tạo ${posts.length} bài viết`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🌱 Bắt đầu seed data cho Sanity...");
  console.log(`   Project: ${projectId}`);
  console.log(`   Dataset: ${dataset}`);

  try {
    await seedSiteSettings();
    await seedMenuItems();
    await seedPosts();

    console.log("\n✨ Seed hoàn tất!");
    console.log("\n📌 Lưu ý: Script này không upload ảnh.");
    console.log("   Vào http://localhost:3000/studio để upload ảnh cho từng item.");
    console.log("   Hoặc chạy npm run dev và xem giao diện với placeholder.");
  } catch (err) {
    console.error("\n❌ Lỗi khi seed:", err.message);
    process.exit(1);
  }
}

main();
