/**
 * Proxy (dulu "middleware"): melindungi seluruh halaman /admin.
 * User yang belum login otomatis diarahkan ke /admin/login.
 *
 * Catatan: sejak Next.js 16 konvensi `middleware.ts` diganti menjadi `proxy.ts`.
 */
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export default async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};
