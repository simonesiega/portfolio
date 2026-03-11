import {ImageResponse} from "next/og";
import {socialPreviewContentType, socialPreviewImageSize, socialPreviewText} from "@/lib/metadata";

export const size = socialPreviewImageSize;

export const contentType = socialPreviewContentType;

const outerStyle = {
  display: "flex",
  width: "100%",
  height: "100%",
  padding: "48px",
  background:
    "radial-gradient(circle at 30% 40%, #111111 0%, #000000 60%), linear-gradient(160deg, #010101 0%, #070707 48%, #0d0d0d 100%)",
  color: "#f5f5f5",
  fontFamily: "sans-serif",
} as const;

const panelStyle = {
  display: "flex",
  width: "100%",
  height: "100%",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: "34px",
  border: "1px solid rgba(255,255,255,0.12)",
  padding: "54px",
  background: "linear-gradient(180deg, rgba(255,255,255,0.028), rgba(255,255,255,0.012))",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 60px rgba(0,0,0,0.35)",
} as const;

const topRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: 16,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#a1a1aa",
} as const;

const contentStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  maxWidth: "920px",
} as const;

const titleBlockStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "22px",
} as const;

const footerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderTop: "1px solid rgba(255,255,255,0.08)",
  paddingTop: "22px",
  fontSize: 18,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#a1a1aa",
} as const;

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={outerStyle}>
      <div style={panelStyle}>
        <div style={topRowStyle}>
          <div style={{display: "flex"}}>{socialPreviewText.ownerName}</div>
          <div style={{display: "flex", color: "#d4d4d8"}}>{socialPreviewText.domain}</div>
        </div>

        <div style={contentStyle}>
          <div style={titleBlockStyle}>
            <div
              style={{
                display: "flex",
                fontSize: 108,
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: "-0.075em",
                color: "#E7E7E7",
              }}
            >
              {socialPreviewText.role}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 30,
                fontWeight: 500,
                lineHeight: 1.2,
                color: "#d4d4d8",
                letterSpacing: "-0.03em",
              }}
            >
              {socialPreviewText.description}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: 24,
              lineHeight: 1.2,
              color: "#bfbfc4",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "8px",
                height: "8px",
                borderRadius: "999px",
                backgroundColor: "#ef4444",
              }}
            />
            {socialPreviewText.supportingLine}
          </div>
        </div>

        <div style={footerStyle}>
          <div style={{display: "flex", alignItems: "center", gap: "14px"}}>
            {socialPreviewText.highlights.map((highlight, index) => (
              <div key={highlight} style={{display: "flex", alignItems: "center", gap: "14px"}}>
                {index > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      width: "6px",
                      height: "6px",
                      borderRadius: "999px",
                      backgroundColor: "#6b7280",
                    }}
                  />
                ) : null}
                <div style={{display: "flex"}}>{highlight}</div>
              </div>
            ))}
          </div>
          <div style={{display: "flex", color: "#f5f5f5"}}>{socialPreviewText.footerLabel}</div>
        </div>
      </div>
    </div>,
    size
  );
}
