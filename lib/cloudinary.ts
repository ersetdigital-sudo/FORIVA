/**
 * Helper Cloudinary sisi SERVER (butuh node:crypto).
 *
 * Upload/delete gambar memakai mode SIGNED, jadi parameter harus ditandatangani
 * dengan API secret. Tidak boleh diimpor dari Client Component.
 *
 * Untuk helper gambar yang dipakai di browser, lihat `lib/image.ts`.
 */
import { createHash } from "node:crypto";

/**
 * Signature Cloudinary = SHA-1 dari parameter yang sudah diurutkan + API secret.
 * Dipakai untuk upload (signed) dan destroy gambar.
 */
export function signParams(
  params: Record<string, string | number>,
  apiSecret: string,
): string {
  const toSign = Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== "")
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return createHash("sha1").update(`${toSign}${apiSecret}`).digest("hex");
}

/** Kredensial Cloudinary dari environment (server-only). */
export const cloudinaryConfig = () => ({
  cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
  apiKey: process.env.CLOUDINARY_API_KEY ?? "",
  apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
  uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET ?? "",
});
