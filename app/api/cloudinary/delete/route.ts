/**
 * Endpoint backend untuk menghapus gambar di Cloudinary (mode SIGNED).
 * Dipakai saat admin mengganti gambar QRIS supaya gambar lama tidak menumpuk
 * dan kuota storage tetap hemat.
 *
 * Wajib login sebagai admin (sesi Supabase).
 */
import { NextResponse } from "next/server";
import { cloudinaryConfig, signParams } from "@/lib/cloudinary";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { cloudName, apiKey, apiSecret } = cloudinaryConfig();
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Kredensial Cloudinary belum lengkap di environment." },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const publicId = typeof body?.public_id === "string" ? body.public_id : "";

  if (!publicId) {
    return NextResponse.json({ error: "public_id wajib diisi." }, { status: 400 });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = signParams({ public_id: publicId, timestamp }, apiSecret);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
    {
      method: "POST",
      body: new URLSearchParams({
        public_id: publicId,
        api_key: apiKey,
        timestamp: String(timestamp),
        signature,
      }),
    },
  );

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    return NextResponse.json(
      { error: result?.error?.message ?? "Gagal menghapus gambar di Cloudinary." },
      { status: 502 },
    );
  }

  return NextResponse.json(result);
}
