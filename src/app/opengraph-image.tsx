import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(160deg, #8c1515 0%, #7a1212 55%, #560c0c 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, textTransform: "uppercase", color: "#e6d8ba" }}>
          Stanford YPHA
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 960 }}>
          Elevating young people to lead public health in the Bay.
        </div>
      </div>
    ),
    { ...size },
  );
}
