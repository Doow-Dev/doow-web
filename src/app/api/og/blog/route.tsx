import { ImageResponse } from "next/og";

export const runtime = "edge";

const size = {
  height: 630,
  width: 1200,
};

function cleanParam(value: string | null, fallback: string) {
  const trimmed = value?.trim();

  return trimmed || fallback;
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = cleanParam(searchParams.get("title"), "Doow Blog");
  const category = cleanParam(searchParams.get("category"), "Doow");
  const author = searchParams.get("author")?.trim();
  const date = searchParams.get("date")?.trim();
  const meta = [author, date].filter(Boolean).join(" / ");

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#f6f8f2",
          color: "#172016",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, Helvetica, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#40a758",
            borderRadius: "999px",
            display: "flex",
            height: "220px",
            opacity: 0.14,
            position: "absolute",
            right: "-64px",
            top: "-72px",
            width: "420px",
          }}
        />
        <div
          style={{
            background: "#f3a801",
            borderRadius: "999px",
            bottom: "-120px",
            display: "flex",
            height: "260px",
            left: "160px",
            opacity: 0.18,
            position: "absolute",
            width: "520px",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", position: "relative", width: "100%" }}>
          <div style={{ alignItems: "center", display: "flex", gap: "16px" }}>
            <div
              style={{
                alignItems: "center",
                background: "#172016",
                borderRadius: "18px",
                color: "#ffffff",
                display: "flex",
                fontSize: "32px",
                fontWeight: 700,
                height: "68px",
                justifyContent: "center",
                width: "68px",
              }}
            >
              D
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ fontSize: "34px", fontWeight: 700, letterSpacing: "-0.02em" }}>Doow</div>
              <div style={{ color: "#536150", fontSize: "20px" }}>Field notes</div>
            </div>
          </div>
          <div
            style={{
              alignItems: "center",
              background: "#ffffff",
              border: "1px solid rgba(23, 32, 22, 0.12)",
              borderRadius: "999px",
              color: "#172016",
              display: "flex",
              fontSize: "22px",
              fontWeight: 700,
              padding: "14px 22px",
            }}
          >
            {category}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "28px", position: "relative", width: "920px" }}>
          <div
            style={{
              color: "#172016",
              display: "flex",
              fontSize: "74px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 0.98,
            }}
          >
            {title}
          </div>
          {meta ? <div style={{ color: "#536150", display: "flex", fontSize: "26px" }}>{meta}</div> : null}
        </div>
        <div
          style={{
            alignItems: "center",
            color: "#536150",
            display: "flex",
            fontSize: "22px",
            justifyContent: "space-between",
            position: "relative",
            width: "100%",
          }}
        >
          <div>doow.co/blog</div>
          <div>Software clarity for modern teams</div>
        </div>
      </div>
    ),
    size,
  );
}
