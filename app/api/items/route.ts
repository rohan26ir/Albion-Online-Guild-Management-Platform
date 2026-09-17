import { 
  readItemsFromDb, 
  upsertItemInDb, 
  deleteItemFromDb, 
  writeItemsToDb 
} from "@/lib/db/fileDb";
import { DEFAULT_ITEMS } from "@/lib/admin/adminStore";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const tier = searchParams.get("tier");
    const search = searchParams.get("search")?.toLowerCase();

    let items = readItemsFromDb();

    if (category && category !== "All") {
      items = items.filter((i) => i.category.toLowerCase() === category.toLowerCase());
    }
    if (tier && tier !== "All") {
      items = items.filter((i) => i.tier.toLowerCase() === tier.toLowerCase());
    }
    if (search) {
      items = items.filter((i) =>
        i.name.toLowerCase().includes(search) ||
        i.identifier.toLowerCase().includes(search) ||
        i.subcategory.toLowerCase().includes(search)
      );
    }

    return Response.json({ success: true, count: items.length, data: items });
  } catch (error: any) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Reset action
    if (body?.action === "reset") {
      writeItemsToDb(DEFAULT_ITEMS);
      return Response.json({ success: true, message: "Database reset to defaults", data: DEFAULT_ITEMS });
    }

    if (!body?.name) {
      return Response.json({ success: false, error: "Item name is required" }, { status: 400 });
    }

    const saved = upsertItemInDb(body);
    return Response.json({ success: true, data: saved });
  } catch (error: any) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ success: false, error: "Item id is required" }, { status: 400 });
    }

    const deleted = deleteItemFromDb(id);
    return Response.json({ success: deleted, message: deleted ? "Item removed" : "Item not found" });
  } catch (error: any) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
