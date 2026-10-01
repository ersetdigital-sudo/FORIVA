/**
 * Endpoint backend pembuat signature Cloudinary (mode SIGNED).
 *
 * Dashboard admin memanggil endpoint ini dulu untuk mendapat `signature`,
 * `timestamp`, dan `api_key`, baru setelah itu file diunggah langsung ke
 * Cloudinary. API secret tidak pernah dikirim ke browser.
 *
 * Wajib login sebagai admin (sesi Supabase).
 */
import { NextResponse } from "next/server";
import { cloudinaryConfig, signParams } from "@/lib/cloudinary";
import { createClient } from "@/lib/supabase/server";

/** Bersihkan nama folder supaya tidak bisa dipakai untuk path traversal. */
const sanitizeFolder = (value: unknown) => {
  if (typeof value !== "string") return "";
  return value.replace(/[^a-zA-Z0-9/_-]/g, "").replace(/^\/+|\/+$/g, "");
};

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { cloudName, apiKey, apiSecret, uploadPreset } = cloudinaryConfig();
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Kredensial Cloudinary belum lengkap di environment." },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const folder = sanitizeFolder(body?.folder) || "foriva";
  const timestamp = Math.floor(Date.now() / 1000);

  // Semua parameter yang dikirim ke Cloudinary harus ikut ditandatangani,
  // kecuali file, api_key, dan cloud_name.
  const signedParams: Record<string, string | number> = { folder, timestamp };
  if (uploadPreset) signedParams.upload_preset = uploadPreset;

  return NextResponse.json({
    cloudName,
    apiKey,
    timestamp,
    folder,
    uploadPreset,
    signature: signParams(signedParams, apiSecret),
  });
}
