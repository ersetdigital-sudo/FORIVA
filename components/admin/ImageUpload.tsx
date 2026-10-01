/**
 * Komponen upload gambar Cloudinary (mode SIGNED).
 *
 * Alur:
 *   1. Admin memilih file → divalidasi (maks 2MB, jpg/png/webp).
 *   2. Komponen minta signature ke /api/cloudinary/sign.
 *   3. File diunggah langsung ke endpoint upload Cloudinary.
 *   4. `secure_url` + `public_id` hasil upload disimpan di hidden input,
 *      lalu ikut terkirim saat form pengaturan disimpan ke Supabase.
 *   5. Gambar lama otomatis dihapus lewat /api/cloudinary/delete.
 */
"use client";

import { useRef, useState } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_UPLOAD_BYTES,
  optimizedImageUrl,
} from "@/lib/image";

interface SignResponse {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  uploadPreset: string;
  signature: string;
}

/** Upload pakai XHR supaya progres unggah bisa ditampilkan. */
function uploadToCloudinary(
  file: File,
  sign: SignResponse,
  onProgress: (percent: number) => void,
): Promise<{ secure_url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append("file", file);
    form.append("api_key", sign.apiKey);
    form.append("timestamp", String(sign.timestamp));
    form.append("signature", sign.signature);
    form.append("folder", sign.folder);
    if (sign.uploadPreset) form.append("upload_preset", sign.uploadPreset);

    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`,
    );

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && data.secure_url) {
          resolve({ secure_url: data.secure_url, public_id: data.public_id });
        } else {
          reject(new Error(data?.error?.message ?? "Upload Cloudinary gagal."));
        }
      } catch {
        reject(new Error("Respons Cloudinary tidak bisa dibaca."));
      }
    };

    xhr.onerror = () => reject(new Error("Koneksi ke Cloudinary gagal."));
    xhr.send(form);
  });
}

export function ImageUpload({
  urlFieldName,
  publicIdFieldName,
  initialUrl = null,
  initialPublicId = null,
  folder = "foriva/qris",
  hint,
}: {
  urlFieldName: string;
  publicIdFieldName?: string;
  initialUrl?: string | null;
  initialPublicId?: string | null;
  folder?: string;
  hint?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(initialUrl ?? "");
  const [publicId, setPublicId] = useState(initialPublicId ?? "");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Format harus JPG, PNG, atau WEBP.");
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setError("Ukuran gambar maksimal 2MB.");
      return;
    }

    setIsUploading(true);
    setProgress(0);

    try {
      const signRes = await fetch("/api/cloudinary/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      });

      if (!signRes.ok) {
        const detail = await signRes.json().catch(() => ({}));
        throw new Error(detail?.error ?? "Gagal membuat signature upload.");
      }

      const sign = (await signRes.json()) as SignResponse;
      const uploaded = await uploadToCloudinary(file, sign, setProgress);

      // Hapus gambar lama setelah gambar baru berhasil diunggah.
      if (publicId && publicId !== uploaded.public_id) {
        void fetch("/api/cloudinary/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_id: publicId }),
        });
      }

      setUrl(uploaded.secure_url);
      setPublicId(uploaded.public_id);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Upload gagal.",
      );
    } finally {
      setIsUploading(false);
      setProgress(0);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const clearImage = () => {
    if (publicId) {
      void fetch("/api/cloudinary/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: publicId }),
      });
    }
    setUrl("");
    setPublicId("");
  };

  return (
    <div className="space-y-3">
      {/* Nilai yang benar-benar dikirim ke server action */}
      <input type="hidden" name={urlFieldName} value={url} />
      {publicIdFieldName ? (
        <input type="hidden" name={publicIdFieldName} value={publicId} />
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Preview sebelum & sesudah upload */}
        <div className="grid h-40 w-full max-w-[220px] place-items-center overflow-hidden rounded-md border border-dashed border-hairline bg-console">
          {url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={optimizedImageUrl(url, "f_auto,q_auto,w_400")}
              alt="Pratinjau gambar"
              loading="lazy"
              className="h-full w-full object-contain p-2"
            />
          ) : (
            <div className="text-center">
              <MaterialIcon
                name="image"
                className="text-[26px] text-ink-faint"
              />
              <p className="mt-1 text-[11px] text-ink-faint">Belum ada gambar</p>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2.5">
          <input
            ref={inputRef}
            type="file"
            accept={ALLOWED_IMAGE_TYPES.join(",")}
            onChange={(event) => handleFile(event.target.files?.[0])}
            className="hidden"
          />

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex items-center gap-2 rounded-md border border-hairline bg-panel px-3.5 py-2 text-[12px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent disabled:opacity-60 cursor-pointer"
            >
              <MaterialIcon
                name={isUploading ? "progress_activity" : "upload"}
                className={`text-[16px] ${isUploading ? "animate-spin" : ""}`}
              />
              {isUploading ? `Mengunggah ${progress}%` : url ? "Ganti gambar" : "Pilih gambar"}
            </button>

            {url ? (
              <button
                type="button"
                onClick={clearImage}
                disabled={isUploading}
                className="inline-flex items-center gap-2 rounded-md border border-hairline bg-panel px-3.5 py-2 text-[12px] font-semibold text-rose-600 transition-colors hover:border-rose-200 hover:bg-rose-50 disabled:opacity-60 cursor-pointer"
              >
                <MaterialIcon name="delete" className="text-[16px]" />
                Hapus
              </button>
            ) : null}
          </div>

          {isUploading ? (
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-bone">
              <div
                className="h-full rounded-full bg-accent transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          ) : null}

          {error ? (
            <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-[12px] text-rose-700">
              {error}
            </p>
          ) : null}

          <p className="text-[11px] leading-relaxed text-ink-faint">
            {hint ??
              "JPG, PNG, atau WEBP · maksimal 2MB. Gambar otomatis dioptimasi (f_auto,q_auto) saat ditampilkan."}
          </p>
        </div>
      </div>
    </div>
  );
}
