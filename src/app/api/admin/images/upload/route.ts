import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function POST(request: Request) {
  const utapi = new UTApi({
    apiKey: process.env.UPLOADTHING_SECRET,
  });

  const body: FormData = await request.formData();
  const files = body.getAll("files");
  const response = await utapi.uploadFiles(files as File[]);
  const returnData = response.map((item) => item.data?.url);
  return NextResponse.json(returnData, { status: 200 });
}
