/**
 * Helper gambar yang AMAN dipakai di browser (tanpa dependensi Node).
 * Dipakai untuk menampilkan gambar Cloudinary dengan transformasi hemat kuota.
 */

/** Transformasi default: format & kualitas otomatis + lebar maksimum. */
export const DEFAULT_TRANSFORMATION = "f_auto,q_auto,w_800,c_fill";

/**
 * Sisipkan transformasi ke URL Cloudinary.
 * `.../image/upload/v123/foto.png` → `.../image/upload/f_auto,q_auto,w_800,c_fill/v123/foto.png`
 *
 * URL non-Cloudinary (mis. /images/qris.png) dikembalikan apa adanya.
 */
export function optimizedImageUrl(
  url: string | null | undefined,
  transformation: string = DEFAULT_TRANSFORMATION,
): string {
  if (!url) return "";
  if (!url.includes("res.cloudinary.com") || !url.includes("/image/upload/")) {
    return url;
  }
  return url.replace("/image/upload/", `/image/upload/${transformation}/`);
}

/** Batas ukuran file gambar yang boleh diunggah admin (2MB). */
export const MAX_UPLOAD_BYTES = 2 * 1024 * 1024;

/** Format gambar yang diterima saat upload. */
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
