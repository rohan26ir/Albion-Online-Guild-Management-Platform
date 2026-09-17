import { 
  readBuildsFromDb, 
  upsertBuildInDb, 
  deleteBuildFromDb, 
  writeBuildsToDb 
} from "@/lib/db/fileDb";
import { DEFAULT_BUILDS } from "@/lib/admin/adminStore";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");
    const location = searchParams.get("location");
    const zone = searchParams.get("zone");
    const groupSize = searchParams.get("groupSize");
    const activity = searchParams.get("activity");
    const sortBy = searchParams.get("sortBy") || "newest";
    const search = searchParams.get("search")?.toLowerCase();

    let builds = readBuildsFromDb();

    if (role && role !== "All") {
      builds = builds.filter((b) => b.role?.toLowerCase() === role.toLowerCase());
    }
    if (location && location !== "All") {
      builds = builds.filter((b) => b.location?.toLowerCase() === location.toLowerCase());
    }
    if (zone && zone !== "All") {
      builds = builds.filter((b) => b.zone?.toLowerCase() === zone.toLowerCase());
    }
    if (groupSize && groupSize !== "All") {
      builds = builds.filter((b) => b.groupSize?.toLowerCase() === groupSize.toLowerCase());
    }
    if (activity && activity !== "All") {
      builds = builds.filter((b) => b.activity?.toLowerCase() === activity.toLowerCase());
    }
    if (search) {
      builds = builds.filter((b) =>
        b.title.toLowerCase().includes(search) ||
        b.author.toLowerCase().includes(search) ||
        b.description.toLowerCase().includes(search) ||
        b.role?.toLowerCase().includes(search) ||
        b.location?.toLowerCase().includes(search)
      );
    }

    // Sort
    builds.sort((a, b) => {
      if (sortBy === "ip-desc") return (b.totalItemPower || 0) - (a.totalItemPower || 0);
      if (sortBy === "ip-asc") return (a.totalItemPower || 0) - (b.totalItemPower || 0);
      if (sortBy === "cost-desc") return (b.estimatedCost || 0) - (a.estimatedCost || 0);
      if (sortBy === "cost-asc") return (a.estimatedCost || 0) - (b.estimatedCost || 0);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      // default: newest
      return new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime();
    });

    return Response.json({ success: true, count: builds.length, data: builds });
  } catch (error: any) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Reset action
    if (body?.action === "reset") {
      writeBuildsToDb(DEFAULT_BUILDS);
      return Response.json({ success: true, message: "Builds database reset to defaults", data: DEFAULT_BUILDS });
    }

    if (!body?.title) {
      return Response.json({ success: false, error: "Build title is required" }, { status: 400 });
    }

    const saved = upsertBuildInDb(body);
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
      return Response.json({ success: false, error: "Build id is required" }, { status: 400 });
    }

    const deleted = deleteBuildFromDb(id);
    return Response.json({ success: deleted, message: deleted ? "Build removed" : "Build not found" });
  } catch (error: any) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
