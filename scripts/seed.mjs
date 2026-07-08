/**
 * Seed script — tạo demo data cho Sanity
 *
 * Cách chạy:
 *   1. Lấy token tại https://www.sanity.io/manage → project → API → Tokens → Add API token (Editor)
 *   2. Thêm vào .env.local:  SANITY_API_TOKEN=skXXXXXX...
 *   3. Chạy: node scripts/seed.mjs
 *
 * Lưu ý: Categories seed trước → menuItems dùng _ref reference tới chúng
 */

import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { resolve } from "path";

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

// ─── Helper ───────────────────────────────────────────────────────────────────

/** Tạo sizes S/M/L — đơn vị nhập vào là nghìn đồng, tự nhân 1000 */
function sizes(s, m, l) {
  return [
    { _key: "S", size: "S", price: s * 1000 },
    { _key: "M", size: "M", price: m * 1000 },
    { _key: "L", size: "L", price: l * 1000 },
  ];
}

// ─── Categories (_id cố định → idempotent, chạy nhiều lần không duplicate) ───

const categories = [
  { _id: "cat-ca-phe",   _type: "category", title: "Cà Phê",         slug: { _type: "slug", current: "ca-phe"      }, order: 1 },
  { _id: "cat-tra",      _type: "category", title: "Trà",            slug: { _type: "slug", current: "tra"         }, order: 2 },
  { _id: "cat-kem",      _type: "category", title: "Kem",            slug: { _type: "slug", current: "kem"         }, order: 3 },
  { _id: "cat-cacao",    _type: "category", title: "Cacao / Matcha", slug: { _type: "slug", current: "cacao-matcha"}, order: 4 },
  { _id: "cat-tra-sua",  _type: "category", title: "Trà Sữa",        slug: { _type: "slug", current: "tra-sua"     }, order: 5 },
  { _id: "cat-sua-chua", _type: "category", title: "Sữa Chua",       slug: { _type: "slug", current: "sua-chua"    }, order: 6 },
  { _id: "cat-sinh-to",  _type: "category", title: "Sinh Tố",        slug: { _type: "slug", current: "sinh-to"     }, order: 7 },
  { _id: "cat-nuoc-ep",  _type: "category", title: "Nước Ép",        slug: { _type: "slug", current: "nuoc-ep"     }, order: 8 },
  { _id: "cat-khac",     _type: "category", title: "Khác",           slug: { _type: "slug", current: "khac"        }, order: 9 },
];

// ─── Menu Items ───────────────────────────────────────────────────────────────

const menuItems = [
  // ── Cà Phê ──────────────────────────────────────────────────────────────────
  { _type: "menuItem", name: "Phin Sữa Đá",  slug: { _type: "slug", current: "phin-sua-da"  }, category: { _type: "reference", _ref: "cat-ca-phe" }, price: 23000, sizes: sizes(23, 28, 34), available: true, featured: false, order: 1 },
  { _type: "menuItem", name: "Phin Đen Đá",  slug: { _type: "slug", current: "phin-den-da"  }, category: { _type: "reference", _ref: "cat-ca-phe" }, price: 23000, sizes: sizes(23, 28, 34), available: true, featured: false, order: 2 },
  { _type: "menuItem", name: "Máy Sữa Đá",   slug: { _type: "slug", current: "may-sua-da"   }, category: { _type: "reference", _ref: "cat-ca-phe" }, price: 23000, sizes: sizes(23, 28, 34), available: true, featured: false, order: 3 },
  { _type: "menuItem", name: "Máy Đen Đá",   slug: { _type: "slug", current: "may-den-da"   }, category: { _type: "reference", _ref: "cat-ca-phe" }, price: 23000, sizes: sizes(23, 28, 34), available: true, featured: false, order: 4 },
  { _type: "menuItem", name: "Café Muối",    slug: { _type: "slug", current: "cafe-muoi"    }, category: { _type: "reference", _ref: "cat-ca-phe" }, price: 28000, sizes: sizes(28, 33, 39), available: true, featured: true,  order: 5 },
  { _type: "menuItem", name: "Bạc Xỉu",     slug: { _type: "slug", current: "bac-xiu"      }, category: { _type: "reference", _ref: "cat-ca-phe" }, price: 28000, sizes: sizes(28, 33, 39), available: true, featured: false, order: 6 },

  // ── Trà ─────────────────────────────────────────────────────────────────────
  { _type: "menuItem", name: "Trà Lài Cam Đặc Thơm",  slug: { _type: "slug", current: "tra-lai-cam-dac-thom" }, category: { _type: "reference", _ref: "cat-tra" }, price: 28000, sizes: sizes(28, 33, 39), available: true, featured: false, order: 1 },
  { _type: "menuItem", name: "Trà Đào Cam Sả",        slug: { _type: "slug", current: "tra-dao-cam-sa"       }, category: { _type: "reference", _ref: "cat-tra" }, price: 28000, sizes: sizes(28, 33, 39), available: true, featured: true,  order: 2 },
  { _type: "menuItem", name: "Trà Xoài Chanh Dây",    slug: { _type: "slug", current: "tra-xoai-chanh-day"   }, category: { _type: "reference", _ref: "cat-tra" }, price: 28000, sizes: sizes(28, 33, 39), available: true, featured: false, order: 3 },
  { _type: "menuItem", name: "Trà Cam Gừng Mật Ong",  slug: { _type: "slug", current: "tra-cam-gung-mat-ong" }, category: { _type: "reference", _ref: "cat-tra" }, price: 28000, sizes: sizes(28, 33, 39), available: true, featured: false, order: 4 },

  // ── Kem ─────────────────────────────────────────────────────────────────────
  { _type: "menuItem", name: "Kem Xoài",                  slug: { _type: "slug", current: "kem-xoai"           }, category: { _type: "reference", _ref: "cat-kem" }, price: 28000, sizes: sizes(28, 33, 39), available: true, featured: false, order: 1 },
  { _type: "menuItem", name: "Kem Dâu",                   slug: { _type: "slug", current: "kem-dau"            }, category: { _type: "reference", _ref: "cat-kem" }, price: 28000, sizes: sizes(28, 33, 39), available: true, featured: false, order: 2 },
  { _type: "menuItem", name: "Kem Sampoche",              slug: { _type: "slug", current: "kem-sampoche"       }, category: { _type: "reference", _ref: "cat-kem" }, price: 28000, sizes: sizes(28, 33, 39), available: true, featured: true,  order: 3 },
  { _type: "menuItem", name: "Kem Dừa",                   slug: { _type: "slug", current: "kem-dua"            }, category: { _type: "reference", _ref: "cat-kem" }, price: 28000, sizes: sizes(28, 33, 39), available: true, featured: false, order: 4 },
  { _type: "menuItem", name: "Kem Trái Cây Khác (theo mùa)", slug: { _type: "slug", current: "kem-trai-cay-theo-mua" }, category: { _type: "reference", _ref: "cat-kem" }, price: 28000, sizes: sizes(28, 33, 39), available: true, featured: false, order: 5 },

  // ── Cacao / Matcha ───────────────────────────────────────────────────────────
  { _type: "menuItem", name: "Cacao Sữa Đá",      slug: { _type: "slug", current: "cacao-sua-da"      }, category: { _type: "reference", _ref: "cat-cacao" }, price: 23000, sizes: sizes(23, 28, 34), available: true, featured: false, order: 1 },
  { _type: "menuItem", name: "Cacao Sữa Kem Viên", slug: { _type: "slug", current: "cacao-sua-kem-vien"}, category: { _type: "reference", _ref: "cat-cacao" }, price: 38000, sizes: sizes(38, 43, 49), available: true, featured: true,  order: 2 },
  { _type: "menuItem", name: "Matcha Latte",       slug: { _type: "slug", current: "matcha-latte"      }, category: { _type: "reference", _ref: "cat-cacao" }, price: 33000, sizes: sizes(33, 38, 44), available: true, featured: true,  order: 3 },
  { _type: "menuItem", name: "Matcha Kem Viên",    slug: { _type: "slug", current: "matcha-kem-vien"   }, category: { _type: "reference", _ref: "cat-cacao" }, price: 38000, sizes: sizes(38, 43, 49), available: true, featured: false, order: 4 },

  // ── Trà Sữa ─────────────────────────────────────────────────────────────────
  { _type: "menuItem", name: "Trà Sữa Dâu",   slug: { _type: "slug", current: "tra-sua-dau"  }, category: { _type: "reference", _ref: "cat-tra-sua" }, price: 33000, sizes: sizes(33, 38, 44), available: true, featured: true,  order: 1 },
  { _type: "menuItem", name: "Trà Sữa Xoài",  slug: { _type: "slug", current: "tra-sua-xoai" }, category: { _type: "reference", _ref: "cat-tra-sua" }, price: 33000, sizes: sizes(33, 38, 44), available: true, featured: false, order: 2 },
  { _type: "menuItem", name: "Trà Sữa Ôlong", slug: { _type: "slug", current: "tra-sua-olong"}, category: { _type: "reference", _ref: "cat-tra-sua" }, price: 28000, sizes: sizes(28, 33, 39), available: true, featured: false, order: 3 },
  { _type: "menuItem", name: "Trà Sữa Lài",   slug: { _type: "slug", current: "tra-sua-lai"  }, category: { _type: "reference", _ref: "cat-tra-sua" }, price: 28000, sizes: sizes(28, 33, 39), available: true, featured: false, order: 4 },

  // ── Sữa Chua ─────────────────────────────────────────────────────────────────
  { _type: "menuItem", name: "Yogurt Cam Đặc Thơm", slug: { _type: "slug", current: "yogurt-cam-dac-thom"}, category: { _type: "reference", _ref: "cat-sua-chua" }, price: 23000, sizes: sizes(23, 28, 34), available: true, featured: false, order: 1 },
  { _type: "menuItem", name: "Yogurt Nha Đam",       slug: { _type: "slug", current: "yogurt-nha-dam"    }, category: { _type: "reference", _ref: "cat-sua-chua" }, price: 23000, sizes: sizes(23, 28, 34), available: true, featured: false, order: 2 },
  { _type: "menuItem", name: "Yogurt Đá",            slug: { _type: "slug", current: "yogurt-da"         }, category: { _type: "reference", _ref: "cat-sua-chua" }, price: 23000, sizes: sizes(23, 28, 34), available: true, featured: false, order: 3 },
  { _type: "menuItem", name: "Yogurt Hũ",            slug: { _type: "slug", current: "yogurt-hu"         }, category: { _type: "reference", _ref: "cat-sua-chua" }, price: 18000, sizes: sizes(18, 23, 29), available: true, featured: false, order: 4 },

  // ── Sinh Tố ──────────────────────────────────────────────────────────────────
  { _type: "menuItem", name: "Sinh Tố Xoài",          slug: { _type: "slug", current: "sinh-to-xoai"      }, category: { _type: "reference", _ref: "cat-sinh-to" }, price: 38000, sizes: sizes(38, 43, 49), available: true, featured: false, order: 1 },
  { _type: "menuItem", name: "Sinh Tố Dâu",           slug: { _type: "slug", current: "sinh-to-dau"       }, category: { _type: "reference", _ref: "cat-sinh-to" }, price: 48000, sizes: sizes(48, 53, 59), available: true, featured: true,  order: 2 },
  { _type: "menuItem", name: "Sinh Tố Sampoche",      slug: { _type: "slug", current: "sinh-to-sampoche"  }, category: { _type: "reference", _ref: "cat-sinh-to" }, price: 38000, sizes: sizes(38, 43, 49), available: true, featured: false, order: 3 },
  { _type: "menuItem", name: "Sinh Tố Dừa",           slug: { _type: "slug", current: "sinh-to-dua"       }, category: { _type: "reference", _ref: "cat-sinh-to" }, price: 38000, sizes: sizes(38, 43, 49), available: true, featured: false, order: 4 },
  { _type: "menuItem", name: "Sinh Tố Khác (theo mùa)", slug: { _type: "slug", current: "sinh-to-theo-mua" }, category: { _type: "reference", _ref: "cat-sinh-to" }, price: 38000, sizes: sizes(38, 43, 49), available: true, featured: false, order: 5 },

  // ── Nước Ép ──────────────────────────────────────────────────────────────────
  { _type: "menuItem", name: "Ép Cam",              slug: { _type: "slug", current: "ep-cam"       }, category: { _type: "reference", _ref: "cat-nuoc-ep" }, price: 33000, sizes: sizes(33, 38, 44), available: true, featured: false, order: 1 },
  { _type: "menuItem", name: "Ép Xoài",             slug: { _type: "slug", current: "ep-xoai"      }, category: { _type: "reference", _ref: "cat-nuoc-ep" }, price: 33000, sizes: sizes(33, 38, 44), available: true, featured: false, order: 2 },
  { _type: "menuItem", name: "Dừa Trái",            slug: { _type: "slug", current: "dua-trai"     }, category: { _type: "reference", _ref: "cat-nuoc-ep" }, price: 33000, sizes: sizes(33, 38, 44), available: true, featured: true,  order: 3 },
  { _type: "menuItem", name: "Ép Khác (theo mùa)", slug: { _type: "slug", current: "ep-theo-mua"  }, category: { _type: "reference", _ref: "cat-nuoc-ep" }, price: 33000, sizes: sizes(33, 38, 44), available: true, featured: false, order: 4 },

  // ── Khác ─────────────────────────────────────────────────────────────────────
  { _type: "menuItem", name: "Chanh Nóng Xí Muội Mật Ong", slug: { _type: "slug", current: "chanh-nong-xi-muoi-mat-ong" }, category: { _type: "reference", _ref: "cat-khac" }, price: 28000, sizes: sizes(28, 33, 39), available: true, featured: false, order: 1 },
];

// ─── Seed Functions ───────────────────────────────────────────────────────────

async function seedCategories() {
  console.log("\n🗂️  Seeding Categories...");
  const tx = client.transaction();
  // createOrReplace → idempotent, an toàn khi chạy lại
  categories.forEach((cat) => tx.createOrReplace(cat));
  await tx.commit();
  console.log(`   ✅ Đã upsert ${categories.length} categories`);
}

async function seedMenuItems() {
  console.log("\n☕ Seeding Menu Items...");

  // Xóa toàn bộ menu items cũ
  const existingIds = await client.fetch('*[_type == "menuItem"]._id');
  if (existingIds.length > 0) {
    console.log(`   🗑️  Xóa ${existingIds.length} menu items cũ...`);
    const deleteTx = client.transaction();
    existingIds.forEach((id) => deleteTx.delete(id));
    await deleteTx.commit();
  }

  // Tạo mới
  const tx = client.transaction();
  menuItems.forEach((item) => tx.create(item));
  await tx.commit();
  console.log(`   ✅ Đã tạo ${menuItems.length} menu items`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🌱 Bắt đầu seed data...");
  console.log(`   Project : ${projectId}`);
  console.log(`   Dataset : ${dataset}`);

  try {
    // Categories phải chạy trước — menuItems dùng _ref trỏ tới chúng
    await seedCategories();
    await seedMenuItems();

    console.log("\n✨ Seed hoàn tất!");
    console.log("\n📌 Lưu ý: Script này không upload ảnh.");
    console.log("   Vào http://localhost:3000/studio để upload ảnh cho từng item.");
  } catch (err) {
    console.error("\n❌ Lỗi khi seed:", err.message);
    process.exit(1);
  }
}

main();
