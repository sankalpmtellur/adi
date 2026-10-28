import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "src/assets/aditya2.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0d0c0a", color: "#efe7d8" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 72px", flex: 1 }}>
          <div style={{ fontSize: 26, letterSpacing: 6, textTransform: "uppercase", color: "#a69d8c" }}>
            {`${site.role} · ${site.location}`}
          </div>
          <div style={{ fontSize: 112, fontWeight: 700, lineHeight: 1, marginTop: 24 }}>{site.firstName}</div>
          <div style={{ fontSize: 112, fontWeight: 700, lineHeight: 1, color: "#f4b23e" }}>{site.lastName}</div>
          <div style={{ fontSize: 30, marginTop: 36, color: "#a69d8c" }}>TypeScript · React · Next.js · Node · Data</div>
        </div>
        <img src={photoSrc} alt="" width={460} height={630} style={{ objectFit: "cover" }} />
      </div>
    ),
    size,
  );
}
