// https://<your-site.com>/api/revalidate?secret=<token>
// http://localhost:3000/api/revalidate?path=/&secret=HoangSon142002

import envConfig from "@/configs/env";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const path = req.nextUrl.searchParams.get("path") ?? "";
    const secret = req.nextUrl.searchParams.get("secret") ?? "";

    if (secret !== envConfig.REVALIDATE_SECRET_TOKEN) {
      return NextResponse.json({ message: "Invalid token" }, { status: 491 });
    }

    revalidatePath(path, "layout");

    return NextResponse.json({ revalidated: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server" }, { status: 500 });
  }
}
