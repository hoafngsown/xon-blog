/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const FontMaliBold = fetch(
  new URL("../../../../public/fonts/Mali/Mali-Bold.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

export async function GET(req: NextRequest) {
  try {
    const fontBold = await FontMaliBold;

    const { searchParams } = req.nextUrl;
    const title = searchParams.get("title");
    const description = searchParams.get("description") ?? "";

    if (!title) {
      return new Response("No title provided", { status: 500 });
    }

    const subDescription =
      description.length > 140
        ? `${description.substring(0, 140)}...`
        : description;

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 24,
            color: "black",
            width: "100%",
            height: "100%",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            borderRadius: "10px",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              fontSize: 40,
              color: "black",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              gap: "20px",
            }}
          >
            <img
              src="https://utfs.io/f/dc8d6529-9cde-41e4-9568-cf0ee8e6bfc6-1zbfv.png"
              alt="logo"
              style={{
                width: 100,
                height: 100,
              }}
            />
            <p>
              {title}
              <span
                style={{
                  color: "#1a76d2",
                  display: "flex",
                  marginRight: 12,
                }}
              >
                👋
              </span>
            </p>
          </div>

          <div
            style={{
              display: "flex",
            }}
          >
            <p>{subDescription}</p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Mali",
            data: fontBold,
            style: "normal",
            weight: 700,
          },
        ],
      },
    );
  } catch (error) {
    return new Response("Failed to generate image", { status: 500 });
  }
}
