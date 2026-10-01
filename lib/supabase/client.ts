/**
 * Supabase client untuk dipakai di BROWSER (Client Component).
 *
 * Hanya memakai ANON KEY yang memang aman dipublikasikan — seluruh akses
 * dibatasi oleh Row Level Security di sisi database.
 */
"use client";

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
