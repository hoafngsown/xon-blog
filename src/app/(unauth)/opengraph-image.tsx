import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Hoàng Sơn Logo";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const FontMaliBold = fetch(
    new URL("../../../public/fonts/Mali/Mali-Bold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  const ImageData = fetch(
    new URL("../../../public/logo.png", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            position: "relative",
            borderRadius: "10px",
            backgroundColor: "white",
          }}
        >
          <img alt="full-logo" src={ImageData as any} />
        </div>
        <div className="flex flex-col gap-y-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#2c4da4"
          >
            <path
              d="M5.44882 11.0292C7.61042 8.1424 10.262 4.6872 14.1876 4.4408C15.8396 4.3372 17.4468 4.9476 18.6368 6.0956C19.9472 7.364 20.4904 9.0468 20.4456 10.85C20.4148 12.0736 20.1852 13.314 19.7848 14.4872C18.6648 14.5796 17.5532 14.8596 16.576 15.274C14.9688 15.9544 12.6784 17.4972 13.4624 19.5636C13.8152 20.4904 14.7308 20.9188 15.6828 20.7088C16.6656 20.4904 17.5336 19.7288 18.2168 19.0232C19.1996 18.0068 19.936 16.7748 20.4596 15.4616C20.706 15.4588 20.9524 15.4644 21.196 15.4784C22.0668 15.5316 23.0104 15.736 23.6964 16.3072C24.4048 16.9008 24.654 17.7912 24.612 18.6872C24.5168 20.664 23.184 22.4784 21.7616 23.7524C21.2912 24.1724 21.9856 24.864 22.4532 24.444C23.9736 23.086 25.27 21.224 25.5444 19.166C25.6676 18.2364 25.5668 17.2564 25.0796 16.4388C24.5728 15.5904 23.7244 15.0472 22.7948 14.7644C22.1676 14.574 21.4984 14.476 20.8208 14.4564C20.8992 14.1988 20.972 13.9412 21.0336 13.6808C21.5516 11.5556 21.6888 9.1784 20.6612 7.182C19.8128 5.5272 18.2448 4.2504 16.4668 3.7184C14.1736 3.0324 11.7152 3.7436 9.77762 5.04C7.65802 6.4568 6.11242 8.5204 4.60322 10.5364C4.22522 11.0404 5.07362 11.5276 5.44882 11.0292ZM19.124 16.0608C18.7376 16.8112 18.27 17.5224 17.6988 18.1468C17.136 18.7628 16.4248 19.4572 15.61 19.7148C14.798 19.9696 14.1876 19.4012 14.3024 18.5668C14.4172 17.7436 15.2096 17.15 15.862 16.7412C16.9176 16.0804 18.1328 15.6912 19.3732 15.54C19.292 15.7136 19.2108 15.89 19.124 16.0608Z"
              fill="#2c4da4"
            />
            <path
              d="M3.10501 14.7672C5.49901 13.4708 6.98301 12.6896 8.86741 11.4324C9.08861 11.284 9.15301 10.9676 9.02701 10.7576C8.87861 10.5112 8.44741 10.4832 8.22061 10.6148C6.43421 11.6564 5.42621 12.2276 3.36261 13.454C3.41301 11.7348 3.41581 10.0156 3.36261 8.29921C3.34301 7.66921 2.41341 7.69441 2.38541 8.32441C2.29021 10.3964 2.34341 12.0736 2.35741 14.364C2.36021 14.7392 2.79141 14.938 3.10501 14.7672Z"
              fill="#2c4da4"
            />
          </svg>

          <p
            style={{
              marginLeft: "28px",
              fontWeight: "bold",
              color: "#2c4da4",
            }}
          >
            Đây là Sơn
          </p>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Mali",
          data: await FontMaliBold,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
